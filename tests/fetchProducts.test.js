require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
    
  it('Teste se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toEqual('function');
  })

  it('Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  })

  it('Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint correto', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  })

  it('Teste se o retorno da função fetchProducts com o argumento "computador" é a estrutura correta', async () => {
    const resposta = await fetchProducts('computador');
    expect(resposta).toEqual(computadorSearch);
  })

  it('Teste se o retorno da função fetchProducts com o argumento "computador" é a estrutura correta', async () => {
    const resposta = await fetchProducts();
    expect(resposta).toEqual(new Error('You must provide an url'));
  })

});
