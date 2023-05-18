const { Configuration, OpenAIApi } = require("openai");

const Api = () => {
    const BASE_URL = 'https://buddyai.herokuapp.com/';
    const adminKey = "buddySilasAdminKey1107";
    const configuration = new Configuration({ apiKey: process.env.REACT_APP_OPENAI_API_KEY });
    const openai = new OpenAIApi(configuration);
    // const { abortController } = useContext(AbortContext);

    const aiComplete = async (text, style, prompt) => {
        if (!text) return '';
        const response = await fetch(`${BASE_URL}v1/buddy`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${adminKey}`,
            },
            body: JSON.stringify({ text, style, prompt }),
            // signal: abortController.signal
        });
        const data = await response.json();
        return data;
    }

    const formalizeText = async (text, style, prompt) => {
        if (!text) return '';
        const response = await fetch(`${BASE_URL}v1/formalize`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${adminKey}`,
            },
            body: JSON.stringify({ text, style, prompt }),
            // signal: abortController.signal
        });
        const data = await response.json();
        return data;
    }

    const niceifyText = async (text, style, prompt) => {
        if (!text) return '';
        const response = await fetch(`${BASE_URL}v1/niceify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${adminKey}`,
            },
            body: JSON.stringify({ text, style, prompt }),
            // signal: abortController.signal
        });
        const data = await response.json();
        return data;
    }

    const autoText = async (text) => {
        if (!text) return '';
        try {
            const response = await openai.createChatCompletion({
              model: 'gpt-4',
              messages: [{'role': 'user', 'content': text}],
            });
            return response.data.choices[0].message.content;
        } catch (error) {
            console.error("Error in askGPT:", error);
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
            // signal: abortController.signal
        });
        const data = await response.json();
        return data;
    }

    async function createAPIKey() {
        const response = await fetch(`${BASE_URL}v1/create_api_key`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${adminKey}`,
            },
        })
        const data = await response.json();
        return data;
    }

    return { aiComplete, formalizeText, niceifyText, autoText, synonym, createAPIKey };
};

export default Api;