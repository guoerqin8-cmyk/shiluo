import http.server
import socketserver
from pyngrok import ngrok

PORT = 8000

Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving at port {PORT}")
    
    public_url = ngrok.connect(PORT)
    print(f"Public URL: {public_url}")
    
    httpd.serve_forever()