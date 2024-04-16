import '../assets/devicecard.css'
export default function DeviceCard(props){
    console.log(props.device);
    return (
        <>
            <div id='device-card'>
                <h1> {props.device.deviceName} </h1>
                <h3> Current Value: {props.device.deviceValues[0]}</h3>
            </div>
        </>
    )
}