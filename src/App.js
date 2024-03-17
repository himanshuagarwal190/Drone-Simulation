import React, { useRef, useState } from 'react';
import './App.css';
import Sidebar from './Components/Sidebar';
import MapView from './Components/MapView';

function App() {
  const [selectedDrone, setSelectedDrone] = useState(-1)

  return (
      <div className="container">
        <Sidebar selectedDrone={selectedDrone} setSelectedDrone={setSelectedDrone} />
        <MapView selectedDrone={selectedDrone} />
      </div>
  );
}

export default App;