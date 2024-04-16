const express = require('express');
const cors = require('cors');

const app = express();
const { DeviceModel } = require('../db');

app.use(cors());
app.use(express.json());

app.post('/addDevice', async(req, res)=>{
    const deviceName = req.body.deviceName;

    if(deviceName){
        const device = new DeviceModel({deviceName: deviceName, deviceValues: []});
        await device.save();
        return res.status(200).json({'message': 'Device added'});
    }else{
        res.status(404).json({'message': 'Error adding device'});
    }

})

app.post('/addData/:id', async(req, res)=>{
    const deviceId = req.params.id;
    const data = req.body.datum;

    try{
        const device = DeviceModel.findOne({_id: deviceId});
        if(device && parseInt(data)){
            await DeviceModel.findOneAndUpdate(
                {_id: deviceId},
                {'$push': {'deviceValues': data}}
            );
        }
        res.status(200).json({'message': 'Data added succesfully'});
    }catch(error){
        res.status(200).json({'message': 'Error adding Data'});
    }
})

app.get('/devices', async(req, res)=>{
    const devices = await DeviceModel.find({}).exec();
    res.status(200).json({'devices': devices});
})

app.get('/device/:id', async(req, res)=>{
    const deviceId = req.params.id;
    try{
        const device = await DeviceModel.findOne({_id: deviceId});
        res.status(200).json({'device': device});
    }catch(error){
        res.status(404).json({'message': 'error retrieving data'});
    }
    
})

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log('Server started successfully on PORT ' + PORT);
})

module.exports = app;