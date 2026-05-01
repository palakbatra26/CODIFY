import mongoose from 'mongoose'

const conn_db = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("database connected.")
    } catch (error) {
        console.log("error: ", error)
    }
} 

export default conn_db;