const fetchProducts = async (query) => {

  if (query === undefined) return new Error('You must provide an url');

  const fetchResponse = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
  const productsJSON = fetchResponse.json();
  return productsJSON;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
