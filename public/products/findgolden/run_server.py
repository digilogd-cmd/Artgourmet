import http.server
import socketserver
import webbrowser
import threading
import time
import os

PORT = 8080
# Use current directory as project directory
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def open_browser():
    # Wait a moment for server to start, then launch browser
    time.sleep(1.0)
    print(f"Opening browser at http://localhost:{PORT} ...")
    webbrowser.open(f"http://localhost:{PORT}/index.html")

if __name__ == "__main__":
    # Change working directory to ensure correct resolution
    os.chdir(DIRECTORY)
    
    print("=" * 60)
    print("Find Goldie! Local Web Server Started")
    print(f"URL: http://localhost:{PORT}")
    print("Press Ctrl+C to stop the server.")
    print("=" * 60)
    
    # Start browser thread
    threading.Thread(target=open_browser, daemon=True).start()
    
    # Avoid port collision issues by allowing reuse
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped. Goodbye!")
