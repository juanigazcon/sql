const knex = require('knex');
const options1 = require('./knexProducts');
const database1 = knex(options1);
let createP = true;
const options2 = require('./sqliteChat');
const database2 = knex(options2)
let createC = true;

 
if(createP){
database1.schema.createTable('products', table => {
    table.increments('id')
    table.string('title')
    table.float('price')
    table.string('url')
    createP=false
})
    .then(() => console.log('Table created successfully!'))
    .catch(err => console.log(err))
    .finally(() => database1.destroy())
} 

if(createC){
    database2.schema.createTable('messages', table => {
        table.increments('id')
        table.string('email')
        table.string('message')
        table.date('date')
        createP=false
    })
        .then(() => console.log('Table created successfully!'))
        .catch(err => console.log(err))
        .finally(() => database2.destroy())
    }
    