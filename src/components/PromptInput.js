import './styles/PromptInput.css'

const PromptInput = ({ prompt, setPrompt }) => {
    // create a shorter version of the prompt input for mobile
    const placeHolder = window.innerWidth < 600 ? 'Give buddy context...' : 'Tell buddy what you want to write about...';
    return (
        <div className="prompt-input-container">
            <textarea
                className="prompt-input"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={placeHolder}
                rows={1}
            />
        </div>
    );
};

export default PromptInput;