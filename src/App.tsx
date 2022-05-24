import React from 'react';
import FormColors from "./components/FormColors"
import Hero from "./components/Hero"
import './App.scss';

function App() {
  return (
    <div className="App">
      <div className="Container">

      <Hero />
      <FormColors/>
      </div>
    </div>
  );
}

export default App;
