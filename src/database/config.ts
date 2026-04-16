
require('dotenv').config();

const config = {
    /// For the sake of this exercise, we'll use 
    /// localhost and password in plain text.
    /// In a real application, these should be stored
    /// in environment variables.
    db: {
        host: "localhost",
        user: process.env.DB_LOCAL_USER || "",
        password: process.env.DB_LOCAL_PASSWORD || "",
        database: process.env.DB_LOCAL_DATABASE || ""
    },
    port: 3000,
    listPerPage: 100
};

export default config;