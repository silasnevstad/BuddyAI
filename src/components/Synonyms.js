import './styles/Synonyms.css'

const Synonyms = ({ synonyms, definitions, replaceWithSynonym }) => {
    if (!synonyms || synonyms.length <= 0) return null;
    return (
        <div className="synonyms-container">
            <p className="definition-text">{definitions[0]}</p>
            <div className="synonym-box">
                {synonyms.map(syn => (
                    <div key={syn} onClick={() => replaceWithSynonym(syn)} className="synonym-text">{syn}</div>
                ))}
            </div>
        </div>
    );
}

export default Synonyms;