import { Usuario } from '../../models/usuarios';
const jwt = require('jsonwebtoken');
const JWTKey = require('../../config/string').token_string;
export const login = (req, res) => {
    const {user, password} =  req.body;
        Usuario.findOne({ user })
        .then(user => {

            if (!user || password != user.password) {
                return Promise.reject(404);
            }

            // hidding password to place it in token ;)
            user.password = undefined;

            // create token
            const token = jwt.sign({ user }, JWTKey);

            return res.status(200).json({ token, user });
        })
        .catch(err => {
            if (err == 404) {
                return res.sendStatus(err);
            }

            return res.sendStatus(400);
        })
}
