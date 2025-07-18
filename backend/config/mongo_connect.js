import mongoose from 'mongoose'

export const connect_mongo = async () => {
    try{
        const conn = await mongoose('', {
            useNewUrlParse: true,
            useUnifiedTopology: true
        });

        console.log(`Mongo Data Base connected: ${ conn.connection.host }`)
    }
    catch(error) {
        console.error(`Error: ${error.message}`);

        process.exit(1); // 1 mean fail, 0 means success
    }
}