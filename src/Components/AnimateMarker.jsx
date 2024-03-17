import { useRef, useEffect, useState } from "react"
import { Popup,Marker } from "react-leaflet";
import { Icon } from "leaflet";
import marker from "../Icons/drone.png"
import { useDispatch } from "react-redux";
import { setIsAnimate, setProgress } from "../app/dronesSlice";

export default function AnimateMarker({ locations, droneId, startIdx, isAnimate }){
    const dispatch = useDispatch()
    const previousLocation = useRef({lat: 0, lng: 0})
    const timer = useRef(null)
    const idx = useRef(0)
    const [currentLocation, setCurrentLocation] = useState({lat: 0, lng: 0})

    const myIcon = new Icon({
        iconUrl: marker,
        iconSize: [32,52],
       })


    useEffect(() => {
        if(locations?.length){
            setCurrentLocation({lat: locations[0][0], lng: locations[0][1]})
            previousLocation.current = {lat: locations[0][0], lng: locations[0][1]}
        } 
    }, [locations])

    useEffect(() => {
        animateMarker()
    }, [isAnimate])

    useEffect(() => {
        idx.current = startIdx
        previousLocation.current.lat = locations.length ? locations[idx.current][0]: 0
        previousLocation.current.lng = locations.length ? locations[idx.current][1]: 0
        animateMarker()
    }, [startIdx] )

    async function animateMarker(){
        try {
            clearInterval(timer.current)
            if(!isAnimate || locations.length == 0) return;
            const percentage = 1/locations.length
            timer.current = setInterval(async () => {
                if(idx.current === locations.length){
                    idx.current = 0
                    previousLocation.current.lat = locations[0][0]
                    previousLocation.current.lng = locations[0][1]
                    clearInterval(timer.current)
                    dispatch(setIsAnimate({droneId, animate: false}))
                    dispatch(setProgress({value: 0, droneId}))
                    return
                }
                const location = locations[idx.current]
                let nDelta = 50
                let delay = 10
                let i = 0
                let deltaLat = (location[0] - previousLocation.current.lat)/nDelta
                let deltaLng = (location[1] - previousLocation.current.lng)/nDelta
                while(i < nDelta){
                  previousLocation.current.lat += deltaLat
                  previousLocation.current.lng += deltaLng
                  setCurrentLocation({...previousLocation.current})
                  i++
                  await new Promise(resolve => setTimeout(resolve, delay))
                }
                setCurrentLocation({...previousLocation.current})
                idx.current++
                dispatch(setProgress({value: percentage * idx.current*100, droneId}))
            }, 600)
        } catch (error) {
          console.error(error)
        }
      }

    return (
        <div>
            <p>{currentLocation.lat}</p>
            {currentLocation.lat && <Marker position={[currentLocation.lat, currentLocation.lng]} icon={myIcon}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>}
        </div>
    )
}