import './styles/Title.css';
import { Link } from 'react-router-dom';
import './styles/Buttons.css'
// import BuddyLogo from './images/buddyLogo.png';

const Title = ({ hideMobile, loggedIn }) => {
    const title = 'Buddy';

    const getTitle = () => {
        if (window.innerWidth > 600) {
            return <Link to="/" className="transparent-button-large">{title.toLocaleUpperCase()}</Link>;
        } else if (!loggedIn) {
            if (hideMobile) {
                return <Link to="/" className="transparent-button-large">{title.toLocaleUpperCase()}</Link>;
            }
            // return <Link to="/signup" className="full-button" style={hideMobile ? {display: "none"} : {}}>Sign Up</Link>;
        } else {
            return <Link to="/" className="transparent-button-large">{title.toLocaleUpperCase()}</Link>;
        }
    };

    return (
        <div className="title-container">
            <div className="title">
                {getTitle()}
            </div>
        </div>
    );
};

export default Title;
