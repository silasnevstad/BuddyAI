import './styles/Loader.css'

const Loader = () => {
    return (
        <div className="loader-container">
            <div className="loader">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="shadow"></div>
                <div className="shadow"></div>
                <div className="shadow"></div>
            </div>
        </div>
    );
}

export default Loader;