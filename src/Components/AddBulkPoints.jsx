import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as XLSX from "xlsx";
import { addBulkLocations } from '../app/dronesSlice';


export default function AddBulkPoints( { setShowModal, closeModal, selectedDrone, setSelectedDrone }){
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    function fileUpload(event){
        const fileReader = new FileReader();
        fileReader.readAsBinaryString(event.target.files[0]);
        fileReader.onload = e => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(worksheet);
            addPoints(json)
        };
    }

    function addPoints(array){
        const ans = []
        for(let item of array){
            if(isNaN(item.latitude) || isNaN(item.longitude)){
                setError("Invalid latitude / longitude")
                return
            }
            ans.push([item.latitude, item.longitude])
        }
        dispatch(addBulkLocations({locations: ans, droneId: selectedDrone}))
        closeModal(false)
        setSelectedDrone(-1)
    }

    return (
        <div className="modal">
            <div className="modalHeader">
                <div className="modalX" onClick={() => setShowModal(prev => !prev)}>X</div>
            </div>
            <div className="modalBody">
                <a href="/Add Bulk Points Template.xlsx" download> Download Add Bulk Points Template</a>
                <input type="file" onChange={fileUpload}/>
                {error && <p className='error'>{error}</p>}
            </div>
        </div>
    )
}