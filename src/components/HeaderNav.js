import './styles/HeaderNav.css';
import './styles/Buttons.css'
import { Link } from 'react-router-dom';

const HeaderNav = ({ currentPage }) => {
    return (
        <div className="header-nav-container">
            {currentPage !== "/help" && <Link to="/help" className="transparent-button">Help</Link>}
            {currentPage !== "/api" && <Link to="/api" className="transparent-button">API</Link>}
            {currentPage !== "/" && <Link to="/" className="transparent-button">Home</Link>}
            {window.innerWidth > 600 && currentPage !== "/signup" && <Link to="/signup" className="full-button">Sign Up</Link>}
        </div>
    );
}

export default HeaderNav;
