require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  
  it('Teste se fetchItem é uma função', () => {
    expect(typeof fetchItem).toEqual('function');
  });

  it('Execute a função fetchItem com o argumento "MLB1615760527" e teste se fetch foi chamada', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  it('Teste se, ao chamar a função fetchItem com o argumento "MLB1615760527", a função fetch utiliza o endpoint correto', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });

  it('Teste se o retorno da função fetchItem com o argumento "MLB1615760527" é a estrutura correta', async () => {
    const resposta = await fetchItem('MLB1615760527');
    expect(resposta).toEqual(item);
  });

  it('Teste se o retorno da função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    const resposta = await fetchItem();
    expect(resposta).toEqual(new Error('You must provide an url'));
  });

});
