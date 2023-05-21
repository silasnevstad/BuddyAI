import './styles/Title.css';
import { Link } from 'react-router-dom';
import './styles/Buttons.css'
// import BuddyLogo from './images/buddyLogo.png';

const Title = ({ hideMobile }) => {
    const title = 'Buddy';

    return (
        <div className="title-container">
            <div className="title">
                {/* <img src={BuddyLogo} alt="Buddy Logo" className="buddy-logo" /> */}
                {window.innerWidth > 600 ? <Link to="/" className="transparent-button-large"> {title.toLocaleUpperCase()} </Link> : <Link to="/signup" className="full-button" style={hideMobile ? {display: "none"} : {}}>Sign Up</Link>}
            </div>
        </div>
    );
};

export default Title;
