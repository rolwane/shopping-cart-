const fetchProducts = async (query) => {
  if (query === undefined) return new Error('mensagem esperada aqui');

  const fetchResponse = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
  const responseJSON = await fetchResponse.json();
  return responseJSON;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
