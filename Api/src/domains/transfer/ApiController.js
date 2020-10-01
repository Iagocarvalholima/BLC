import controller from '../../helpers/compose-controller';
import Transfer from '../../models/Transfer';
import Users from '../../models/Users';
import knex from 'knex';

class TransferApiController {
  static async list(req, res) {
    let data = await Transfer.query()
      .select(
        'transfer.*',
        'users.name as name_user_receive'
      )
      .join("users", "transfer.user_receive_id", "users.id")
      .where(knex.raw(`user_send_id = ${req.params.id} or user_receive_id = ${req.params.id}`))

    if (!data) {
      return res.status(404).json({
        message: 'Nenhum registro cadastrado.',
      });
    }

    return res.status(200).responseComposer({ data });
  }

  static async create(req, res){
    let user_send = await Users.query()
      .select()
      .first()
      .where('id', req.body.user_send_id) 

    let user_receive = await Users.query()
      .select()
      .first()
      .where('id', req.body.user_receive_id) 

    if (!user_send) {
      return res.status(404).json({
        message: 'Nenhum usuario cadastrado.',
      });
    }
    if (user_send.sale < req.body.value_transfer) {
      return res.status(404).json({
        message: 'Saldo insuficiente!',
      });
    }
    
    let send = await Users.query()
     .findById(user_send.id)
     .patch({
       sale: user_send.sale - req.body.value_transfer
      });

    let receive = await Users.query()
     .findById(user_receive.id)
     .patch({
       sale: user_receive.sale + req.body.value_transfer
      });

    let transfer = await Transfer.query()
      .insert({
        sale: req.body.value_transfer,
        name: req.body.name_transfer,
        type: req.body.type,
        user_send_id: req.body.user_send_id,
        user_receive_id: req.body.user_receive_id,
        created_at: new Date()
      })

      return res.status(200).responseComposer(transfer);
  }
}

export default controller(TransferApiController);
