//importar modulo de mysql2 para crear la conexion a la base de datos
import {createPool} from "mysql2/promise"
import {DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_DATABASE} from './config.js'

//crear la conexion a la base de datos
export const pool = createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    database: DB_DATABASE
})