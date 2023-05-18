const Api = () => {
    const BASE_URL = 'https://buddyai.herokuapp.com/';

    const aiComplete = async (text, style, prompt) => {
        if (!text) return '';
        const response = await fetch(`${BASE_URL}v1/buddy`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text, style, prompt })
        });
        const data = await response.json();
        return data;
    }

    const formalizeText = async (text, style, prompt) => {
        if (!text) return '';
        const response = await fetch(`${BASE_URL}v1/formalize`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text, style, prompt })
        });
        const data = await response.json();
        return data;
    }

    const niceifyText = async (text, style, prompt) => {
        if (!text) return '';
        const response = await fetch(`${BASE_URL}v1/niceify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text, style, prompt })
        });
        const data = await response.json();
        return data;
    }

    const autoText = async (text, style) => {
        if (!text) return '';
        const response = await fetch(`${BASE_URL}v1/ask`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text, style })
        });
        const data = await response.json();
        return data;
    }

    const synonym = async (word) => {
        if (!word) return '';
        const response = await fetch(`${BASE_URL}v1/synonym`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ word })
        });
        const data = await response.json();
        return data;
    }

    return { aiComplete, formalizeText, niceifyText, autoText, synonym };
};

export default Api;