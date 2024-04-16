import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import '../assets/data.css'

export default function Data(){
    const {id} = useParams();
    const [deviceData, setDeviceData] = useState('');
    const [dataToPlot, setDataToPlot] = useState('');

    async function getDevice(){
        let response = await fetch(`https://ggsipu-backend.vercel.app/device/${id}`, {
            method: 'GET'
        })
        
        let data = await response.json();
        console.log(data);
        setDeviceData(data.device);
        setDataToPlot(data.device.deviceValues.map((item, index)=>{
            return {x: index, y: item};
        }));
        console.log(dataToPlot);
    }

    useEffect(()=>{
        getDevice();
        setInterval(()=>{
            getDevice();
        }, 1000);

    }, [])

    return (
        <>  
            <div id="data-display">
                <div className='border-shadow'>
                    <h1>Realtime Data: {deviceData.deviceName}</h1>
                    <h4 style={{color: 'grey', marginBottom: '2%'}}>Send data to: https://ggsipu-backend.vercel.app/addData/{deviceData._id}</h4>
                        <LineChart width={600} height={300} data={dataToPlot} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                            <Line type="monotone" dataKey="y" stroke="#8884d8" />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <XAxis dataKey="x" />
                            <YAxis />
                            <Tooltip />
                        </LineChart>
                
                </div>
                <div className='border-shadow'>
                    <h1>Add fake turn off buttons</h1>
                </div>

                <div className='border-shadow'>
                    <h1>Add fake stats</h1>
                </div>
            </div>
            <div className='border-shadow' style={{margin: '0 3%'}}>
                <h1> Add something more</h1>
            </div>
        </>
    )
}