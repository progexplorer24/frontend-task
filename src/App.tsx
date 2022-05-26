import React from 'react';
import FormColors from "./components/FormColors"
import Hero from "./components/Hero"
import './App.scss';

function App() {
  return (
    <div className="App">
      <div className="Container">

      <Hero title="Color Saver" lead="CREATE COLOR OF YOUR DREAMS" />
      <FormColors/>
      </div>
    </div>
  );
}

export default App;
