import React, { useState, FC } from 'react';
import './FilterForm.scss';
import {sortColorsArray, rgbToHsl} from "../utils/helpers"
import type {ColorParsed} from "../utils/predefined-colors"
import ColorList from "./ColorList"
interface FilterFormProps {
  filteredColors: ColorParsed[]
  setColors: React.Dispatch<React.SetStateAction<ColorParsed[]>>
  setFilteredColors: React.Dispatch<React.SetStateAction<ColorParsed[]>>
}


type RemovedColors = {
  red: ColorParsed[],
  green: ColorParsed[],
  blue: ColorParsed[],
  saturation: ColorParsed[]
}

const FilterForm: FC<FilterFormProps> = ({setFilteredColors, setColors, filteredColors}) => {
  const [removedColors, setRemovedColors] = useState<RemovedColors>({
    red: [],
    green: [],
    blue: [],
    saturation: []
  }) 

    // Should every checkbox have different event handler
    const handleInputCheckbox = (event: React.FormEvent<HTMLInputElement>) => {
      console.log(event.currentTarget)
      const {name} = event.currentTarget
      if (name === "red") {
        if(event.currentTarget.checked) {
          setRemovedColors(prev => {
            return {...prev, red: filteredColors.filter((el: ColorParsed) => el.color[0] <= 127)}
          })
          setFilteredColors(prev => prev.filter(el => el.color[0] > 127))
        } else {
          setFilteredColors(prev => sortColorsArray([...removedColors.red, ...prev]))
        }
  
      } else if (name === "green") {
        if(event.currentTarget.checked) {
          setRemovedColors(prev => {
            return {...prev, green: filteredColors.filter((el: ColorParsed) => el.color[1] <= 127)}
          })
          setFilteredColors(prev => prev.filter(el => el.color[1] > 127))
        } else {
          setFilteredColors(prev => sortColorsArray([...removedColors.green, ...prev]))
        }
  
  
      } else if (name === "blue") {
        if(event.currentTarget.checked) {
          setRemovedColors(prev => {
            return {...prev, blue: filteredColors.filter((el: ColorParsed) => el.color[2] <= 127)}
          })
          setFilteredColors(prev => prev.filter(el => el.color[2] > 127))
        } else {
          setFilteredColors(prev => sortColorsArray([...removedColors.blue, ...prev]))
        }
      } else if (name === "saturation") {
        if(event.currentTarget.checked) {
          setRemovedColors(prev => {
            return {...prev, saturation: filteredColors.filter((el: ColorParsed) => rgbToHsl(el.color[0], el.color[1], el.color[2])[1] <= 50)}
          })
          setFilteredColors(prev => prev.filter(el => rgbToHsl(el.color[0], el.color[1], el.color[2])[1] > 50))
        } else {
          setFilteredColors(prev => sortColorsArray([...removedColors.saturation, ...prev]))
        }
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
    <input type="checkbox" className="form-checkbox" name="red" onChange={handleInputCheckbox} />
    </label>
    <label className="checkbox-label">
      Pick Green Values higher than 127:
    <input type="checkbox" className="form-checkbox" name="green" onChange={handleInputCheckbox} />
    </label>
    <label className="checkbox-label">
      Pick Blue Values higher than 127:
    <input type="checkbox" className="form-checkbox" name="blue" onChange={handleInputCheckbox} />
    </label>
    <label className="checkbox-label">
      Pick Saturation Values over 50%:
    <input type="checkbox" className="form-checkbox" name="saturation" onChange={handleInputCheckbox} />
    </label>
  </form>
  <ColorList colorList={filteredColors} setColors={setColors} setFilteredColors={setFilteredColors} />
  </>    
  );
};


export default FilterForm;