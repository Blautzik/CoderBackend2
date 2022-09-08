const express = require('express')
const app = express()
const Contenedor = require('./desafioArchivos')


const contenedor = new Contenedor('productos.txt');


app.get('/', (req,res) => {
  res.send('<h1>hola</h1>')
}) 

app.get('/productos', async (req,res) => {
  const arrayDeProductos = await contenedor.getAll()
  res.send(arrayDeProductos)
})

app.get('/productoRandom', async (req, res) => {
  const arrayDeProductos = await contenedor.getAll()
  const random = Math.floor(Math.random() * arrayDeProductos.length)
  res.send(arrayDeProductos[random])
})


const PORT = 8080

const server = app.listen(PORT, ()=> {
  console.log('escuchando servidor')
})
