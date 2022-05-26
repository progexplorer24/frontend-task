import React from 'react';
import ColorfulTitle from "./ColorfulTitle"
import Lead from "./Lead"
import './Hero.scss';
interface Props {
  title: string,
  lead: string
}

type MyState = {};

export default class Hero extends React.Component<Props, MyState> {
  constructor(props: Props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
    <header>
     
      <svg xmlns="http://www.w3.org/2000/svg" className="svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
      </svg>

     
    <ColorfulTitle>{this.props.title}</ColorfulTitle>
    <Lead>{this.props.lead}</Lead>
    </header>
    );
  }
}