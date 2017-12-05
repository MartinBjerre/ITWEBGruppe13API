/*const mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/FitnessAPP';
if(process.env.NODE_ENV === 'production') {
    url= process.env.MONGODB_URI;
}

//Opretter Connection
mongoose.connect(url);

//Monitor connection
mongoose.connection.on('connected', function (){
    console.log('Mongoose connected to' + url);
});
mongoose.connection.on('error', function () {
    console.log('Mongoose connected error' + url);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});


require('./exercise');
require('./workout');
require('./user');
 */
