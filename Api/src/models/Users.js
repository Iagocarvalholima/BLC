const Model = require('./Model');

class Users extends Model{
  static get tableName(){ // pegando DBeaver table
    return 'users'
  }
}
module.exports = Users;