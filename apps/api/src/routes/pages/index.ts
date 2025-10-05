import { User, Document } from "@knowledgescout/schemas";
import { Hono } from "hono";

export const pages = new Hono();
export const pagesRoutes = pages;

pages.get("/info", (c) => {
  return c.html(`
    <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Info</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="p-8">
    <div class="max-w-4xl mx-auto">
        <h1 class="text-2xl font-bold mb-6">Info</h1>
        <div class="space-y-4">
            <div>
                <h2 class="text-xl font-semibold mb-2">API Endpoints</h2>
                <ul class="list-disc list-inside">
                    <li><a href="/docs" class="text-blue-500 hover:underline">GET /docs</a> - Fetch documents (requires authentication)</li>
                    <li><a href="/ask" class="text-blue-500 hover:underline">GET /ask</a> - Ask questions about documents (requires authentication)</li>
                    <li><a href="/admin" class="text-blue-500 hover:underline">GET /admin</a> - Admin dashboard</li>
                    <li><a href="https://github.com/jabedzaman/knowledge-scout" class="text-blue-500 hover:underline" target="_blank">GitHub Repository</a></li>
                </ul>
            </div>
            <div>
                <h2 class="text-xl font-semibold mb-2">Authentication</h2>
                <p>Use Basic Auth with your email and password. Include the header:</p>
                <pre class="bg-gray-100 p-2 rounded">x-authorization: Basic &lt;base64-encoded-email:password&gt;</pre>
            </div>
            <div>
                <h2 class="text-xl font-semibold mb-2">Default Admin User</h2>
                <p>You can use the following default admin user to get started:</p>
                <ul class="list-disc list-inside">
                    <li>Email: <code>admin@mail.com</code></li>
                    <li>Password: <code>admin123</code></li>
                </ul>
            </div>
        </div>
    </div>
</body>
</html>
`);
});

pages.get("/docs", (c) => {
  return c.html(`
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Documents</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="p-8">
    <div class="max-w-4xl mx-auto">
        <h1 class="text-2xl font-bold mb-6">Documents</h1>
        
        <div class="mb-6 space-y-4">
            <div>
                <label class="block mb-1">Email:</label>
                <input 
                    type="email" 
                    id="email" 
                    value="admin@mail.com"
                    class="border px-3 py-2 w-full"
                    required>
            </div>
            
            <div>
                <label class="block mb-1">Password:</label>
                <input 
                    type="password" 
                    id="password" 
                    value="admin123"
                    class="border px-3 py-2 w-full"
                    required>
            </div>
            
            <button 
                onclick="fetchDocs()" 
                class="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600">
                Fetch Docs
            </button>
        </div>

        <div id="error" class="text-red-500 mb-4"></div>
        <div id="docsList"></div>
    </div>

    <script>
        function fetchDocs() {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const errorEl = document.getElementById('error');
            const docsListEl = document.getElementById('docsList');
            
            errorEl.textContent = '';
            docsListEl.innerHTML = 'Loading...';

            fetch('/api/docs?limit=10&offset=0', {
                headers: {
                    'Content-Type': 'application/json',
                    'x-authorization': 'Basic ' + btoa(email + ':' + password)
                }
            })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch documents');
                }
                return res.json();
            })
            .then(data => {
                if (!data.items || data.items.length === 0) {
                    docsListEl.innerHTML = '<p>No documents found</p>';
                    return;
                }
                
                let html = '<table class="w-full border-collapse border">';
                html += '<thead><tr class="bg-gray-100">';
                html += '<th class="border p-2 text-left">Filename</th>';
                html += '<th class="border p-2 text-left">Pages</th>';
                html += '<th class="border p-2 text-left">Size</th>';
                html += '<th class="border p-2 text-left">Status</th>';
                html += '<th class="border p-2 text-left">Uploaded</th>';
                html += '</tr></thead><tbody>';
                
                data.items.forEach(doc => {
                    html += '<tr>';
                    html += '<td class="border p-2">' + doc.originalName + '</td>';
                    html += '<td class="border p-2">' + doc.totalPages + '</td>';
                    html += '<td class="border p-2">' + (doc.fileSize / 1024).toFixed(1) + ' KB</td>';
                    html += '<td class="border p-2">' + doc.status + '</td>';
                    html += '<td class="border p-2">' + new Date(doc.uploadedAt).toLocaleString() + '</td>';
                    html += '</tr>';
                });
                
                html += '</tbody></table>';
                html += '<p class="mt-4">Total: ' + data.total + ' documents</p>';
                
                docsListEl.innerHTML = html;
            })
            .catch(err => {
                errorEl.textContent = 'Error: ' + err.message;
                docsListEl.innerHTML = '';
            });
        }
    </script>
</body>
</html>
  `);
});

