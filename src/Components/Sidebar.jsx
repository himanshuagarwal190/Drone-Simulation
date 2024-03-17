import { useDispatch, useSelector } from "react-redux";
import { addDrone, setIsAnimate, setProgress, setStartIdx } from "../app/dronesSlice";
import { useRef, useState } from "react"
import AddBulkPoints from "./AddBulkPoints";

export default function Sidebar( { setSelectedDrone, selectedDrone }) {
    const dronesData = useSelector(state => state.drones)
    const dispatch = useDispatch()
    const progressBar = useRef()
    const [showModal, setShowModal] = useState(false)

    function clickProgressBar(e, index) {
        const percent = (e.clientX - progressBar.current.offsetLeft)/(progressBar.current.offsetWidth - progressBar.current.offsetLeft)
        const idx = Math.min(Math.floor(percent * dronesData[index].locations.length), dronesData[index].locations.length - 1)
        dispatch(setProgress({value: percent * 100, droneId: dronesData[index].id}))
        dispatch(setStartIdx({index: idx, droneId: dronesData[index].id}))
    }

    return (
        <div className="sidebar">
            {showModal && <AddBulkPoints closeModal={setShowModal} setShowModal={setShowModal} selectedDrone={selectedDrone} setSelectedDrone={setSelectedDrone} />}
            <div className="addDrone">
                <button onClick={() => dispatch(addDrone())}>+ Add Drone</button>
            </div>
            {dronesData && dronesData.map((data, idx) => {
                return <div className="dronesProperties" key={idx}>
                    <div className="droneHeader">
                        <div className="droneInfo">
                            <p style={{backgroundColor: data.color}} className="droneColor"></p>
                            <p className="droneName">Drone {data.id}</p>
                        </div>
                        <button disabled={selectedDrone != -1 && selectedDrone != data.id} onClick={() => setSelectedDrone(val => val === -1 ? data.id : -1)}>{selectedDrone == -1 || selectedDrone != data.id ? "Add Points" : "Save Points"}</button>
                        <button onClick={() => {setShowModal(true); setSelectedDrone(data.id)}}>Bulk Add points </button>
                    </div>
                    <div className="progressBar" ref={progressBar}  onClick={(e) => clickProgressBar(e, idx)}>
                        <div style={{width: `${data.progress}%`}} className="progressBarRed"></div>
                    </div>
                    <div className="dronesButtons">
                        <button onClick={() => dispatch(setIsAnimate({droneId: data.id, animate: !data.animate}))}>{data?.animate ? "Pause " : "Play "} Simulation</button>
                    </div>
                </div>
            })}
        </div>
    );
}