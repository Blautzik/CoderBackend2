const express = require('express')
const app = express()
const Contenedor = require('./desafioArchivos')
const hbs = require('express-handlebars')

const contenedor = new Contenedor('productos.txt');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const productsRouter = require("./src/routes/desafioRouter");
app.use("/api/products", productsRouter)


app.engine('hbs', hbs.engine({
  partialsDir: __dirname+'/src/views/partials',
  layoutsDir: __dirname+'/src/views/layouts',
  extname:'.hbs',
  defaultLayout:'layout1.hbs'
}))

app.set('views', './src/views')
app.set('view engine', 'hbs')

app.get('/', (req,res)=> {
  res.render('form')
})


app.use('/', productsRouter);


const PORT = 8080

const server = app.listen(PORT, ()=> {
  console.log('escuchando servidor')
})
