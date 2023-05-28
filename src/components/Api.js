const { Configuration, OpenAIApi } = require("openai");

const Api = () => {
    const BASE_URL = 'https://buddyai.herokuapp.com/';
    const PUBLIC_BASE_URL = 'https://apibuddy.herokuapp.com/v1/';
    const adminKey = process.env.REACT_APP_BUDDYAI_ADMIN_KEY;
    const configuration = new Configuration({ apiKey: process.env.REACT_APP_OPENAI_API_KEY });
    const openai = new OpenAIApi(configuration);

    const aiComplete = async (text, sources, prompt, signal) => {
        if (!text) return '';
        let data;
        try {
            const response = await fetch(`${BASE_URL}v1/buddy`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${adminKey}`,
                },
                body: JSON.stringify({ text, sources, prompt }),
                signal: signal,
            });
            data = await response.json();
        } catch (error) {
            if (error.name === 'AbortError') {
                // console.log('Fetch aborted'); // ignore the error or handle it in a way that doesn't affect UX
            } else {
                // console.log(error);
                throw error; // re-throw the error if it's not an AbortError
            }
        }
        return data;
    }

    const aiComplete2 = async (text, sources, prompt, signal) => {
        if (!text) return '';
        let data;
        try {
            const response = await fetch(`${BASE_URL}v2/buddy`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${adminKey}`,
                },
                body: JSON.stringify({ text, sources, prompt }),
                signal: signal,
            });
            data = await response.json();
        } catch (error) {
            if (error.name === 'AbortError') {
                // console.log('Fetch aborted'); // ignore the error or handle it in a way that doesn't affect UX
            } else {
                throw error; // re-throw the error if it's not an AbortError
            }
        }
        return data;
    }

    const formalizeText = async (text, sources, prompt) => {
        if (!text) return '';
        const response = await fetch(`${BASE_URL}v1/formalize`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${adminKey}`,
            },
            body: JSON.stringify({ text, sources, prompt }),
            // signal: abortController.signal
        });
        const data = await response.json();
        return data;
    }

    const niceifyText = async (text, sources, prompt) => {
        if (!text) return '';
        const response = await fetch(`${BASE_URL}v1/improve`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${adminKey}`,
            },
            body: JSON.stringify({ text, sources, prompt }),
            // signal: abortController.signal
        });
        const data = await response.json();
        return data;
    }

    const askText = async (text) => {
        if (!text) return '';
        try {
            const response = await openai.createChatCompletion({
              model: 'gpt-4',
              messages: [{'role': 'user', 'content': text}],
            });
            return response.data.choices[0].message.content;
        } catch (error) {
            throw error;
        }
    }

    const synonym = async (word) => {
        if (!word) return '';
        const response = await fetch(`${BASE_URL}v1/synonym`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${adminKey}`,
            },
            body: JSON.stringify({ word }),
        });
        const data = await response.json();
        return data;
    }

    async function createAPIKey() {
        const response = await fetch(`${PUBLIC_BASE_URL}create_api_key`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${adminKey}`,
            },
        })
        const data = await response.json();
        return data;
    }

    return { aiComplete, aiComplete2, formalizeText, niceifyText, askText, synonym, createAPIKey };
};

export default Api;