// var Mock = require('mockjs');

var apiGoods = require('./module/goods.js');
console.log('apiGoodss:', apiGoods);
module.exports = {
  goodsList: apiGoods.goodsList,
};
