const mongoose = require('mongoose')
const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/CRUD-USERS-DB', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: true,
        })
        console.log(`MongoDB Conected: ${connect.connection.host}`)
    } catch (e) {
        console.log(e);
        process.exit(1)
    }
}

module.exports = connectDB