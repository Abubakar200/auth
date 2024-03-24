import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.DATABASE_URL!)
        const connection = mongoose.connection

        connection.on("connected", () => {
            console.log("Successfully connected")
        })

        connection.on("error", (error) => {
            console.log("Error connecting to database: ", error)
            process.exit()
        })

    } catch (error) {
        console.log("Error to connection the database", error)
    }
}