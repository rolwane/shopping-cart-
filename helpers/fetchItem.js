const fetchItem = async (sku) => {
  const fetchResponse = await fetch(`https://api.mercadolibre.com/items/${sku}`);
  const responseJSO = await fetchResponse.json();
  return responseJSO;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
