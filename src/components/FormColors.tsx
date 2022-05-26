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

const rgbToHsl = (r: number, g: number, b: number) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
};

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

const predefinedColorList: ColorObject[] = [
{color: "#F87171", isRemovable: false}, 
{color: "#FB923C", isRemovable: false},  
{color: "#F59E0B", isRemovable: false}, 
{color: "#14B8A6", isRemovable: false}, 
{color: "#0369A1", isRemovable: false},
{color: "#1D4ED8", isRemovable: false},
{color: "#312E81", isRemovable: false},
{color: "#F5F3FF", isRemovable: false},
{color: "#C084FC", isRemovable: false},
{color: "#A21CAF", isRemovable: false},
{color: "#F0ABFC", isRemovable: false},
{color: "#DB2777", isRemovable: false},
{color: "#F43F5E", isRemovable: false},
{color: "#FDE68A", isRemovable: false},
]

const parsedColorList: ColorParsed[] = predefinedColorList.map(el => {
  return {
    color: hexToRgb(el.color),
    isRemovable: el.isRemovable
  }
})
const sortedParsedColors = sortColorsArray(parsedColorList)

const useLocalStorage = (key: string, initialValue: string): ReturnType<ColorParsed[]> => {
  const initialArray = initialValue === '' ? sortedParsedColors : initialValue
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

type RemovedColors = {
  red: ColorParsed[],
  green: ColorParsed[],
  blue: ColorParsed[],
  saturation: ColorParsed[]
}



const FormColors: FC<FormColorsProps> = ({ children }) => {
  const [colors, setColors] = useLocalStorage('colors', localStorage.getItem('colors') || '')
  const [filteredColors, setFilteredColors] = useState(colors)
  const [removedColors, setRemovedColors] = useState<RemovedColors>({
    red: [],
    green: [],
    blue: [],
    saturation: []
  }) 

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
  }

  // Should every checkbox have different event handler
  const handleRed = (event: React.FormEvent<HTMLInputElement>) => {
    if(event.currentTarget.checked) {
      setRemovedColors(prev => {
        return {...prev, red: filteredColors.filter((el: ColorParsed) => el.color[0] <= 127)}
      })
      setFilteredColors(prev => prev.filter(el => el.color[0] > 127))
    } else {
      setFilteredColors(prev => sortColorsArray([...removedColors.red, ...prev]))
    }
  }

  const handleGreen = (event: React.FormEvent<HTMLInputElement>) => {
    if(event.currentTarget.checked) {
      setRemovedColors(prev => {
        return {...prev, green: filteredColors.filter((el: ColorParsed) => el.color[1] <= 127)}
      })
      setFilteredColors(prev => prev.filter(el => el.color[1] > 127))
    } else {
      setFilteredColors(prev => sortColorsArray([...removedColors.green, ...prev]))
    }
  }

  const handleBlue = (event: React.FormEvent<HTMLInputElement>) => {
    if(event.currentTarget.checked) {
      setRemovedColors(prev => {
        return {...prev, blue: filteredColors.filter((el: ColorParsed) => el.color[2] <= 127)}
      })
      setFilteredColors(prev => prev.filter(el => el.color[2] > 127))
    } else {
      setFilteredColors(prev => sortColorsArray([...removedColors.blue, ...prev]))
    }
  }

  const handleSaturation = (event: React.FormEvent<HTMLInputElement>) => {
    if(event.currentTarget.checked) {
      setRemovedColors(prev => {
        return {...prev, saturation: filteredColors.filter((el: ColorParsed) => rgbToHsl(el.color[0], el.color[1], el.color[2])[1] <= 50)}
      })
      setFilteredColors(prev => prev.filter(el => rgbToHsl(el.color[0], el.color[1], el.color[2])[1] > 50))
    } else {
      setFilteredColors(prev => sortColorsArray([...removedColors.saturation, ...prev]))
    }
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

  const renderColorList = (colorList: ColorParsed[]) => colorList.map((element, i) => {
    const shouldAddIcon = element.isRemovable 
    ? 
    <button className="button-icon" onClick={() => setColors(prev => prev.filter(el => el.color !== element.color))}>
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

  const [input, setInput] = useState('')

  return (
    <>
    <form className="form" onSubmit={handleSubmit}>
      <p className="paragraph">Please fill in the in RGB format. Start with '#' character. <br /> Then provide six characters from 0-9+A-F (will accept both caps)</p>
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
    <form className="form">
      <p className="paragraph">Choose filtering conditions</p>
      <label className="checkbox-label" >
        Pick Red Values higher than 127:
      <input type="checkbox" className="form-checkbox" name="red" onChange={handleRed} />
      </label>
      <label className="checkbox-label">
        Pick Green Values higher than 127:
      <input type="checkbox" className="form-checkbox" name="green" onChange={handleGreen} />
      </label>
      <label className="checkbox-label">
        Pick Blue Values higher than 127:
      <input type="checkbox" className="form-checkbox" name="blue" onChange={handleBlue} />
      </label>
      <label className="checkbox-label">
        Pick Saturation Values over 50%:
      <input type="checkbox" className="form-checkbox" name="saturation" onChange={handleSaturation} />
      </label>
    </form>
    {renderColorList(filteredColors)}
    </>
  );
};

export default FormColors;