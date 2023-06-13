import { useState, useEffect } from 'react';
import './styles/ApiEndpoint.css';

const parseStringToJSON = (str) => {
    try {
        return JSON.parse(str.replace(/(\w+):/g, '"$1":').replace(/'/g, '"'));
    } catch(err) {
        return null;
    }
}

const CodeContainer = ({ data }) => {
    return (
        <>
            <p className="api-endpoint-code">{'{'}</p>
            {Object.entries(data).map(([key, val], index) => (
                <p key={index} className="api-endpoint-code indent">
                    <>{`"${key}": `} <span className={typeof val === 'string' ? "string" : "number"}>{key === 'synonyms' ? `["${val}"]` : key === 'sources' ? `[${val}]` : `"${val}"`}</span>{index !== Object.entries(data).length - 1 ? ',' : ''}</>
                </p>
            ))}
            <p className="api-endpoint-code">{'}'}</p>
        </>
    )
}

const ApiEndpoint = ({ endpoint, description, inputDescription, outputDescription, example, response }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [parsedExample, setParsedExample] = useState(null);
    const [parsedResponse, setParsedResponse] = useState(null);
    const [parsedBadRequest, setParsedBadRequest] = useState(null);
    const badRequest = "{error: \"string\"}";

    useEffect(() => {
        setParsedExample(parseStringToJSON(example));
    }, [example]);

    useEffect(() => {
        setParsedResponse(parseStringToJSON(response));
    }, [response]);

    useEffect(() => {
        setParsedBadRequest(parseStringToJSON(badRequest));
    }, [badRequest]);

    return (
        <div className={`api-endpoint-container ${isOpen ? 'open' : 'closed'}`}>
            <div className="api-endpoint-container-closed" onClick={() => setIsOpen(!isOpen)}>
                <h3 className="api-endpoint-type">POST</h3>
                <h3 className="api-endpoint-title">{endpoint}</h3>
                <p className="api-endpoint-description-closed">{description}</p>
                {/* <img src={downChevron} alt="down chevron" className={`chevron ${isOpen ? 'open' : 'closed'}`} /> */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`chevron ${isOpen ? 'open' : 'closed'}`}><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
            {isOpen &&
                <div className="api-endpoint-container-open">
                    <div className="line"></div>
                    <p className="api-endpoint-request"><span className="bold">Request Body</span> <span className="orange semibold">(Required)</span></p>
                    <p className="api-endpoint-description">{inputDescription}</p>
                    {parsedExample &&
                        <div className="api-endpoint-code-container">
                            <CodeContainer data={parsedExample} />
                        </div>
                    }
                    <p className="api-endpoint-response"><span className="bold">Response</span></p>
                    <p className="api-endpoint-description"><span className="semibold green">200</span> {outputDescription}</p>
                    {parsedResponse &&
                        <div className="api-endpoint-code-container">
                            <CodeContainer data={parsedResponse} />
                        </div>
                    }
                    <p className="api-endpoint-description semibold"><span className="red">400</span> Bad request</p>
                    {parsedResponse &&
                        <div className="api-endpoint-code-container">
                            <CodeContainer data={parsedBadRequest} />
                        </div>
                    }
                </div>
            }
        </div>
        
    );
}

export default ApiEndpoint;
