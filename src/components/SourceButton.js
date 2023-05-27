import './styles/SourceButton.css'
import './styles/Buttons.css'

const SourceButton = ({ setSourceModalOpen }) => {
    const handleClick = () => {
        setSourceModalOpen(true);
    };

    return (
        <div className="source-button-container">
            <button className={window.innerWidth > 768 ? "full-button" : "transparent-button"} onClick={handleClick}>Sources</button>
        </div>
    );
}

export default SourceButton;