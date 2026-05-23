const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const submitContactForm = async (formData) => {
    console.log('Sending request to:', `${API_URL}/contact`);
    try {
        const response = await fetch(`${API_URL}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        console.log('Response status:', response.status);

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            const text = await response.text();
            console.error('Non-JSON response received:', text);
            throw new Error(`Server returned non-JSON response: ${response.status}`);
        }

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to send message');
        }

        return data;
    } catch (error) {
        console.error('API Error Details:', {
            message: error.message,
            stack: error.stack
        });
        throw error;
    }
};

export default { submitContactForm };
