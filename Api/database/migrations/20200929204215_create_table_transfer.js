
exports.up = function(knex, Promise) {
  return knex.schema.createTable('transfer',function(table){
    table.increments('id').primary();
    table.decimal('sale',14,2);  
    table.string('name');
    table.string('type');
    table.string('user_receive_id');
    table.string('user_send_id');
    table.timestamps();

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('transfer');
  
};
