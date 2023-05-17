import './styles/Title.css';

const Title = () => {
    const title = 'Buddy';

    return (
        <div className="title-container">
            <div className="title">
                {title.toLocaleUpperCase()}
            </div>
        </div>
    );
};

export default Title;
