const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000

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
];
//Intermediario
app.use(bodyParser.json())

//Controladores

//Leer todos los estudiantes
app.get('/Estudiantes/',(req, res) => {
    res.json({
        cantidad: ESTUDIANTES.length,        
        estudiantes: ESTUDIANTES
    });
});

//Agregar Estudiante
app.post('/estudiantes/', (req, res) =>{
    ESTUDIANTES.push(req.body);
    res.json(req.body);
});

//Traer estudiante especifico
app.get('/estudiantes/:indice', (req, res) => {
    res.json(ESTUDIANTES[req.params.indice]);
});

// Actualizar campos de un estudiante
app.put('/estudiantes/:indice', (req,res) => {
    ESTUDIANTES[req.params.indice].nombre = req.body.nombre;
    ESTUDIANTES[req.params.indice].edad = req.body.edad;
    res.send("Estudiante Actualizado");
 });
 
 // Eliminar un estudiante de la lista 
 app.delete('/estudiantes/:indice', (req,res) => {
     ESTUDIANTES.splice(req.params.indice,1);
     res.send("Estudiante Eliminado");
  });

app.listen(port,() => console.log('Example app listening at http://localhost:'+port));