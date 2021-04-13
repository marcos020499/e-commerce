const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { Usuario } = require("../models/User");
const JWTKey = require('../config/string').token_string;

router.get('/listar', async(req, res) => {
    const users = await Usuario.find();
    res.status(200).json(users);
});
router.delete('/listar/:id', async (req, res) => {
    const users = await Usuario.findByIdAndRemove(req.params.id);
    res.status(200).json(users);
});
router.get('/filtrar/:id', async(req, res) => {
    const users = await Usuario.findById(
        req.params.id);
    res.status(200).json(users);
});
router.post('/editar/:name', async(req, res) => {
    const users = await Usuario.find(req.params, {
        $set: req.body
      });
    const db = await users.save();
    res.status(201).json(db);
});
router.post('/login', (req, res) => {
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
});
router.post('/crear', (req, res) => {
    const user = new Usuario(req.body);
    const db = user.save();
    res.status(201).json(db);
});
router.get('/filtrarUser/:name', async(req, res) => {
    const users = await Usuario.find(
        req.params
      );
    res.status(200).json(users);
});

module.exports = router;