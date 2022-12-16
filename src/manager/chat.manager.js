const options = require('./sqliteChat.js');
const knex = require('knex');

class Chat {
   
  constructor(options, table) {
    this.database = knex(options);
    this.table = table;
  }


    async readExistingMessages(){
        try {
            const messages = await this.database.from(this.table).select('*');
            return messages;
          } catch (err) {
            return {Status:'Error', message: err};
          }
    }

    async writeNewMessage(obj) {
      try {
        const message = await this.database(this.table).insert({email: obj.email, message: obj.message, date: obj.currentDate});
        return message;
      } catch (eee) {
        return {Status:'Error', message: err};
      }
    }
  }
  
  module.exports = Chat

