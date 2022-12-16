const express = require('express');
const managerP = require("../manager/contenedor");
const router = express.Router();

router.use(express.urlencoded({extended: true}));
router.use(express.json());
const knexProducts = require('../manager/knexProducts');
let ProductManager = new managerP(knexProducts, 'products');


router.get('/', async (req, res, next) => {
  res.render('products');
});

router.get("/products", async (req, res, next) => {
  try {
    const arrayProduct = await ProductManager
      .getAll()
      .then((resolve) => resolve);
    if (arrayProduct.length === 0) {
      throw new Error("No hay products");
    }
    res.json(arrayProduct)
  } catch (err) {
    next(err);
  }
});

router.get("/products/:id", async (req, res, next) => {
  try {
    const producto = await ProductManager
      .getById(Number(req.params.id))
      .then((resolve) => resolve);
    if (!producto) {
      throw new Error("Producto no encontrado");
    }
    res.json(producto);
  } catch (err) {
    next(err);
  }
});

router.post("/products", async (req, res, next) => {
  try {
    const nombresValidos = /^[a-zA-Z0-9ÑñÁáÉéÍíÓóÚú\s]+$/;
    if (!req.body.title || !req.body.price || !req.body.thumbnail) {
      throw new Error("Debes enviar un producto con nombre, precio y URL");
    }
    if (req.body.price <= 0) {
      throw new Error('El precio debe ser mayor a 0');
    }
    if (!nombresValidos.exec(req.body.title)) {
      throw new Error('El nombre solo puede contener letras, números y espacios');
    }
    await ProductManager.save(req.body).then((resolve) => {
      res.redirect('/');
    });
  } catch (err) {
    next(err);
  }
});



module.exports = router;



