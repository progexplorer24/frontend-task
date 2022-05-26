import React, { FC } from 'react';
import { ColorParsed } from '../utils/predefined-colors';
import { rgbToHex } from '../utils/helpers';
import './ColorList.scss';
interface ColorListProps {
  colorList: ColorParsed[],
  setColors: React.Dispatch<React.SetStateAction<ColorParsed[]>>
  setFilteredColors: React.Dispatch<React.SetStateAction<ColorParsed[]>>
}

const renderColorList = (colorList: ColorParsed[], setColors: React.Dispatch<React.SetStateAction<ColorParsed[]>>, setFilteredColors: React.Dispatch<React.SetStateAction<ColorParsed[]>>) => colorList.map((element, i) => {
  const shouldAddIcon = element.isRemovable 
  ? 
  <button className="button-icon" onClick={() => {
    setColors(prev => prev.filter(el => el.color !== element.color))
    setFilteredColors(prev => prev.filter(el => el.color !== element.color))
  }}>
        <svg xmlns="http://www.w3.org/2000/svg" className="action-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
  </button>
: 
null

  return (  <div key={i} className="color-item">
  <div className="rect" style={{backgroundColor: rgbToHex(element.color[0], element.color[1], element.color[2])}} />
  <div className="flex-wrap">
    <div>
      <p className="hex-name">Hex Value: 
        <span className="hex-value">{rgbToHex(element.color[0], element.color[1], element.color[2]).toUpperCase()}</span>
      </p>
    </div>
    <div>
      {shouldAddIcon}
    </div>
  </div>
</div>)
}) 

const ColorList: FC<ColorListProps> = ({colorList, setColors, setFilteredColors}) => {
  return (     
    <>{renderColorList(colorList, setColors, setFilteredColors)}</>
  );
};


export default ColorList;