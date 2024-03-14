import React, { useRef, useState } from 'react';
import './App.css';
import Sidebar from './Components/Sidebar';
import MapView from './Components/MapView';

const defaultCenter = [18.522645382811923, 73.85781342121008];
const defaultZoom = 8;

function App() {
  const mapRef = useRef();
  const [dronesData, setDronesData] = useState([{
    id: 1,
    locations: [],
    currentLat: 0,
    currentLng: 0
  }]);
  const [selectedDrone, setSelectedDrone] = useState(-1)

  function simulate(droneId){
    let previousLat, previousLng
    let locationIndex = 0
    let interval = setInterval(async () => {
      let allDrones = JSON.parse(JSON.stringify(dronesData))
      allDrones.forEach(element => {
        console.log(element, droneId)
      });
      const idx = allDrones.map(e => e.id).indexOf(droneId)
      if (locationIndex >= dronesData[idx].locations.length){
        clearInterval(interval)
        return
      }
      if(!previousLat && !previousLng){
        previousLat = allDrones[idx].locations[locationIndex][0]
        previousLng = allDrones[idx].locations[locationIndex][1]
      } else {
        if (previousLat == allDrones[idx].locations[locationIndex][0] && allDrones[idx].locations[locationIndex][1]){
          return
        }
        let nDelta = 100
        let delay = 10
        let i = 0
        let deltaLat = (allDrones[idx].locations[locationIndex][0] - previousLat)/nDelta
        let deltaLng = (allDrones[idx].locations[locationIndex][1] - previousLng)/nDelta
        while(i < nDelta){
          allDrones = JSON.parse(JSON.stringify(dronesData))
          previousLat += deltaLat
          previousLng += deltaLng
          i++
          allDrones[idx].currentLat = previousLat
          allDrones[idx].currentLng = previousLng
          setDronesData(allDrones)
          await new Promise(resolve => setTimeout(resolve, delay))
        }
      }
      locationIndex ++
    }, 500)
  }

  return (
      <div className="container">
        <Sidebar dronesData={dronesData} simulate={simulate} setDronesData={setDronesData} selectedDrone={selectedDrone} setSelectedDrone={setSelectedDrone} />
        <MapView dronesData={dronesData} setDronesData={setDronesData} selectedDrone={selectedDrone} setSelectedDrone={setSelectedDrone} />
      </div>
  );
}

export default App;