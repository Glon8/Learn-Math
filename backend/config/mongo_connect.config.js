import mongoose from 'mongoose'

export const connect_mongo = async () => {
    try{
        const conn = await mongoose.connect('mongodb+srv://daniruzanov:Y6sC9w3KytnR1rWO@cluster0.ojmevss.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

        console.log(`Mongo Data Base connected: ${ conn.connection.host }`)
    }
    catch(error) {
        console.error(`Error: ${error.message}`);

        process.exit(1); // 1 mean fail, 0 means success
    }
}

//Y6sC9w3KytnR1rWO mongo pass