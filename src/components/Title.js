import './styles/Title.css';
import { Link } from 'react-router-dom';
import './styles/Buttons.css'

const Title = () => {
    const title = 'Buddy';

    return (
        <div className="title-container">
            <div className="title">
                <Link to="/" className="transparent-button-large"> {title.toLocaleUpperCase()} </Link>
            </div>
        </div>
    );
};

export default Title;
