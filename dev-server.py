#!/usr/bin/env python3
"""
dev-server.py – Combined HTTP server + live manifest watcher
-------------------------------------------------------------
Serves the portfolio on http://localhost:8099 while watching the repo for any
HTML file additions/deletions/renames and auto-regenerating templates.json.

Usage:
    python dev-server.py              # default port 8099
    python dev-server.py --port 3000  # custom port
"""

import os
import sys
import time
import json
import hashlib
import argparse
import threading
import subprocess
from pathlib import Path
from http.server import SimpleHTTPRequestHandler, HTTPServer
from functools import partial

ROOT = Path(__file__).parent.resolve()


def run_scan():
    """Run scan.py to regenerate templates.json."""
    result = subprocess.run(
        [sys.executable, str(ROOT / "scan.py")],
        cwd=str(ROOT),
        capture_output=True,
        text=True,
    )
    if result.stdout:
        print(result.stdout, end="")
    if result.stderr:
        print(result.stderr, end="", file=sys.stderr)


CATEGORY_DIRS = ["Ben Radnor", "Lana_sabir", "K9handler2024", "ROUND LAB", "Vector"]
IGNORE_FILES  = {"index.html", "scan.py", "dev-server.py"}


def dir_hash() -> str:
    parts = []
    for cat in CATEGORY_DIRS:
        base = ROOT / cat
        if not base.exists():
            continue
        for f in sorted(base.rglob("*.html")):
            if f.name in IGNORE_FILES:
                continue
            parts.append(f"{f}:{f.stat().st_mtime:.0f}")
    return hashlib.md5("\n".join(parts).encode()).hexdigest()


def watcher(interval: int = 3):
    last = dir_hash()
    print(f"[watcher] Watching for file changes every {interval}s …")
    while True:
        time.sleep(interval)
        try:
            current = dir_hash()
            if current != last:
                print("[watcher] Change detected — regenerating templates.json …")
                run_scan()
                last = current
        except Exception as e:
            print(f"[watcher] Error: {e}")


class QuietHandler(SimpleHTTPRequestHandler):
    """Same as SimpleHTTPRequestHandler but suppresses successful GET logs."""

    def log_message(self, fmt, *args):
        # Only print errors (4xx, 5xx)
        code = args[1] if len(args) > 1 else "200"
        if not str(code).startswith(("2", "3")):
            super().log_message(fmt, *args)

    def log_request(self, code="-", size="-"):
        if str(code).startswith(("4", "5")):
            super().log_request(code, size)


def main():
    parser = argparse.ArgumentParser(description="eBay Template dev server")
    parser.add_argument("--port", type=int, default=8099)
    parser.add_argument("--interval", type=int, default=3,
                        help="File-watch poll interval in seconds")
    args = parser.parse_args()

    # Initial scan
    print("[server] Generating initial templates.json …")
    run_scan()

    # Start watcher thread
    t = threading.Thread(target=watcher, args=(args.interval,), daemon=True)
    t.start()

    # Start HTTP server
    handler = partial(QuietHandler, directory=str(ROOT))
    server  = HTTPServer(("", args.port), handler)
    print(f"[server] Serving at  http://localhost:{args.port}/")
    print(f"[server] Press Ctrl+C to stop.\n")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n[server] Shutting down.")
        server.shutdown()


if __name__ == "__main__":
    main()
