import './styles/TextInputInfo.css'

const TextInputInfo = ({ text }) => {
    const getWordCount = (text) => {
        // Split on white space and filter out empty strings
        const words = text.split(/\s+/).filter(word => word.length > 0);
        return words.length;
    };

    const getWordCountString = (text) => {
        const wordCount = getWordCount(text);
        return wordCount === 1 ? wordCount + ' word' : wordCount + ' words';
    };

    return (
        <>
            {text && <p className="text-input-info-text">{getWordCountString(text)}</p>}
        </>
    );
}

export default TextInputInfo;