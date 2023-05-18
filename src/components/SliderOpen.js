import React from 'react';
import Slider from 'react-input-slider';
import './styles/Slider.css';

const sliderStyles = {
  track: {
    backgroundColor: '#d0d0d0',
    background: 'linear-gradient(to right, #77d970, #adbe32, #d79c0d, #f5722f)'
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

const SliderOpen = ({ value, setValue }) => {
    const handleChange = (newValue) => {
        setValue(newValue.x);
    };


    return (
        <div className="style-slider-offset">
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
            <button className="style-slider-header">
                <h3>{modes[value]}</h3>
            </button>
        </div>
    );
};

export default SliderOpen;
