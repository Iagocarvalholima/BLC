import jwt from 'jwt-simple';
import bcrypt from 'bcrypt';
import moment from 'moment';
import { Users } from '../../models'

const response = (user) => {
  const payload = {
    exp: moment().add(14, 'days').unix(),
    iat: moment().unix(),
    sub: user,
  };

  let token = jwt.encode(payload, process.env.JWT_SECRET);
  delete user.password;

  return {
    token,
    user,
  };
};

class AuthApiController {
  static async createAccount(req, res) {
    if (!req.body.password) {
      return res.status(422).json({
        message: 'A senha é obrigatorio!',
      });
    }

    if (req.body.password.length < 8) {
      return res.status(422).json({
        message: 'A senha deve ter no minimo 8 caracteres!',
      });
    }

    const password = await bcrypt.hash(req.body.password, 10);

    let email = await Users
      .query()   // fazer uma pesquisa no banco/
      .where({ email: req.body.email })
      .first();

    if (email) {
      return res.status(400).json({
        message: 'Email já cadastrado.',
      });
    }

    let user = await Users.query()
      .insert({
        name: req.body.name,
        email: req.body.email,
        sale: 0,
        password,
      });

    return res.status(200).responseComposer(user);
  }

  static async login(req, res) {
    let user = await Users.query()
      .select(
        'users.id',
        'users.name',
        'users.email',
        'users.password',
        'users.sale'
      )
      .where('users.email', req.body.email)
      .first()
    if (!user) {
      return res.status(401).json({
        message: 'Usuário não consta em nossa base',
      });
    }
    const matches = await bcrypt.compare(req.body.password, user.password);

    if (matches) {
      return res.status(200).json(response(user));
    }

    return res.status(401).json({
      message: 'Senha inválida',
    });
  }
}

export default AuthApiController;
