var express = require('express');
var router = express.Router();
var CarBrand = require('../models/classifiers/CarBrand.js');
var Chassis = require('../models/classifiers/Chassis.js');
var Fuel = require('../models/classifiers/Fuel.js');
var Transmission = require('../models/classifiers/Transmission.js');

/* GET ALL Brands */
router.get('/brands', function(req, res, next) {
  CarBrand.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  }).sort({'brand': 1});
});

router.get('/chassis', function(req, res, next) {
  Chassis.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  }).sort({'id': 1});
});

router.get('/fuel', function(req, res, next) {
  Fuel.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  }).sort({'id': 1});
});

router.get('/transmission', function(req, res, next) {
  Transmission.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  }).sort({'id': 1});
});


module.exports = router;