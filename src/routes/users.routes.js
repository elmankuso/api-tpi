//importar el modulo de enrutador de express para manejar las rutas
import {Router} from 'express'

//esto creo que ya no hace nada aca
import {pool} from "../db.js"

//importar las funciones de los controlladores para acceder a la base de datos
import {getUsers, getUser, createUser, updateUser, deleteUser, getUserByMail} from '../controllers/users.controllers.js'

const router = Router()

// rutas para acceder a la base de datos a traves de las peticiones http
router.get("/users", getUsers)

router.get("/users/:id", getUser)

router.get("/login/:email", getUserByMail)

router.post("/users", createUser)

router.patch("/users/:id", updateUser)

router.delete("/users/:id", deleteUser)

//exportar el router para importarlo en index -> UserRoutes
export default router