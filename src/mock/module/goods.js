function goodsList() {
  // 模拟数据
  let result = {
    code: 1,
    result: [
      {
        productId: '10001',
        productName: '小米6',
        prodcutPrice: '2499',
        prodcutImg: 'mi6.jpg',
      },
      {
        productId: '10002',
        productName: '小米笔记本',
        prodcutPrice: '3999',
        prodcutImg: 'minote.jpg',
      },
      {
        productId: '10002',
        productName: '小米笔记本',
        prodcutPrice: '3999',
        prodcutImg: 'minote.jpg',
      },
    ],
  };
  return result;
}

module.exports = {
  goodsList: goodsList(),
};
