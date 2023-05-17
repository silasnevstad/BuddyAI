const Api = () => {
    const BASE_URL = 'https://buddyai.herokuapp.com/';

    const aiComplete = async (text, style) => {
        if (!text) return '';
        console.log('ai complete', text);
        const response = await fetch(`${BASE_URL}v1/buddy`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text, style })
        });
        const data = await response.json();
        return data;
    }

    const formalizeText = async (text, style) => {
        if (!text) return '';
        console.log('formalize', text);
        const response = await fetch(`${BASE_URL}v1/formalize`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text, style })
        });
        const data = await response.json();
        return data;
    }

    const niceifyText = async (text, style) => {
        if (!text) return '';
        console.log('niceify', text);
        const response = await fetch(`${BASE_URL}v1/niceify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text, style })
        });
        const data = await response.json();
        return data;
    }

    const autoText = async (text, style) => {
        if (!text) return '';
        console.log('auto', text);
        const response = await fetch(`${BASE_URL}auto`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text, style })
        });
        const data = await response.json();
        console.log('auto data', data);
        return data;
    }

    return { aiComplete, formalizeText, niceifyText, autoText };
};

export default Api;