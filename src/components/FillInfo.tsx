import React, { FC } from 'react';
import './FillInfo.scss';
interface FillInfoProps {
  children: React.ReactNode
}

const FillInfo: FC<FillInfoProps> = ({children}) => {
  return (     
    <p className="paragraph">{children}</p>
  );
};


export default FillInfo;