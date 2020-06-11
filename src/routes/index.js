const express = require('express');

const HomeController = require('../app/controllers/HomeController');

const routes = express.Router();

const users = require('./users');
const products = require('./products');


routes.get('/', HomeController.index);

routes.use('/users', users);
routes.use('/products', products);

// Alias
routes.get('/ads/create', function(req, res){
    return res.redirect('/products/create');
});

module.exports = routes;