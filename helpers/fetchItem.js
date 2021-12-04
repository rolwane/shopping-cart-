const fetchItem = async (itemId) => {
  if (itemId === undefined) return new Error('mensagem esperada aqui');

  const response = await fetch(`https://api.mercadolibre.com/items/${itemId}`);
  const responseJSON = await response.json();
  return responseJSON;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
