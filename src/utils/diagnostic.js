const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
console.log('--- FRONTEND DIAGNOSTIC ---');
console.log('API_URL reached:', API_URL);
console.log('VITE_API_URL from env:', import.meta.env.VITE_API_URL);
console.log('Current URL:', window.location.href);
console.log('---------------------------');
