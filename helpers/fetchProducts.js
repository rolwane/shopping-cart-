const fetchProducts = async () => {
  const fetchResponse = await fetch('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  const productsJSON = fetchResponse.json();
  return productsJSON;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
