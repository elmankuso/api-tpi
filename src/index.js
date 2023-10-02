//importar la app de app.js
import app from './app.js'

//importar el puerto desde config
import {PORT} from './config.js'

// establecer el puerto en el que se maneja el servidor
app.listen(PORT)
console.log("server running on port", PORT)