import React, { useRef } from "react";
import { MapContainer, TileLayer, Polyline, useMapEvents, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import marker from "../Icons/drone.png"

const defaultCenter = [18.518658129265802, 73.85624032312973];
const defaultZoom = 18;

function MapView({ setDronesData, dronesData, selectedDrone }) {
	const mapRef = useRef();
  const myIcon = new Icon({
    iconUrl: marker,
    iconSize: [32,52],
   })

  const LocationFinderDummy = () => {
    useMapEvents({
        click(e) {
            const lat = e.latlng.lat
            const lng = e.latlng.lng
            setDronesData(data => {
              data = JSON.parse(JSON.stringify(data))
              console.log('trigger')
              
              const idx = data.findIndex(d => d.id === selectedDrone)
              if (idx !== -1) {
                data[idx].locations.push([lat, lng])
              }
              return data
            })
        },
    });
    return null;
};


	return (
		<div className="mapContiner">
			<MapContainer ref={mapRef} center={defaultCenter} zoom={defaultZoom} onClick={(e) => console.log(e)}>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				/>
        {dronesData && dronesData.map((data, idx) => {
          return <div key={idx}>
          <Polyline
					positions={[...data.locations]}
					color="red"
				/>
        {data.currentLat && <Marker position={[data.currentLat, data.currentLng]} icon={myIcon}>
            <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
          </Marker>}
        </div> 
        })}
				
        <LocationFinderDummy />
			</MapContainer>
		</div>
	);
}

export default MapView;
