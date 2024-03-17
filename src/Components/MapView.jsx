import React, { useRef } from "react";
import { MapContainer, TileLayer, Polyline, useMapEvents, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import AnimateMarker from "./AnimateMarker"
import { useDispatch, useSelector } from "react-redux";
import { addLocations } from "../app/dronesSlice";

const defaultCenter = [18.520835706585654, 73.85855197906496];
const defaultZoom = 18;

function MapView({ selectedDrone }) {
	const mapRef = useRef();
  const dronesData = useSelector((state) => state.drones)
  const dispatch = useDispatch()

  const LocationFinder = () => {
    useMapEvents({
        click(e) {
            const lat = e.latlng.lat
            const lng = e.latlng.lng
            dispatch(addLocations({lat, lng, droneId: selectedDrone}))
        },
    });
    return null;
};


	return (
		<div className="mapContiner">
			<MapContainer ref={mapRef} center={defaultCenter} zoom={defaultZoom}>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				/>
        {dronesData && dronesData.map((data, idx) => {
          return <div key={idx}>
          <Polyline
					positions={[...data.locations]}
					color={data.color}
				/>
        <AnimateMarker locations={data.locations} droneId={data.id} isAnimate={data.animate} startIdx={data.startIdx} />
        </div> 
        })}
				
        <LocationFinder />
			</MapContainer>
		</div>
	);
}

export default MapView;
