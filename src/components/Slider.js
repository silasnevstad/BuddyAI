import React, { useState } from 'react';
import Slider from 'react-input-slider';
import './styles/SliderOpen.css';
import chevron from './images/chevron-down.svg'

const sliderStyles = {
  track: {
    backgroundColor: '#d0d0d0',
    background: 'linear-gradient(to right, #77d970, #adbe32, #d79c0d, #f5722f, #ff3f5c)'
  },
  active: {
    backgroundColor: 'transparent'
  },
  thumb: {
    width: 20,
    height: 20
  },
  disabled: {
    opacity: 0.5
  }
};

const modes = ["Playful", "Relaxed", "Balanced", "Formal", "Academic"];

const StyleSlider = ({ value, setValue }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleChange = (newValue) => {
        setValue(newValue.x);
    };

    const toggleSlider = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="style-slider" style={{ marginBottom: isOpen ? 16 : 45, width: isOpen ? 300 : 250 }}>
            <button onClick={toggleSlider} className="style-slider-header">
                <img src={chevron} alt="chevron" className={`chevron ${isOpen ? 'chevron-open' : 'chevron-closed'}`} />
                {isOpen && <h3><span className="faded-subheader">Style</span>{modes[value]}</h3> }
            </button>
            {isOpen && (
                <div className="slider-container">
                    <Slider
                        axis="x"
                        xstep={1}
                        xmin={0}
                        xmax={4}
                        x={value}
                        onChange={handleChange}
                        styles={sliderStyles}
                    />
                </div>
            )}
        </div>
    );
};

export default StyleSlider;
