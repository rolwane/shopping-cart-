const getSavedCartItems = (callback, createCartItem, refreshPrice) => {
  const cart = document.querySelector('.cart__items');
  const itemsSaved = JSON.parse(localStorage.getItem('cartItems')) || [];

  itemsSaved.forEach((skuItem) => {
    callback(skuItem).then(({ id: sku, title: name, price: salePrice }) => {
      cart.appendChild(createCartItem({ sku, name, salePrice }));
      refreshPrice();
    });
  });
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
