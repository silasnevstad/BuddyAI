import './styles/Loader.css'

const Loader = () => {
    return (
        <div className="loader-container">
            <div class="loader">
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="shadow"></div>
                <div class="shadow"></div>
                <div class="shadow"></div>
            </div>
        </div>
    );
}

export default Loader;