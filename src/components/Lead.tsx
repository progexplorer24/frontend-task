import React, { FC } from 'react';
import './Lead.scss';
interface LeadProps {
  children: string
}

const FormSubmit: FC<LeadProps> = ({children}) => {
  return (     
    <p className="lead">{children}</p>
  );
};


export default FormSubmit;