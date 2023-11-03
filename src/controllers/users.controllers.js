//importa la conexion a la base de datos
import {pool} from '../db.js'

// funciones que recuperan la informacion de la base de datos
export const getUsers = async (req, res) =>{ 

    try {
        const [rows] = await pool.query('select * from usuarios')
        res.json(rows)
    }
    catch (error) {
        return res.status(500).json({message: 'ocurrio un error'})
    }
    
}

export const getUser = async(req, res) =>{

    try {
        //extrae el parametro enviado en la url
        const [rows] = await pool.query('select * from usuarios where UserId = ?', [req.params.id])
        console.log(rows)

        //chequear que devuelva algo o no
        if(rows.length <= 0){
            return res.status(404).json({message: 'usuario no encontrado'})
        }

        res.json(rows[0])
    } catch (error){
        return res.status(500).json({message: 'ocurrio un error'})
    }
    
}

export const getUserByMail = async (req, res) =>{
    try {
        //extrae el parametro enviado en la url
        const [rows] = await pool.query('select * from usuarios where email = ?', [req.params.email])
        console.log(rows)

        //chequear que devuelva algo o no
        if(rows.length <= 0){
            return res.status(404).json({message: 'usuario no encontrado'})
        }

        res.json(rows[0])
    } catch (error){
        return res.status(500).json({message: 'ocurrio un error'})
    }
}

export const createUser = async (req, res) =>{

    const {nombre, apellido, email, contrasenia} = req.body

    try {


        const [rows] = await pool.query('insert into usuarios(nombre, apellido, email, contrasenia) values (?,?,?,?)', [nombre, apellido, email, contrasenia])

        res.send({
            id: rows.insertId,
            nombre,
            apellido,
            email
        })
    } catch (error) {
        res.status(500).json({message: 'ocurrio un error'})
    }

    
}

export const updateUser = async(req, res) =>{

    const {id} = req.params
    const {nombre, apellido, email, contrasenia, creditos} = req.body

    try{

        const [result] = await pool.query(
            'update usuarios set nombre = ifnull(?, nombre), apellido = ifnull(?, apellido), email = ifnull(?, email), contrasenia = ifnull(?, contrasenia), creditos = ifnull(?, creditos) where UserId= ?',
            [nombre,apellido,email,contrasenia,creditos,id]
            )

        if(result.affectedRows<=0){
            return res.status(404).json({message : 'usuario no encontrado'})
        }

        const [rows] = await pool.query('select * from usuarios where userid = ?', [id])


        res.json(rows[0])
    } catch (error){
        res.status(500).json({message:'ocurrio un error'})
    }
    
}

export const deleteUser = async (req, res) =>{
    try{
        const [result] = await pool.query('delete from usuarios where UserId = ?', [req.params.id])
        if(result.affectedRows <= 0){
            return res.status(404).json({message: 'usuario no encontrado'})
        }

        res.sendStatus(204)
    } catch (error) {
        res.status(500).json({message:'ocurrio un error'})
    } 
}

export const getCards = async (req, res) =>{
    try {
        //extrae el parametro enviado en la url
        const [rows] = await pool.query('select * from cartas')
        console.log(rows)

        //chequear que devuelva algo o no
        if(rows.length <= 0){
            return res.status(404).json({message: 'cartas no encontradas'})
        }

        res.json(rows)
    } catch (error){
        return res.status(500).json({message: 'ocurrio un error'})
    }
}

export const getUserCards = async (req, res) =>{
    try {
        //extrae el parametro enviado en la url
        const [rows] = await pool.query('select * from cartas where ownerID = ?', [req.params.id])
        console.log(rows)

        //chequear que devuelva algo o no
        if(rows.length <= 0){
            return res.status(404).json({message: 'cartas no encontradas'})
        }

        res.json(rows)
    } catch (error){
        return res.status(500).json({message: 'ocurrio un error'})
    }
}

export const createUserCard = async (req, res) =>{
    
    const {ownerID, pokemonID, fechaObtenida} = req.body

    try {


        const [rows] = await pool.query('insert into cartas(ownerID, PokemonID) values (?,?)', [ownerID, pokemonID])

        res.send({
            id: rows.insertId,
            ownerID,
            pokemonID,
            fechaObtenida
        })
    } catch (error) {
        res.status(500).json({message: 'ocurrio un error'})
    }

}

export const updateCard = async(req, res) =>{

    const {id} = req.params
    const {ownerID, origen, fechaObtenida} = req.body

    try{

        const [result] = await pool.query(
            'update cartas set ownerID = ifnull(?, ownerID), origen = ifnull(?, origen), fechaObtenida = ifnull(?, fechaObtenida) where cartaId= ?',
            [ownerID, origen, fechaObtenida, id]
            )

        if(result.affectedRows<=0){
            return res.status(404).json({message : 'carta no encontrado'})
        }

        const [rows] = await pool.query('select * from cartas where cartaid = ?', [id])


        res.json(rows[0])
    } catch (error){
        res.status(500).json({message:'ocurrio un error'})
    }
    
}

export const deleteCard = async (req, res) =>{
    try{
        const [result] = await pool.query('delete from cartas where cartaId = ?', [req.params.id])
        if(result.affectedRows <= 0){
            return res.status(404).json({message: 'carta no encontrado'})
        }

        res.sendStatus(204)
    } catch (error) {
        res.status(500).json({message:'ocurrio un error'})
    } 
}

export const getUserFollowed = async (req, res) =>{
    try {
        //extrae el parametro enviado en la url
        const [rows] = await pool.query('select * from seguidores where seguidorID = ?', [req.params.id])
        console.log(rows)

        //chequear que devuelva algo o no
        if(rows.length <= 0){
            return res.status(404).json({message: 'seguidores no encontrados'})
        }

        res.json(rows)
    } catch (error){
        return res.status(500).json({message: 'ocurrio un error'})
    }
}

export const getUserFollowers = async (req, res) =>{
    try {
        //extrae el parametro enviado en la url
        const [rows] = await pool.query('select * from seguidores where seguidoID = ?', [req.params.id])
        console.log(rows)

        //chequear que devuelva algo o no
        if(rows.length <= 0){
            return res.status(404).json({message: 'seguidores no encontrados'})
        }

        res.json(rows)
    } catch (error){
        return res.status(500).json({message: 'ocurrio un error'})
    }
}

export const createFollow = async (req, res) =>{
    
    const {seguidorID, seguidoID, fechaSeguimiento} = req.body

    try {


        const [rows] = await pool.query('insert into seguimientos(seguidorID, seguidoID) values (?,?)', [seguidorID, seguidoID])

        res.send({
            ownerID,
            pokemonID,
            fechaObtenida
        })
    } catch (error) {
        res.status(500).json({message: 'ocurrio un error'})
    }

}

export const deleteFollow = async (req, res) =>{
    const {seguidorID, seguidoID, fechaSeguimiento} = req.body
    try{
        const [result] = await pool.query('delete from seguidores where seguidorID = ? and seguidoID = ?', [seguidorID,seguidoID])
        if(result.affectedRows <= 0){
            return res.status(404).json({message: 'seguimiento no encontrado'})
        }

        res.sendStatus(204)
    } catch (error) {
        res.status(500).json({message:'ocurrio un error'})
    } 
}

