import { useState, useEffect } from 'react';
import './styles/ApiEndpoint.css';
import SliderOpen from './SliderOpen';
import downChevron from './images/chevron-down.svg';

const parseStringToJSON = (str) => {
    try {
        return JSON.parse(str.replace(/(\w+):/g, '"$1":').replace(/'/g, '"'));
    } catch(err) {
        return null;
    }
}

const CodeContainer = ({ data, value }) => {
    return (
        <>
            <p className="api-endpoint-code">{'{'}</p>
            {Object.entries(data).map(([key, val], index) => (
                <p key={index} className="api-endpoint-code indent">
                    <>{`"${key}": `} <span className={typeof val === 'string' ? "string" : "number"}>{key === 'style' ? value : key === 'synonyms' ? `["${val}"]` : `"${val}"`}</span>{index !== Object.entries(data).length - 1 ? ',' : ''}</>
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
    const [value, setValue] = useState(2);
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
                <img src={downChevron} alt="down chevron" className={`chevron ${isOpen ? 'open' : 'closed'}`} />
            </div>
            {isOpen &&
                <div className="api-endpoint-container-open">
                    <div className="line"></div>
                    <p className="api-endpoint-request"><span className="bold">Request Body</span> <span className="orange semibold">(Required)</span></p>
                    <p className="api-endpoint-description">{inputDescription}</p>
                    {parsedExample &&
                        <div className="api-endpoint-code-container">
                            <CodeContainer data={parsedExample} value={value} />
                        </div>
                    }
                    {/* table of text and style to explain them */}
                    {/* explain the style, 1-5, 1 is casual and 5 is formal */}
                    <SliderOpen value={value} setValue={setValue} />
                    {/* <table className="api-endpoint-table">
                        <thead>
                            <tr>
                                <th>Style</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Playful</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Relaxed</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Balanced</td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>Formal</td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>Academic</td>
                            </tr>
                        </tbody>
                    </table> */}
                    <p className="api-endpoint-response"><span className="bold">Response</span></p>
                    <p className="api-endpoint-description"><span className="semibold green">200</span> {outputDescription}</p>
                    {parsedResponse &&
                        <div className="api-endpoint-code-container">
                            <CodeContainer data={parsedResponse} value={value} />
                        </div>
                    }
                    <p className="api-endpoint-description semibold"><span className="red">400</span> Bad request</p>
                    {parsedResponse &&
                        <div className="api-endpoint-code-container">
                            <CodeContainer data={parsedBadRequest} value={value} />
                        </div>
                    }
                </div>
            }
        </div>
        
    );
}

export default ApiEndpoint;
