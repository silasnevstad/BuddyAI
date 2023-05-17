import './styles/InputButtons.css';
import './styles/Buttons.css';
import TextInputInfo from './TextInputInfo';
import Api from './Api';

const InputButtons = ({ text, setText, isLoading, setIsLoading, style }) => {
    const { formalizeText, niceifyText, autoText } = Api();

    const handleClear = () => {
        if (isLoading || !text) return;
        setText('');
    };

    const handleFormalize = () => {
        if (isLoading || !text) return;
        setIsLoading(true);
        formalizeText(text, style).then((data) => {
            setText(data.response);
            setIsLoading(false);
        });
    };

    const handleNiceify = () => {
        if (isLoading || !text) return;
        setIsLoading(true);
        niceifyText(text, style).then((data) => {
            setText(data.response);
            setIsLoading(false);
        });
    };

    const handleAsk = () => {
        if (isLoading || !text) return;
        setIsLoading(true);
        autoText(text, style).then((data) => {
            console.log('auto response', data.response);
            setText(data.response);
            setIsLoading(false);
        });
    };

    return (
        <div className="input-buttons-container">
            <div className="input-buttons-container-left">
                <button className="transparent-button" onClick={handleClear} disabled={isLoading}>Clear</button>
                <button className="transparent-button" onClick={handleFormalize} disabled={isLoading}>Formalize</button>
                <button className="transparent-button" onClick={handleNiceify} disabled={isLoading}>Improve</button>
                <button className="transparent-button" onClick={handleAsk} disabled={isLoading}>Ask</button>
            </div>

            <div className="input-buttons-container-right">
                <TextInputInfo text={text} />
            </div>
        </div>
    );
}

export default InputButtons;
