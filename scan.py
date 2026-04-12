#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')
"""
scan.py - eBay Template Portfolio Scanner
-----------------------------------------
Scans the repository directory and produces templates.json used by index.html.

Usage:
    python scan.py                # scan and write templates.json
    python scan.py --watch        # scan + watch for changes and rescan automatically
"""

import os
import json
import sys
import time
import hashlib
import argparse
from pathlib import Path

# ── Configuration ─────────────────────────────────────────────────────────────

ROOT = Path(__file__).parent.resolve()

OUTPUT_FILE = ROOT / "templates.json"

# Map directory names → display categories + tag classes
CATEGORY_MAP = {
    "Ben Radnor":   {"label": "Ben Radnor",  "tag": "tag-benradnor", "icon": "🐕"},
    "Lana_sabir":   {"label": "Lana Sabir",  "tag": "tag-lanasabir", "icon": "💎"},
    "K9handler2024":{"label": "K9 Handler",  "tag": "tag-k9handler", "icon": "🐾"},
    "ROUND LAB":    {"label": "ROUND LAB",   "tag": "tag-roundlab",  "icon": "🧪"},
    "Vector":       {"label": "Vector",      "tag": "tag-vector",    "icon": "📐"},
}

# Directories / files to always ignore
IGNORE_DIRS = {".git", ".vscode", "node_modules", "__pycache__"}

# Files ignored only when they live directly in ROOT (the portfolio page itself)
ROOT_ONLY_IGNORE = {"index.html", "scan.py", "dev-server.py"}
IGNORE_SUFFIXES = {".txt", ".md", ".json", ".py", ".css", ".js", ".png",
                   ".jpg", ".jpeg", ".gif", ".svg", ".ico", ".woff",
                   ".woff2", ".ttf", ".eot"}

# ── Helpers ───────────────────────────────────────────────────────────────────

def make_display_name(rel_path: Path, category_label: str) -> str:
    """Generate a human-friendly display name from a file path."""
    stem = rel_path.stem
    parent_parts = list(rel_path.parts[1:-1])  # dirs between category and file

    # If the file is just "index", use parent folder as name
    if stem.lower() == "index":
        if parent_parts:
            return f"{category_label[:2].upper()} – {' '.join(parent_parts)}"
        return f"{category_label[:2].upper()} – Main"

    # Numeric IDs → keep as-is with prefix
    if stem.replace("-", "").replace("_", "").isdigit():
        return f"{category_label[:2].upper()} – {stem}"

    # Otherwise use the stem nicely
    return f"{category_label[:2].upper()} – {stem.replace('-', ' ').replace('_', ' ').title()}"


def scan() -> list[dict]:
    """Walk every configured top-level directory and collect HTML files."""
    results = []

    for top_dir, meta in CATEGORY_MAP.items():
        base = ROOT / top_dir
        if not base.exists():
            continue

        for html_file in sorted(base.rglob("*.html")):
            # Skip root-level portfolio/script files (but not same-named files in subdirs)
            if html_file.parent == ROOT and html_file.name in ROOT_ONLY_IGNORE:
                continue
            # Skip files inside ignored dirs
            if any(part in IGNORE_DIRS for part in html_file.parts):
                continue

            rel = html_file.relative_to(ROOT)
            web_path = "./" + "/".join(rel.parts)   # use forward slashes for browser

            display_name = make_display_name(rel, meta["label"])
            size_kb = round(html_file.stat().st_size / 1024, 1)

            results.append({
                "name":     display_name,
                "path":     web_path,
                "category": meta["label"],
                "tagClass": meta["tag"],
                "icon":     meta["icon"],
                "sizeKb":   size_kb,
            })

    return results


def write_manifest(templates: list[dict]) -> None:
    payload = {
        "generated": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "count":     len(templates),
        "templates": templates,
    }
    tmp = OUTPUT_FILE.with_suffix(".json.tmp")
    tmp.write_text(json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8")
    tmp.replace(OUTPUT_FILE)
    print(f"[scan] {len(templates)} templates -> {OUTPUT_FILE.name}  ({time.strftime('%H:%M:%S')})")


def dir_hash() -> str:
    """A lightweight fingerprint of all HTML file paths + mod-times under ROOT."""
    parts = []
    for cat_dir in CATEGORY_MAP:
        base = ROOT / cat_dir
        if not base.exists():
            continue
        for f in sorted(base.rglob("*.html")):
            if f.parent == ROOT and f.name in ROOT_ONLY_IGNORE:
                continue
            parts.append(f"{f}:{f.stat().st_mtime:.0f}")
    return hashlib.md5("\n".join(parts).encode()).hexdigest()


# ── Entry point ───────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="eBay template manifest scanner")
    parser.add_argument("--watch", action="store_true",
                        help="Keep running and rescan whenever files change")
    parser.add_argument("--interval", type=int, default=3,
                        help="Poll interval in seconds (default: 3)")
    args = parser.parse_args()

    # Initial scan
    write_manifest(scan())

    if not args.watch:
        return

    print(f"[scan] Watching for changes every {args.interval}s … (Ctrl+C to stop)")
    last_hash = dir_hash()
    try:
        while True:
            time.sleep(args.interval)
            current_hash = dir_hash()
            if current_hash != last_hash:
                print("[scan] Change detected — rescanning …")
                write_manifest(scan())
                last_hash = current_hash
    except KeyboardInterrupt:
        print("\n[scan] Stopped.")


if __name__ == "__main__":
    main()
