import React, { useEffect, useState } from 'react';
import './styles/Background.css';

const Background = ({ children }) => {
    const [viewBox, setViewBox] = useState("0 0 800 480");
    const [ellipse1, setEllipse1] = useState({cx: "760.7990667557181", cy: "447.28090669500347"});
    const [ellipse2, setEllipse2] = useState({cx: "18.406416504717754", cy: "2.343650526774155"});

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth < window.innerHeight) {
                // Mobile (vertical) layout
                setViewBox("0 0 480 10000");
                setEllipse1({cx: "447.28090669500347", cy: "760.7990667557181"});
                setEllipse2({cx: "2.343650526774155", cy: "18.406416504717754"});
            } else {
                // Desktop (horizontal) layout
                setViewBox("0 0 800 4800");
                setEllipse1({cx: "750.7990667557181", cy: "447.28090669500347"});
                setEllipse2({cx: "28.406416504717754", cy: "12.343650526774155"});
            }
        }

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="background">
            <div className="background-svg">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xlink="http://www.w3.org/1999/xlink" svgjs="http://svgjs.dev/svgjs" viewBox={viewBox} opacity="1">
                    <defs>
                        <filter id="bbblurry-filter" x="-100%" y="-100%" width="400%" height="400%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feGaussianBlur stdDeviation="130" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" edgeMode="none" result="blur"></feGaussianBlur>
                        </filter>
                    </defs>
                    <g filter="url(#bbblurry-filter)">
                        <ellipse id="ellipse1" rx="96" ry="90" cx={ellipse1.cx} cy={ellipse1.cy} fill="#fb2576ff">
                            <animateTransform 
                                attributeName="transform" 
                                type="translate" 
                                from="760,1047" 
                                to="760.343650526774155,447.28090669500347"
                                begin="0s" 
                                dur="1.5s" 
                                repeatCount="1"
                            />
                        </ellipse>
                        <ellipse id="ellipse2" rx="96" ry="90" cx={ellipse2.cx} cy={ellipse2.cy} fill="#77d970ff">
                            <animateTransform 
                                attributeName="transform" 
                                type="translate" 
                                from="0,600" 
                                to="0,0.343650526774155"
                                begin="0s" 
                                dur="1s" 
                                repeatCount="1"
                            />
                        </ellipse>
                    </g>
                </svg>
            </div>
            <div className="background-content">
                {children}
            </div>
        </div>
    );
};

export default Background;
