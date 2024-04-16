import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DeviceCard from "./DeviceCard"
import '../assets/adddevice.css'

export default function AddDevice(){

    const [deviceName, setDeviceName] = useState("");
    const [devices, setDevices] = useState([]);
    const [message, setMessage] = useState('');

    const handleDeviceChange = (event)=>setDeviceName(event.target.value);

    async function getData(){
        let response = await fetch('https://ggsipu-backend.vercel.app/devices', {
            method: 'GET'
        })

        let data = await response.json();
        console.log(data);
        setDevices(data.devices.reverse().map((item)=>{
            return <Link style={{textDecoration: 'none', color: 'black'}} key={item._id} to={`/device/${item._id}`}>
                <DeviceCard device={item}/>
            </Link>
        }));
    }

    async function addData(){
        console.log(deviceName);
        let response = await fetch('https://ggsipu-backend.vercel.app/addDevice', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'deviceName': deviceName})
        })

        if(response.status === 200){
            getData();
            setMessage('Device Added');
        }else{
            setMessage('Error adding device.');
        }

        setTimeout(()=>{
            setMessage('');
        }, 2000);
    }

    useEffect(()=>{
        getData();
    }, [])

    return (
        <>
            <div id='add-device-screen'>
                <div id='device-card'>
                    { message }
                    <input id='add-device-input' type='text' placeholder='Device Name' onChange={handleDeviceChange}/>
                    <div id='logout' onClick={addData}><b>Add Device</b></div>
                </div>
                {devices}
            </div>
        </>
    )
}