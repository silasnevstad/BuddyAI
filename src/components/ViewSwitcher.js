import './styles/ViewSwitcher.css'
import checkBox from './images/check-box-empty.png';
import checkBoxSide from './images/side-view.png';

const ViewSwitcher = ({ handleViewSwitch, view }) => {
    return (
        <div className="view-switcher-container" onClick={handleViewSwitch}>
            <div className={`slider ${view ? 'slide-right' : 'slide-left'}`}></div>
            <img src={checkBox} alt="view switcher" className="view-switcher-box" />
            <img src={checkBoxSide} alt="view switcher" className="view-switcher-box" />
        </div>
    );
}

export default ViewSwitcher;
