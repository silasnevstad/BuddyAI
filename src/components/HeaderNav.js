import './styles/HeaderNav.css';
import './styles/Buttons.css'
import { Link } from 'react-router-dom';

const HeaderNav = ({ handleSave, loggedIn }) => {
    return (
        <div className="header-nav-container" onClick={handleSave}>
            <Link to="/help" className="transparent-button">Help</Link>
            <Link to="/api" className="transparent-button">API</Link>
            {loggedIn && <Link to="/account" className="transparent-button">Account</Link>}
            <Link to="/" className="transparent-button">Home</Link>
            {window.innerWidth > 600 && !loggedIn && <Link to="/signup" className="full-button">Sign Up</Link>}
        </div>
    );
}

export default HeaderNav;
