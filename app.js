require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const connectDB =require('./dbConfig');
const Estudiantes = require('./models/Estudiantes');
const { restart } = require('nodemon');

const port = 3000;
/*
const ESTUDIANTES = [
    {
        nombre: "Keyla E. Muñoz",
        edad: 21,
    },
    {
        nombre: "Naresh Quiroz",
        edad: 22
    },
    {

    }
];*/
//Intermediario
app.use(bodyParser.json())

//Controladores

//Leer todos los estudiantes
/*
app.get('/api/estudiantes/',(req, res) => {
    res.json({
        cantidad: ESTUDIANTES.length,        
        estudiantes: ESTUDIANTES
    });
});*/
app.get('/api/estudintes/', async(req, res) => {
    const estudiantes = await Estudiantes.find().select('nombre edad');
    restart.json({
        estudiantes,
        cantidad: estudiantes.length
    });
});

//Agregar Estudiante
/*
app.post('/api/estudiantes/', (req, res) =>{
    ESTUDIANTES.push(req.body);
    res.json(req.body);
});*/
app.post('/api/estudiantes/', async(req, res) => {
    const { nombre, edad } = req.body;
    await Estudiantes.creare({ nombre, edad });
    res.json({ nombre, edad });
});

//Traer estudiante especifico
/*
app.get('/api/estudiantes/:indice', (req, res) => {
    res.json(ESTUDIANTES[req.params.indice]);
});*/
app.get('api/estudiantes/:id', async(req, res) =>{
    try{
        const estudiante = await Estudiantes.findById(req.params.id).select('nombre edad');
        res.json({estudiante});
    }catch(error) {
        console.log(error);
        res.json({});
    }
}); 
// Actualizar campos de un estudiante
app.put('/api/estudiantes/:indice', (req,res) => {
    ESTUDIANTES[req.params.indice].nombre = req.body.nombre;
    ESTUDIANTES[req.params.indice].edad = req.body.edad;
    res.send("Estudiante Actualizado");
 });
 
 // Eliminar un estudiante de la lista 
 app.delete('/api/estudiantes/:indice', (req,res) => {
     ESTUDIANTES.splice(req.params.indice,1);
     res.send("Estudiante Eliminado");
  });

connectDB().then(() => {
    app.listen(port, ()=>{
        console.log(`Ejecutando en el puerto ${port}`);
    });
});

app.listen(port,() => console.log('Example app listening at http://localhost:'+port));