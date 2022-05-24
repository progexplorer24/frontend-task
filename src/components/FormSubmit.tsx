import React, { FC } from 'react';
import './FormSubmit.scss';
interface FormSubmitProps {
  text: string
}

const FormSubmit: FC<FormSubmitProps> = ({text}) => {
  return (
    <button type="submit" className="FormBtn">
    <span className="svg-wrapper">
    <svg xmlns="http://www.w3.org/2000/svg" className="save" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
</svg>
    </span>
    {text}
  </button>
  );
};



export default FormSubmit;