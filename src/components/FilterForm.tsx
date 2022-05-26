import React, { useState, FC } from 'react';
import './FilterForm.scss';
import {sortColorsArray, rgbToHsl} from "../utils/helpers"
import type {ColorParsed} from "../utils/predefined-colors"
import ColorList from "./ColorList"
interface FilterFormProps {
  filteredColors: ColorParsed[]
  colors: ColorParsed[]
  setColors: React.Dispatch<React.SetStateAction<ColorParsed[]>>
  setFilteredColors: React.Dispatch<React.SetStateAction<ColorParsed[]>>
}


const FilterForm: FC<FilterFormProps> = ({setFilteredColors, setColors, filteredColors, colors}) => {
  const [isRedFiltered, setIsRedFiltered] = useState(false);
  const [isGreenFiltered, setIsGreenFiltered] = useState(false);
  const [isBlueFiltered, setIsBlueFiltered] = useState(false);
  const [isSaturationFiltered, setIsSaturationFiltered] = useState(false);


    // Should every checkbox have different event handler
    const handleInputCheckbox = (event: React.FormEvent<HTMLInputElement>) => {
      const {name} = event.currentTarget
      if (name === "red") {
        const shouldFilterRed = !isRedFiltered ? colors.filter(el => el.color[0] > 127) : colors;
        const shouldFilterGreen = isGreenFiltered ? shouldFilterRed.filter(el => el.color[1] > 127) : shouldFilterRed;
        const shouldFilterBlue = isBlueFiltered ? shouldFilterGreen.filter(el => el.color[2] > 127) : shouldFilterGreen;
        const shouldFilterSaturation = isSaturationFiltered ? shouldFilterBlue.filter(el => rgbToHsl(el.color[0], el.color[1], el.color[2])[1] > 50) : shouldFilterBlue;
        setFilteredColors(sortColorsArray(shouldFilterSaturation))
        setIsRedFiltered(!isRedFiltered)
  
      } else if (name === "green") {
        const shouldFilterRed = isRedFiltered ? colors.filter(el => el.color[0] > 127) : colors;
        const shouldFilterGreen = !isGreenFiltered ? shouldFilterRed.filter(el => el.color[1] > 127) : shouldFilterRed;
        const shouldFilterBlue = isBlueFiltered ? shouldFilterGreen.filter(el => el.color[2] > 127) : shouldFilterGreen;
        const shouldFilterSaturation = isSaturationFiltered ? shouldFilterBlue.filter(el => rgbToHsl(el.color[0], el.color[1], el.color[2])[1] > 50) : shouldFilterBlue;
        setFilteredColors(sortColorsArray(shouldFilterSaturation))
        setIsGreenFiltered(!isGreenFiltered)
  
  
      } else if (name === "blue") {
        const shouldFilterRed = isRedFiltered ? colors.filter(el => el.color[0] > 127) : colors;
        const shouldFilterGreen = isGreenFiltered ? shouldFilterRed.filter(el => el.color[1] > 127) : shouldFilterRed;
        const shouldFilterBlue = !isBlueFiltered ? shouldFilterGreen.filter(el => el.color[2] > 127) : shouldFilterGreen;
        const shouldFilterSaturation = isSaturationFiltered ? shouldFilterBlue.filter(el => rgbToHsl(el.color[0], el.color[1], el.color[2])[1] > 50) : shouldFilterBlue;
        setFilteredColors(sortColorsArray(shouldFilterSaturation))
        setIsBlueFiltered(!isBlueFiltered)
      } else if (name === "saturation") {
        const shouldFilterRed = isRedFiltered ? colors.filter(el => el.color[0] > 127) : colors;
        const shouldFilterGreen = isGreenFiltered ? shouldFilterRed.filter(el => el.color[1] > 127) : shouldFilterRed;
        const shouldFilterBlue = isBlueFiltered ? shouldFilterGreen.filter(el => el.color[2] > 127) : shouldFilterGreen;
        const shouldFilterSaturation = !isSaturationFiltered ? shouldFilterBlue.filter(el => rgbToHsl(el.color[0], el.color[1], el.color[2])[1] > 50) : shouldFilterBlue;
        setFilteredColors(sortColorsArray(shouldFilterSaturation))
        setIsSaturationFiltered(!isSaturationFiltered)
      } else {
        console.log("This statement should never run!")
      }
  
  
    }
  
  return (
    <> 
    <form className="form">
    <p className="paragraph">Choose filtering conditions</p>
    <label className="checkbox-label" >
      Pick Red Values higher than 127:
    <input type="checkbox" className="form-checkbox" name="red" checked={isRedFiltered} onChange={handleInputCheckbox} />
    </label>
    <label className="checkbox-label">
      Pick Green Values higher than 127:
    <input type="checkbox" className="form-checkbox" name="green" checked={isGreenFiltered}  onChange={handleInputCheckbox} />
    </label>
    <label className="checkbox-label">
      Pick Blue Values higher than 127:
    <input type="checkbox" className="form-checkbox" name="blue" checked={isBlueFiltered}  onChange={handleInputCheckbox} />
    </label>
    <label className="checkbox-label">
      Pick Saturation Values over 50%:
    <input type="checkbox" className="form-checkbox" name="saturation" checked={isSaturationFiltered}  onChange={handleInputCheckbox} />
    </label>
  </form>
  <ColorList colorList={filteredColors} setColors={setColors} setFilteredColors={setFilteredColors} />
  </>    
  );
};


export default FilterForm;