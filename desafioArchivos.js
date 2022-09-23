const fs = require("fs").promises;

class Contenedor {
  constructor(file) {
    this.file = file;
  }
  async getAll() {
    try {
      const productos = await fs.readFile(this.file, "utf-8");
      return JSON.parse(productos);
    } catch (err) {
      return null;
    }
  }
  async save(producto) {
    const arrayDeProductos = await this.getAll();
    if (!arrayDeProductos) {
      await fs.writeFile(this.file, "[]");
    } else {
      producto = { ...producto, id: arrayDeProductos.length + 1 + '' };
      arrayDeProductos.push(producto);
      await fs.writeFile(this.file, JSON.stringify(arrayDeProductos));
      console.log("se guardo un producto");
    }
  }
  async getById(num) {
    let showId = await this.getAll();
    let number = num + ''
    let objectSelected = showId.find((obj) => obj.id === number);
    if (objectSelected) {
      return objectSelected;
    } else {
      return null;
    }
  }
  async deleteById(id) {
    const arrayProducts = await this.getAll();
    const updateArray = arrayProducts.filter((obj) => Number(obj.id) !== id);
    await fs.writeFile(this.file, JSON.stringify(updateArray));
  }
  async deleteAll() {
    try {
      await fs.writeFile(this.file, "[]");
    } catch {
      console.log("No hay productos para borrar");
    }
  }
  async updateProduct(product, id) {
    const arr = await this.getAll();
    const index = arr.findIndex((p) => {
      return p.id == id;
    });

    if (index >= 0) {
      arr[index].title = product.title;
      arr[index].price = product.price;
      arr[index].thumbnail = product.thumbnail;

      await fs.writeFile(this.file, JSON.stringify(arr));
      return { data: "Producto actualizado" };
    } else {
      return { data: "No se pudo actualizar" };
    }
  }

  async addProduct(product) {
    const arr = await this.getAll();
    arr.push(product);
    await fs.writeFile(this.file, JSON.stringify(arr));
    return { data: "Producto agregado" };
  }
}
(async () => {
  const container = new Contenedor("productos.txt");
  const producto = {
    title: "album tapa blanda",
    price: 750,
    thumbnail: 100,
  };
  
  const producto2 = {
    title: "figu messi",
    price: 7500,
    thumbnail: 100,
  };
  
  
  await container.deleteAll();
  await container.save(producto);
  await container.save(producto);
  await container.save(producto);
  console.log(await container.getAll());

  console.log(await container.getById(3))
  await container.deleteById(3)
  console.log(await container.getAll())
  await container.updateProduct(producto2, 2)
  console.log(await container.getAll())
})();

module.exports = Contenedor;
