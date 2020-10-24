import dotenv from "dotenv";
dotenv.config();

export const IS_DEV = process.env.NODE_ENV === "development";
export const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;
