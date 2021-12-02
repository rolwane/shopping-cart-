const saveCartItems = () => {
  const ol = document.querySelector('.cart__items');
  const items = ol.querySelectorAll('li');
  const arrItems = [];
  items.forEach((item) => arrItems.push(item.getAttribute('data-sku')));
  localStorage.cartItems = JSON.stringify(arrItems);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
