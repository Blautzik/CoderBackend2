const express = require("express");
const { Router } = express;
const router = new Router();

const Contenedor = require("../../desafioArchivos");
const contenedor = new Contenedor("productos.txt");



router.get('/productos', (req, res) => {
  res.render('form');
})

router.get('/listaproductos', async (req, res) => {
  productos = await contenedor.getAll()
  res.render('productos', { productos });
})

router.post('/productos', async (req, res) => {
  await contenedor.save(req.body)
  res.render('form')
})


module.exports = router;