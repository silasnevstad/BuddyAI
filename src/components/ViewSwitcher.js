import './styles/ViewSwitcher.css'
import checkBox from './images/check-box-empty.png';
import checkBoxSide from './images/side-view.png';

const ViewSwitcher = ({ handleViewSwitch, view, special }) => {
    return (
        <div className={`view-switcher-container ${special ? 'view-switcher-container-special' : ''}`} onClick={handleViewSwitch}>
            <div className={`slider ${view ? 'slide-right' : 'slide-left'}`}></div>
            <img src={checkBox} alt="view switcher" className="view-switcher-box" />
            <img src={checkBoxSide} alt="view switcher" className="view-switcher-box" />
        </div>
    );
}

export default ViewSwitcher;
