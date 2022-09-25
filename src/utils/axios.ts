import axios from 'axios';
require('dotenv').config();

export const api = axios.create({ baseURL: process.env.API_ROUTE });
