const options = {
    client: 'sqlite3',
    connection: {
        filename: './src/manager/ecommerce/messages.sqlite'
    },
    useNullAsDefault: true
}

module.exports = options