const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://pxyz943:wJY9mtvHp2rvZ7We@week3.qssgcap.mongodb.net/ggsipu')
.then(()=>{
    console.log('Connected to MongoDB');
}).catch(()=>{
    console.log('Error connecting to MongoDB');
})

const DeviceSchema = mongoose.Schema({
    'deviceName': String,
    'deviceValues': []
})

const DeviceModel = mongoose.model('Devices', DeviceSchema);

module.exports = {
    DeviceModel
}