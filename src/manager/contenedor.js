const options = require("./knexProducts.js");
const knex = require('knex');
//const database = knex(options);

class Contenedor {


  constructor(options, table) {
    this.database = knex(options);
    this.table = table;
  }

  
  async save(obj) {
    try {
      const product = await this.database(this.table).insert({title: obj.title, price: obj.price, url: obj.url});
      return product;
    } catch (err) {
      return {Status:'Error', message: err};
    }
  }



 async getAll() {
    try {
      const products = await this.database.from(this.table).select('*');
      return products;
    } catch (err) {
      return {Status:'Error', message: err};
    }
  } 


  async getById(id) {
    try {
      const product = await this.database.from(this.table).select('*').where('id', id);
      if (product.length <= 0) {
        return null;
      }
      return product;
    } catch (err) {
      return {Status:'Error', message: err};
    }
  }

  async deleteAll() {
    try {
      const product = await this.database(this.table).del('*');
      return product;
    } catch (error) {
      throw error;
    }
  }

  async deleteById(id) {
    try {
      const product = await this.database(this.table).where({id: id}).del();
      return product;
    } catch (error) {
      throw error;
    }
  }

  async update(id, title, price, url) {
    try {
      const product = await this.database(this.table).where({id: id}).update({title: title, price: price, thumbnail: thumbnail})
      return product;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Contenedor