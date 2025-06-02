export const MYSQL = {
    DB_CONNECTION: process.env.DB_CONNECTION || "mysql",
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_DATABASE: process.env.DB_DATABASE || "",
    DB_USERNAME: process.env.DB_USERNAME || "",
    DB_PASSWORD: process.env.DB_PASSWORD || ""
};

export const PORT = process.env.PORT || 3000;