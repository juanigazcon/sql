const express = require('express')
const { Server } = require('socket.io')
const app = express()
const PORT= process.env.PORT || 8080
const server = app.listen(PORT, ()=>console.log(`Server up on port ${PORT}`))
app.use(express.static('./src/public'))
const productRouter = require('./route/product.router');

const handlebars = require('express-handlebars')
app.engine('handlebars', handlebars.engine())
app.set('views','./src/public/views')
app.set('view engine', 'handlebars')

const io = new Server(server)

const managerC = require('./manager/chat.manager')
const sqlChat = require('./manager/sqliteChat')
let ChatManager = new managerC(sqlChat, 'messages')

const managerP = require('./manager/contenedor');
const knexProducts = require('./manager/knexProducts');
let ProductManager = new managerP(knexProducts, 'products');



app.get('/', (req, res)=>{
    res.render('products')
})
app.use('/', productRouter)

io.on('connection', async (socket) => {
    
    console.log('Socket connected')

    const productArray =  await ProductManager.getAll()
    const messages =  await ChatManager.readExistingMessages()

    //cuando recibo un paquete llamado product, lo pusheo al array de products
    //devuelvo el array en un paquete llamado products
    socket.on('product', async (data) => {
        await ProductManager.save(data).then((resolve) => resolve).then((resolve) => resolve)
        const productArray =  await ProductManager.getAll().then((resolve) => resolve)
        io.sockets.emit("products", productArray);
        
    })
    //el que se conecta, que reciba los productos existentes
    socket.emit('products', productArray)


    socket.on('chat', async (data) => {

        await ChatManager.writeNewMessage(data).then((resolve) => resolve)
        const messageHistory = await ChatManager.readExistingMessages().then((resolve) => resolve);
        console.log (messageHistory)
        io.emit('messageHistory', messageHistory)

    })

    //el que se conecta, recibe todos los chats
    socket.emit('messageHistory', messages) 

})


