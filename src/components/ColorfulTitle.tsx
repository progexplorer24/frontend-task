import React, { FC } from 'react';
import './ColorfulTitle.scss';
interface ColorfulTitleProps {
  children: string
}

const FormSubmit: FC<ColorfulTitleProps> = ({children}) => {
  return (     
    <h1 className="Title">
      <span className="colorful-wrapper" data-content="Color Saver">
        <span className="colorful-content">{children}</span>
      </span>
    </h1>
  );
};


export default FormSubmit;