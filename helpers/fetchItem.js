const fetchItem = async (sku) => {
  if (sku === undefined) return new Error('You must provide an url');
  const fetchResponse = await fetch(`https://api.mercadolibre.com/items/${sku}`);
  const responseJSO = await fetchResponse.json();
  return responseJSO;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
