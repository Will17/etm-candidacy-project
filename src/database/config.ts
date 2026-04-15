const config = {
    /// For the sake of this exercise, we'll use 
    /// localhost and password in plain text.
    /// In a real application, these should be stored
    /// in environment variables.
    db: {
        host: "localhost",
        user: "root",
        password: "password123",
        database: "tecnical_call",
    },
    port: 3000,
    listPerPage: 100
};

export default config;