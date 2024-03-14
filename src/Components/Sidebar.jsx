export default function Sidebar( { dronesData, simulate, setDronesData, setSelectedDrone, selectedDrone }) {
    return (
        <div className="sidebar">
            <button onClick={() => setDronesData(data => [...data, {id: data.length + 1, locations: [], currentLat: 0, currentLng: 0}])}>Add Drone</button>
            {dronesData && dronesData.map((data, idx) => {
                return <div className="dronesProperties" key={idx}>
                    <p>Drone {data.id}</p>
                    <div className="dronesButtons">
                        <button disabled={selectedDrone != -1 && selectedDrone != data.id} onClick={() => setSelectedDrone(val => val === -1 ? data.id : -1)}>{selectedDrone == -1 || selectedDrone != data.id ? "Add Points" : "Save Points"}</button>
                        <button onClick={() => simulate(data.id)}>Play Simulation</button>
                    </div>
                </div>
            })}
        </div>
    );
}