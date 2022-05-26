import React, { FC, useState } from 'react';
import FormSubmit from "./FormSubmit"
import FilterForm from "./FilterForm"

import './FormColors.scss';
import { hexToRgb, sortColorsArray } from '../utils/helpers';
import {useLocalStorage} from "../hooks/useLocalStorage"
import FillInfo from './FillInfo';
interface FormColorsProps {}


const FormColors: FC<FormColorsProps> = () => {
  const [colors, setColors] = useLocalStorage('colors', localStorage.getItem('colors') || '')
  const [input, setInput] = useState('')
  const [filteredColors, setFilteredColors] = useState(colors)

  React.useEffect(() => {

  }, [colors])

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formElements = form.elements as typeof form.elements & {
      rgb: {value: string}
    }

    const newColor = {
      color: hexToRgb(formElements.rgb.value),
      isRemovable: true
    }

    setColors(prev => sortColorsArray([newColor, ...prev]))
    setFilteredColors(prev => sortColorsArray([newColor, ...prev]))
  }



  const handleHexInput = (event: React.FormEvent<HTMLInputElement>) => {
    const input = event.target as typeof event.target & {
      id: string
      value: string
    }
    if((input.value !== "#" && input.value.length===1)) {
      event.preventDefault();
    } else if (input.value.match(/[a-fA-F0-9]$/g) === null && input.value.length > 1) {
      event.preventDefault();
    } else {
      setInput(input.value)
    }

  };




  return (
    <>
    <form className="form" onSubmit={handleSubmit}>
      <FillInfo>Please fill in the in RGB format. Start with '#' character. <br /> Then provide six characters from 0-9+A-F (will accept both caps)</FillInfo>
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="rgb" className="sr-only">HEX RGB Color</label>
          <input id="rgb" name="rgb" type="text" value={input} onInput={handleHexInput} required={true} className="input input-start" placeholder="Hex Value" pattern="^#+([a-fA-F0-9]{6})$" maxLength={7}  />
        </div>
      <div>
      <FormSubmit text="Save Color" />
      </div>
      </div>
    </form>
    <FilterForm setColors={setColors} colors={colors} filteredColors={filteredColors} setFilteredColors={setFilteredColors} />
    </>
  );
};

export default FormColors;