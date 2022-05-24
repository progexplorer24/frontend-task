import React, { FC, useEffect, useState } from 'react';
import FormSubmit from "./FormSubmit"
import './FormColors.scss';
interface FormColorsProps {
  children?: React.ReactNode
}

type ReturnType<T> = [
  T | undefined,
  React.Dispatch<React.SetStateAction<T | undefined>>
]

const useLocalStorage = <T,>(key: string, initialValue?: T): ReturnType<T> => {
  const [state, setState] = useState<T | undefined>(() => {
    if(!initialValue) return [];
    try {
      const value = localStorage.getItem(key)
      return value ? JSON.parse(value) : initialValue
    } catch (error) {
      return initialValue;
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

  const [state, setState] = useLocalStorage('color', 'string')

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formElements = form.elements as typeof form.elements & {
      rgb: {value: string}
    }
    console.log(formElements.rgb.value)
    setState(formElements.rgb.value)
  }

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    // console.log(event.currentTarget.value)
  }

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
  console.log(state)
  return (
    <form className="form" onSubmit={handleSubmit}>
      <p className="paragraph">Please fill in the in RGB format. Start with '#' character. <br /> Then provide six characters from 0-9+A-F (will accept both caps)</p>
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="rgb" className="sr-only">Red Color</label>
          <input id="rgb" name="rgb" type="text"  required={true} className="input input-start" placeholder="Red Color in Hex" pattern="^#+([a-fA-F0-9]{6})$" maxLength={7} onChange={handleChange}  onKeyDown={handleKeyDown} />
        </div>
      <div>
      <FormSubmit text="Save Color" />
      </div>
      </div>
    </form>
  );
};

export default FormColors;