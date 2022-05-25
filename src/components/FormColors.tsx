import React, { FC, useEffect, useState } from 'react';
import FormSubmit from "./FormSubmit"
import './FormColors.scss';
interface FormColorsProps {
  children?: React.ReactNode
}

type ReturnType<T> = [
  T,
  React.Dispatch<React.SetStateAction<T>>
]
// INFO: This goes to separate file
const hexToRgb = (hex:string): number[] => {
  const replaceResult = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
             ,(m, r, g, b) => '#' + r + r + g + g + b + b)
  const substring = replaceResult.substring(1).match(/.{2}/g)
  const result = substring === null ? [] : substring.map((x: string) => parseInt(x, 16))
 return result
}

const rgbToHex = (r: number, g: number, b: number) => '#' + [r, g, b].map(x => {
  const hex = x.toString(16)
  return hex.length === 1 ? '0' + hex : hex
}).join('')

const sortColorsArray = (array: ColorParsed[]) => array.sort(function(a, b) {
  const colorA = a.color
  const colorB = b.color
  if (colorA[0] === colorB[0]) {
    if (colorA[1] === colorB[1]) {
      return colorB[1] - colorA[1];
    } else {
      return colorB[2] - colorA[2]
    }
  } else {
    return colorB[0] - colorA[0];
  }
});
type ColorObject = {
  color: string,
  isRemovable: boolean
}

type ColorParsed = {
  color: number[],
  isRemovable: boolean
}

const predefinedColorList: ColorObject[] = [{color: "#F87171", isRemovable: false}, {color: "#FB923C", isRemovable: false},  {color: "#F59E0B", isRemovable: false}, {color: "#14B8A6", isRemovable: false}]
const parsedColorList: ColorParsed[] = predefinedColorList.map(el => {
  return {
    color: hexToRgb(el.color),
    isRemovable: el.isRemovable
  }
})

const useLocalStorage = (key: string, initialValue: string): ReturnType<ColorParsed[]> => {
  const initialArray = initialValue === '' ? parsedColorList : initialValue
  const [state, setState] = useState<ColorParsed[]>(() => {
    try {
      const value = localStorage.getItem(key)
      return value ? JSON.parse(value) : initialArray
    } catch (error) {
      return initialArray;
    }
  });

  useEffect(() => {
    if(state) {
      try {
        localStorage.setItem(key, JSON.stringify(state))
      } catch (error) {
        console.log(error)
      }
    }
  }, [state, key])

  return [state, setState]
}





const FormColors: FC<FormColorsProps> = ({ children }) => {
  const [state, setState] = useLocalStorage('colors', localStorage.getItem('colors') || '')

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

    setState(prev => sortColorsArray([newColor, ...prev]))
  }

  // const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
  //   // console.log(event.currentTarget.value)
  // }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const input = event.target as typeof event.target & {
      id: string
      textLength: number
    }
    if((event.key.match(/#/g) === null && input.textLength===0)) {
      event.preventDefault();
    } else if (event.key.match(/[a-fA-F0-9]$/g) === null && input.textLength!==0) {
      event.preventDefault();
    } else {}

  };

  const renderColorList = (colorList: ColorParsed[]) => colorList.map((element, i) => 
  <div key={i} className="color-item">
    <div className="rect" style={{backgroundColor: rgbToHex(element.color[0], element.color[1], element.color[2])}} />
    <p className="hex-name">Hex Value: <span className="hex-value">{rgbToHex(element.color[0], element.color[1], element.color[2]).toUpperCase()}</span></p>
  </div>) 
  return (
    <>
    <form className="form" onSubmit={handleSubmit}>
      <p className="paragraph">Please fill in the in RGB format. Start with '#' character. <br /> Then provide six characters from 0-9+A-F (will accept both caps)</p>
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="rgb" className="sr-only">HEX RGB Color</label>
          <input id="rgb" name="rgb" type="text"  required={true} className="input input-start" placeholder="Hex Value" pattern="^#+([a-fA-F0-9]{6})$" maxLength={7}  onKeyDown={handleKeyDown} />
        </div>
      <div>
      <FormSubmit text="Save Color" />
      </div>
      </div>
    </form>
    {renderColorList(state)}
    </>
  );
};

export default FormColors;