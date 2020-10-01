const Model = require('./Model');

class Transfer extends Model{
  static get tableName(){ // pegando DBeaver table
    return 'transfer'
  }
}
module.exports = Transfer;