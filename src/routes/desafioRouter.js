const express = require("express");
const { Router } = express;
const router = new Router();

const Contenedor = require("../../desafioArchivos");
const contenedor = new Contenedor("products.txt");

router.get("/", (req, res) => {
  res.send("Hola productos");
});

router.get("/getAll", async (req, res) => {
  res.json(await contenedor.getAll());
});
router.get("/:id", async (req, res) => {
  res.json(await contenedor.getById(req.params.id));
});

router.post("/", async (req, res) => {
  res.send(await contenedor.save(req.body));
});

router.put("/:id", async (req, res) => {
  let product = await contenedor.getById(req.params.id);

  product.title = req.body.title;
  product.price = req.body.price;
  product.thumbnail = req.body.thumbnail;

  res.json(await contendor.updateProduct(product, req.params.id));
});

router.delete("/:id", async (req, res) => {
  res.json(await contenedor.deleteById(req.params.id));
});

module.exports = router;