pages.get("/ask", (c) => {
  return c.html(`
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ask</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="p-8">
    <div class="max-w-4xl mx-auto">
        <h1 class="text-2xl font-bold mb-6">Ask Questions</h1>
        
        <div class="mb-6 space-y-4">
            <div>
                <label class="block mb-1">Email:</label>
                <input 
                    type="email" 
                    id="email" 
                    value="admin@mail.com"
                    class="border px-3 py-2 w-full"
                    required>
            </div>
            
            <div>
                <label class="block mb-1">Password:</label>
                <input 
                    type="password" 
                    id="password" 
                    value="admin123"
                    class="border px-3 py-2 w-full"
                    required>
            </div>

            <div>
                <label class="block mb-1">Query:</label>
                <textarea 
                    id="query" 
                    rows="3"
                    placeholder="What is this document about?"
                    class="border px-3 py-2 w-full"
                    required></textarea>
            </div>

            <button 
                onclick="askQuery()" 
                class="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600">
                Ask Query
            </button>
        </div>

        <div id="error" class="text-red-500 mb-4"></div>
        <div id="results"></div>
    </div>

    <script>
        function askQuery() {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const query = document.getElementById('query').value;
            const errorEl = document.getElementById('error');
            const resultsEl = document.getElementById('results');
            
            errorEl.textContent = '';
            resultsEl.innerHTML = 'Loading...';

            fetch('/api/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-authorization': 'Basic ' + btoa(email + ':' + password)
                },
                body: JSON.stringify({ query, k: 3 })
            })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to query documents');
                }
                return res.json();
            })
            .then(data => {
                displayResults(data.answer);
            })
            .catch(err => {
                errorEl.textContent = 'Error: ' + err.message;
                resultsEl.innerHTML = '';
            });
        }

        function displayResults(data) {
            console.log(data);
            const resultsEl = document.getElementById('results');
            
            if (!data.sources || data.sources.length === 0) {
                resultsEl.innerHTML = '<p>No results found</p>';
                return;
            }
            
            let html = '<div class="mb-4 p-3 bg-blue-50 border">';
            html += '<p><strong>Query:</strong> ' + data.query + '</p>';
            html += '<p><strong>Found:</strong> ' + data.sources.length + ' sources</p>';
            if (data.cached) {
                html += '<p class="text-green-600"><strong>CACHED</strong></p>';
            }
            html += '</div>';
            
            html += '<div class="space-y-4">';
            data.sources.forEach((source, idx) => {
                html += '<div class="border p-4">';
                html += '<div class="flex justify-between mb-2">';
                html += '<strong>Source ' + (idx + 1) + ':</strong> ';
                html += '<span class="text-sm">' + source.filename + ' (Page ' + source.page + ')</span>';
                html += '</div>';
                html += '<p class="mb-2">' + source.text + '</p>';
                html += '<p class="text-sm text-gray-600">Relevance: ' + (source.score * 100).toFixed(1) + '%</p>';
                html += '</div>';
            });
            html += '</div>';
            
            resultsEl.innerHTML = html;
        }
    </script>
</body>
</html>
  `);
});

pages.get("/admin", async (c) => {
  const userCount = await User.countDocuments();
  const docsCount = await Document.countDocuments();

  return c.html(`
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Admin Dashboard</title>
        <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="p-8">
        <div class="max-w-4xl mx-auto">
            <h1 class="text-2xl font-bold mb-6">Admin Dashboard</h1>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="p-6 border rounded shadow">
                    <h2 class="text-xl font-semibold mb-4">Users</h2>
                    <p class="text-3xl font-bold">${userCount}</p>
                </div>
                <div class="p-6 border rounded shadow">
                    <h2 class="text-xl font-semibold mb-4">Documents</h2>
                    <p class="text-3xl font-bold">${docsCount}</p>
                </div>
            </div>
        </div>
    </body>
    </html>
  `);
});
