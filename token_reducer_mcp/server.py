from mcp.server.fastmcp import FastMCP
from bs4 import BeautifulSoup, Comment
import re
import os

# Create an MCP server
mcp = FastMCP("TokenReducer")

@mcp.tool()
def read_minified_html(filepath: str) -> str:
    """Reads an HTML file, removes all HTML comments, collapses excessive whitespace, and returns a minified version."""
    if not os.path.exists(filepath):
        return f"Error: File not found: {filepath}"
    
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()
    
    soup = BeautifulSoup(html, 'html.parser')
    for comment in soup.find_all(string=lambda text: isinstance(text, Comment)):
        comment.extract()
    
    html = str(soup)
    # Remove excessive newlines and spaces
    html = re.sub(r'>\s+<', '><', html)
    html = re.sub(r'\s{2,}', ' ', html)
    return html

@mcp.tool()
def read_html_without_css(filepath: str) -> str:
    """Reads an HTML file and entirely strips out the <style> block and its contents."""
    if not os.path.exists(filepath):
        return f"Error: File not found: {filepath}"
    
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()
        
    soup = BeautifulSoup(html, 'html.parser')
    for style in soup.find_all('style'):
        style.decompose()
        
    return str(soup)

@mcp.tool()
def read_body_only(filepath: str) -> str:
    """Extracts and returns only the content within the <body> tags of an HTML file."""
    if not os.path.exists(filepath):
        return f"Error: File not found: {filepath}"
        
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()
        
    soup = BeautifulSoup(html, 'html.parser')
    body = soup.find('body')
    if body:
        return str(body)
    return "Error: No <body> tag found."

if __name__ == "__main__":
    # Run the server
    mcp.run()
