import './styles/HeaderNav.css';
import './styles/Buttons.css'
import { Link } from 'react-router-dom';

const HeaderNav = ({ handleSave, loggedIn }) => {
    return (
        <div className="header-nav-container" onClick={handleSave}>
            {/* {currentPage !== "/help" && <Link to="/help" className="transparent-button">Help</Link>}
            {currentPage !== "/api" && <Link to="/api" className="transparent-button">API</Link>}
            {currentPage !== "/" && <Link to="/" className="transparent-button">Home</Link>} */}
            <Link to="/help" className="transparent-button">Help</Link>
            <Link to="/api" className="transparent-button">API</Link>
            {loggedIn && <Link to="/account" className="transparent-button">Account</Link>}
            <Link to="/" className="transparent-button">Home</Link>
            {/* {currentPage !== "/home" && <Link to="/home" className="transparent-button">Home</Link>} */}
            {/* {currentPage !== "/side" && <Link to="/side" className="transparent-button">Side</Link>} */}
            {window.innerWidth > 600 && !loggedIn && <Link to="/signup" className="full-button">Sign Up</Link>}
        </div>
    );
}

export default HeaderNav;
