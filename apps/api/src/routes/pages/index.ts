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
                    <li><a href="/api-docs" class="text-blue-500 hover:underline">GET /api-docs</a> - API documentation</li>
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

pages.get("/api-docs", (c) => {
  const baseUrl = c.req.url.split("/api-docs")[0];

  return c.html(`
    <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KnowledgeScout - API Documentation</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .animate-slide-in {
            animation: slideIn 0.3s ease-out;
        }
        
        .copy-feedback {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        }
        
        pre::-webkit-scrollbar {
            height: 8px;
        }
        
        pre::-webkit-scrollbar-track {
            background: #f1f5f9;
            border-radius: 4px;
        }
        
        pre::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 4px;
        }
        
        pre::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
        }
    </style>
</head>
<body class="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
    <!-- Header -->
    <div class="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center py-4">
                <div class="flex items-center space-x-4">
                    <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        📚 KnowledgeScout API
                    </h1>
                    <span class="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
                        v1.0
                    </span>
                </div>
                <div class="flex space-x-3">
                    <a href="/info" class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition">
                        📖 Info
                    </a>
                    <a href="/admin" class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition">
                        ⚙️ Admin
                    </a>
                    <a href="https://github.com/jabedzaman/knowledge-scout" target="_blank" class="px-4 py-2 text-sm font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition">
                        <span class="inline-flex items-center space-x-2">
                            <span>GitHub</span>
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                        </span>
                    </a>
                </div>
            </div>
        </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Introduction -->
        <div class="bg-white rounded-xl shadow-sm border p-6 mb-8">
            <h2 class="text-xl font-bold mb-3">Getting Started</h2>
            <p class="text-gray-600 mb-4">
                The KnowledgeScout API provides document analysis and AI-powered Q&A capabilities. Most endpoints require Basic Authentication.
            </p>
            <div class="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
                <div class="flex">
                    <div class="flex-shrink-0">
                        <svg class="h-5 w-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                        </svg>
                    </div>
                    <div class="ml-3">
                        <p class="text-sm text-amber-800">
                            <strong>Default Admin Credentials:</strong> Email: <code class="bg-amber-100 px-2 py-1 rounded">admin@mail.com</code> | Password: <code class="bg-amber-100 px-2 py-1 rounded">admin123</code>
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Authentication Section -->
        <div class="mb-8">
            <div class="flex items-center mb-4">
                <div class="h-8 w-1 bg-blue-600 rounded mr-3"></div>
                <h2 class="text-2xl font-bold text-gray-900">🔐 Authentication</h2>
            </div>
            
            <!-- Create Account -->
            <div class="bg-white rounded-xl shadow-sm border mb-4 overflow-hidden">
                <div class="p-6">
                    <div class="flex items-start justify-between mb-4">
                        <div class="flex-1">
                            <div class="flex items-center space-x-3 mb-2">
                                <span class="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded uppercase">POST</span>
                                <code class="text-sm font-mono text-gray-900">/api/auth</code>
                            </div>
                            <p class="text-gray-600 text-sm">Create a new user account</p>
                        </div>
                    </div>
                    
                    <div class="space-y-3 mb-4">
                        <div>
                            <span class="text-xs font-semibold text-gray-500 uppercase">Request Body</span>
                            <div class="mt-1 text-sm text-gray-700">
                                <code class="bg-gray-100 px-2 py-1 rounded">email</code> (string) - User email address<br>
                                <code class="bg-gray-100 px-2 py-1 rounded">password</code> (string) - User password
                            </div>
                        </div>
                        <div>
                            <span class="text-xs font-semibold text-gray-500 uppercase">Response</span>
                            <div class="mt-1 text-sm text-gray-700">
                                Returns <code class="bg-gray-100 px-2 py-1 rounded">userId</code> and <code class="bg-gray-100 px-2 py-1 rounded">shareToken</code>
                            </div>
                        </div>
                    </div>
                    
                    <div class="relative">
                        <div class="absolute top-3 right-3 z-10">
                            <button onclick="copyCurl(this)" data-curl='curl -X POST ${baseUrl}/api/auth \\
  -H "Content-Type: application/json" \\
  -d '"'"'{
    "email": "user@example.com",
    "password": "securepass123"
  }'"'"'' 
                                class="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white text-xs font-medium rounded transition flex items-center space-x-1">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                                </svg>
                                <span>Copy</span>
                            </button>
                        </div>
                        <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs"><code>curl -X POST ${baseUrl}/api/auth \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "user@example.com",
    "password": "securepass123"
  }'</code></pre>
                    </div>
                </div>
            </div>

            <!-- Get User -->
            <div class="bg-white rounded-xl shadow-sm border mb-4 overflow-hidden">
                <div class="p-6">
                    <div class="flex items-start justify-between mb-4">
                        <div class="flex-1">
                            <div class="flex items-center space-x-3 mb-2">
                                <span class="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded uppercase">GET</span>
                                <code class="text-sm font-mono text-gray-900">/api/user</code>
                                <span class="px-2 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded">🔒 Auth Required</span>
                            </div>
                            <p class="text-gray-600 text-sm">Get current user details</p>
                        </div>
                    </div>
                    
                    <div class="relative">
                        <div class="absolute top-3 right-3 z-10">
                            <button onclick="copyCurl(this)" data-curl='curl -X GET ${baseUrl}/api/user \\
  -H "x-authorization: Basic $(echo -n '"'"'admin@mail.com:admin123'"'"' | base64)"' 
                                class="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white text-xs font-medium rounded transition flex items-center space-x-1">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                                </svg>
                                <span>Copy</span>
                            </button>
                        </div>
                        <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs"><code>curl -X GET ${baseUrl}/api/user \\
  -H "x-authorization: Basic $(echo -n 'admin@mail.com:admin123' | base64)"</code></pre>
                    </div>
                </div>
            </div>
        </div>

        <!-- Documents Section -->
        <div class="mb-8">
            <div class="flex items-center mb-4">
                <div class="h-8 w-1 bg-purple-600 rounded mr-3"></div>
                <h2 class="text-2xl font-bold text-gray-900">📄 Documents</h2>
            </div>
            
            <!-- Upload Document -->
            <div class="bg-white rounded-xl shadow-sm border mb-4 overflow-hidden">
                <div class="p-6">
                    <div class="flex items-start justify-between mb-4">
                        <div class="flex-1">
                            <div class="flex items-center space-x-3 mb-2">
                                <span class="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded uppercase">POST</span>
                                <code class="text-sm font-mono text-gray-900">/api/docs</code>
                                <span class="px-2 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded">🔒 Auth Required</span>
                            </div>
                            <p class="text-gray-600 text-sm">Upload a PDF document for analysis</p>
                        </div>
                    </div>
                    
                    <div class="space-y-3 mb-4">
                        <div>
                            <span class="text-xs font-semibold text-gray-500 uppercase">Request Body</span>
                            <div class="mt-1 text-sm text-gray-700">
                                <code class="bg-gray-100 px-2 py-1 rounded">file</code> (file) - PDF file (multipart/form-data)
                            </div>
                        </div>
                        <div>
                            <span class="text-xs font-semibold text-gray-500 uppercase">Response</span>
                            <div class="mt-1 text-sm text-gray-700">
                                Returns <code class="bg-gray-100 px-2 py-1 rounded">documentId</code>
                            </div>
                        </div>
                    </div>
                    
                    <div class="relative">
                        <div class="absolute top-3 right-3 z-10">
                            <button onclick="copyCurl(this)" data-curl='curl -X POST ${baseUrl}/api/docs \\
  -H "x-authorization: Basic $(echo -n '"'"'admin@mail.com:admin123'"'"' | base64)" \\
  -F "file=@/path/to/document.pdf"' 
                                class="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white text-xs font-medium rounded transition flex items-center space-x-1">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                                </svg>
                                <span>Copy</span>
                            </button>
                        </div>
                        <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs"><code>curl -X POST ${baseUrl}/api/docs \\
  -H "x-authorization: Basic $(echo -n 'admin@mail.com:admin123' | base64)" \\
  -F "file=@/path/to/document.pdf"</code></pre>
                    </div>
                </div>
            </div>

            <!-- List Documents -->
            <div class="bg-white rounded-xl shadow-sm border mb-4 overflow-hidden">
                <div class="p-6">
                    <div class="flex items-start justify-between mb-4">
                        <div class="flex-1">
                            <div class="flex items-center space-x-3 mb-2">
                                <span class="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded uppercase">GET</span>
                                <code class="text-sm font-mono text-gray-900">/api/docs</code>
                                <span class="px-2 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded">🔒 Auth Required</span>
                            </div>
                            <p class="text-gray-600 text-sm">List all uploaded documents with pagination</p>
                        </div>
                    </div>
                    
                    <div class="space-y-3 mb-4">
                        <div>
                            <span class="text-xs font-semibold text-gray-500 uppercase">Query Parameters</span>
                            <div class="mt-1 text-sm text-gray-700">
                                <code class="bg-gray-100 px-2 py-1 rounded">limit</code> (number) - Maximum number of results<br>
                                <code class="bg-gray-100 px-2 py-1 rounded">offset</code> (number) - Number of results to skip
                            </div>
                        </div>
                    </div>
                    
                    <div class="relative">
                        <div class="absolute top-3 right-3 z-10">
                            <button onclick="copyCurl(this)" data-curl='curl -X GET "${baseUrl}/api/docs?limit=10&offset=0" \\
  -H "x-authorization: Basic $(echo -n '"'"'admin@mail.com:admin123'"'"' | base64)"' 
                                class="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white text-xs font-medium rounded transition flex items-center space-x-1">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                                </svg>
                                <span>Copy</span>
                            </button>
                        </div>
                        <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs"><code>curl -X GET "${baseUrl}/api/docs?limit=10&offset=0" \\
  -H "x-authorization: Basic $(echo -n 'admin@mail.com:admin123' | base64)"</code></pre>
                    </div>
                </div>
            </div>

            <!-- Get Document by ID -->
            <div class="bg-white rounded-xl shadow-sm border mb-4 overflow-hidden">
                <div class="p-6">
                    <div class="flex items-start justify-between mb-4">
                        <div class="flex-1">
                            <div class="flex items-center space-x-3 mb-2">
                                <span class="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded uppercase">GET</span>
                                <code class="text-sm font-mono text-gray-900">/api/docs/:id</code>
                                <span class="px-2 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded">🔒 Auth Required</span>
                            </div>
                            <p class="text-gray-600 text-sm">Get details of a specific document</p>
                        </div>
                    </div>
                    
                    <div class="space-y-3 mb-4">
                        <div>
                            <span class="text-xs font-semibold text-gray-500 uppercase">Path Parameters</span>
                            <div class="mt-1 text-sm text-gray-700">
                                <code class="bg-gray-100 px-2 py-1 rounded">id</code> (string) - Document ID
                            </div>
                        </div>
                    </div>
                    
                    <div class="relative">
                        <div class="absolute top-3 right-3 z-10">
                            <button onclick="copyCurl(this)" data-curl='curl -X GET ${baseUrl}/api/docs/YOUR_DOCUMENT_ID \\
  -H "x-authorization: Basic $(echo -n '"'"'admin@mail.com:admin123'"'"' | base64)"' 
                                class="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white text-xs font-medium rounded transition flex items-center space-x-1">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                                </svg>
                                <span>Copy</span>
                            </button>
                        </div>
                        <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs"><code>curl -X GET ${baseUrl}/api/docs/YOUR_DOCUMENT_ID \\
  -H "x-authorization: Basic $(echo -n 'admin@mail.com:admin123' | base64)"</code></pre>
                    </div>
                </div>
            </div>
        </div>

        <!-- Query Section -->
        <div class="mb-8">
            <div class="flex items-center mb-4">
                <div class="h-8 w-1 bg-indigo-600 rounded mr-3"></div>
                <h2 class="text-2xl font-bold text-gray-900">💬 Query</h2>
            </div>
            
            <!-- Ask Question -->
            <div class="bg-white rounded-xl shadow-sm border mb-4 overflow-hidden">
                <div class="p-6">
                    <div class="flex items-start justify-between mb-4">
                        <div class="flex-1">
                            <div class="flex items-center space-x-3 mb-2">
                                <span class="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded uppercase">POST</span>
                                <code class="text-sm font-mono text-gray-900">/api/ask</code>
                                <span class="px-2 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded">🔒 Auth Required</span>
                            </div>
                            <p class="text-gray-600 text-sm">Ask a question and get AI-powered answers with document sources</p>
                        </div>
                    </div>
                    
                    <div class="space-y-3 mb-4">
                        <div>
                            <span class="text-xs font-semibold text-gray-500 uppercase">Request Body</span>
                            <div class="mt-1 text-sm text-gray-700">
                                <code class="bg-gray-100 px-2 py-1 rounded">query</code> (string) - Your question<br>
                                <code class="bg-gray-100 px-2 py-1 rounded">k</code> (number, optional) - Number of sources to return (default: 3)
                            </div>
                        </div>
                    </div>
                    
                    <div class="relative">
                        <div class="absolute top-3 right-3 z-10">
                            <button onclick="copyCurl(this)" data-curl='curl -X POST ${baseUrl}/api/ask \\
  -H "Content-Type: application/json" \\
  -H "x-authorization: Basic $(echo -n '"'"'admin@mail.com:admin123'"'"' | base64)" \\
  -d '"'"'{
    "query": "What is this document about?",
    "k": 3
  }'"'"'' 
                                class="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white text-xs font-medium rounded transition flex items-center space-x-1">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                                </svg>
                                <span>Copy</span>
                            </button>
                        </div>
                        <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs"><code>curl -X POST ${baseUrl}/api/ask \\
  -H "Content-Type: application/json" \\
  -H "x-authorization: Basic $(echo -n 'admin@mail.com:admin123' | base64)" \\
  -d '{
    "query": "What is this document about?",
    "k": 3
  }'</code></pre>
                    </div>
                </div>
            </div>
        </div>

        <!-- Index Management Section -->
        <div class="mb-8">
            <div class="flex items-center mb-4">
                <div class="h-8 w-1 bg-emerald-600 rounded mr-3"></div>
                <h2 class="text-2xl font-bold text-gray-900">🔍 Index Management</h2>
            </div>
            
            <!-- Rebuild Index -->
            <div class="bg-white rounded-xl shadow-sm border mb-4 overflow-hidden">
                <div class="p-6">
                    <div class="flex items-start justify-between mb-4">
                        <div class="flex-1">
                            <div class="flex items-center space-x-3 mb-2">
                                <span class="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded uppercase">POST</span>
                                <code class="text-sm font-mono text-gray-900">/api/index/rebuild</code>
                                <span class="px-2 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded">🔒 Auth Required</span>
                            </div>
                            <p class="text-gray-600 text-sm">Rebuild the vector search index for all documents</p>
                        </div>
                    </div>
                    
                    <div class="relative">
                        <div class="absolute top-3 right-3 z-10">
                            <button onclick="copyCurl(this)" data-curl='curl -X POST ${baseUrl}/api/index/rebuild \\
  -H "x-authorization: Basic $(echo -n '"'"'admin@mail.com:admin123'"'"' | base64)"' 
                                class="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white text-xs font-medium rounded transition flex items-center space-x-1">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                                </svg>
                                <span>Copy</span>
                            </button>
                        </div>
                        <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs"><code>curl -X POST ${baseUrl}/api/index/rebuild \\
  -H "x-authorization: Basic $(echo -n 'admin@mail.com:admin123' | base64)"</code></pre>
                    </div>
                </div>
            </div>

            <!-- Get Index Stats -->
            <div class="bg-white rounded-xl shadow-sm border mb-4 overflow-hidden">
                <div class="p-6">
                    <div class="flex items-start justify-between mb-4">
                        <div class="flex-1">
                            <div class="flex items-center space-x-3 mb-2">
                                <span class="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded uppercase">GET</span>
                                <code class="text-sm font-mono text-gray-900">/api/index/stats</code>
                                <span class="px-2 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded">🔒 Auth Required</span>
                            </div>
                            <p class="text-gray-600 text-sm">Get vector search index statistics and health metrics</p>
                        </div>
                    </div>
                    
                    <div class="relative">
                        <div class="absolute top-3 right-3 z-10">
                            <button onclick="copyCurl(this)" data-curl='curl -X GET ${baseUrl}/api/index/stats \\
  -H "x-authorization: Basic $(echo -n '"'"'admin@mail.com:admin123'"'"' | base64)"' 
                                class="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white text-xs font-medium rounded transition flex items-center space-x-1">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                                </svg>
                                <span>Copy</span>
                            </button>
                        </div>
                        <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs"><code>curl -X GET ${baseUrl}/api/index/stats \\
  -H "x-authorization: Basic $(echo -n 'admin@mail.com:admin123' | base64)"</code></pre>
                    </div>
                </div>
            </div>
        </div>

        <!-- Meta Section -->
        <div class="mb-8">
            <div class="flex items-center mb-4">
                <div class="h-8 w-1 bg-gray-600 rounded mr-3"></div>
                <h2 class="text-2xl font-bold text-gray-900">🔧 Meta</h2>
            </div>
            
            <!-- Health Check -->
            <div class="bg-white rounded-xl shadow-sm border mb-4 overflow-hidden">
                <div class="p-6">
                    <div class="flex items-start justify-between mb-4">
                        <div class="flex-1">
                            <div class="flex items-center space-x-3 mb-2">
                                <span class="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded uppercase">GET</span>
                                <code class="text-sm font-mono text-gray-900">/api/health</code>
                            </div>
                            <p class="text-gray-600 text-sm">Health check endpoint to verify API availability</p>
                        </div>
                    </div>
                    
                    <div class="relative">
                        <div class="absolute top-3 right-3 z-10">
                            <button onclick="copyCurl(this)" data-curl='curl -X GET ${baseUrl}/api/health' 
                                class="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white text-xs font-medium rounded transition flex items-center space-x-1">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                                </svg>
                                <span>Copy</span>
                            </button>
                        </div>
                        <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs"><code>curl -X GET ${baseUrl}/api/health</code></pre>
                    </div>
                </div>
            </div>

            <!-- API Meta -->
            <div class="bg-white rounded-xl shadow-sm border mb-4 overflow-hidden">
                <div class="p-6">
                    <div class="flex items-start justify-between mb-4">
                        <div class="flex-1">
                            <div class="flex items-center space-x-3 mb-2">
                                <span class="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded uppercase">GET</span>
                                <code class="text-sm font-mono text-gray-900">/api/_meta</code>
                            </div>
                            <p class="text-gray-600 text-sm">API metadata and version information</p>
                        </div>
                    </div>
                    
                    <div class="relative">
                        <div class="absolute top-3 right-3 z-10">
                            <button onclick="copyCurl(this)" data-curl='curl -X GET ${baseUrl}/api/_meta' 
                                class="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white text-xs font-medium rounded transition flex items-center space-x-1">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                                </svg>
                                <span>Copy</span>
                            </button>
                        </div>
                        <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs"><code>curl -X GET ${baseUrl}/api/_meta</code></pre>
                    </div>
                </div>
            </div>

            <!-- Hackathon JSON -->
            <div class="bg-white rounded-xl shadow-sm border mb-4 overflow-hidden">
                <div class="p-6">
                    <div class="flex items-start justify-between mb-4">
                        <div class="flex-1">
                            <div class="flex items-center space-x-3 mb-2">
                                <span class="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded uppercase">GET</span>
                                <code class="text-sm font-mono text-gray-900">/.well-known/hackathon.json</code>
                            </div>
                            <p class="text-gray-600 text-sm">Hackathon project metadata in standard format</p>
                        </div>
                    </div>
                    
                    <div class="relative">
                        <div class="absolute top-3 right-3 z-10">
                            <button onclick="copyCurl(this)" data-curl='curl -X GET ${baseUrl}/.well-known/hackathon.json' 
                                class="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white text-xs font-medium rounded transition flex items-center space-x-1">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                                </svg>
                                <span>Copy</span>
                            </button>
                        </div>
                        <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs"><code>curl -X GET ${baseUrl}/.well-known/hackathon.json</code></pre>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        function copyCurl(button) {
            const curlCommand = button.getAttribute('data-curl');
            navigator.clipboard.writeText(curlCommand).then(() => {
                // Show success feedback
                const feedback = document.createElement('div');
                feedback.className = 'copy-feedback';
                feedback.innerHTML = '<strong>✓ Copied!</strong> cURL command copied to clipboard';
                document.body.appendChild(feedback);
                
                // Change button text temporarily
                const originalHTML = button.innerHTML;
                button.innerHTML = '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg><span>Copied!</span>';
                
                setTimeout(() => {
                    feedback.remove();
                    button.innerHTML = originalHTML;
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy:', err);
            });
        }
    </script>
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
