// importar nodulo de express
import express from 'express'

//importar las rutas
import usersRoutes from "./routes/users.routes.js"
import indexRoutes from "./routes/index.routes.js"



const app = express()

//antes de llegar a la ruta
app.use(express.json())


//usar las rutas existentes
app.use(indexRoutes)
app.use('/api',usersRoutes)

//manejar rutas no existentes
app.use((req, res, next) =>{
    res.status(404).json({
        message: 'endpoint no existente'
    })
})

export default app;