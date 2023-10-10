const mongoose = require('mongoose');

// Connect to MongoDB
module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };
    try {
        mongoose.connect(process.env.DB_CONNECT, connectionParams);
        console.log('Connected to database');
    } catch (error) {
        console.log('Could not connect to database');
        console.log(error);
    }
}
