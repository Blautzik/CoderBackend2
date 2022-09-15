const express = require('express')
const app = express()
const Contenedor = require('./desafioArchivos')


const contenedor = new Contenedor('productos.txt');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const productsRouter = require("./src/routes/desafioRouter");

app.use("/api/products", productsRouter)

app.use("/static", express.static(__dirname + "/public"));

app.get("/form", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/", async (req, res) => {
  const newProduct = {
    title: req.body.title,
    price: Number(req.body.price),
    thumbnail: req.body.thumbnail,
  };
  res.json(await contenedor.addProduct(newProduct));
});



const PORT = 8080

const server = app.listen(PORT, ()=> {
  console.log('escuchando servidor')
})
