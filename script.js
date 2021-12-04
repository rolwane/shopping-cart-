// section onde é inserido todos os produtos
const items = document.querySelector('.items');

// lista onde é inserido os itens do carrinho
const ol = document.querySelector('.cart__items');

// button de esvaziar carrinho
const btnEmpty = document.querySelector('.empty-cart');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }, callback) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  section.addEventListener('click', callback);

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function getTotalPrice() {
  const cartItems = Array.from(document.querySelectorAll('.cart__item'));

  const totalPrice = cartItems.reduce((price, item) => {
    const priceItem = Number(item.getAttribute('data-price'));
    return price + priceItem;
  }, 0);

  document.querySelector('.total-price').innerText = totalPrice;
}

function removeCartItem(event) {
  if (event.target.className === 'cart__item') {
    event.target.remove();
    saveCartItems(ol.innerHTML);

    getTotalPrice();
  }
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.setAttribute('data-price', salePrice);
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  return li;
}

function addToCart(event) {
  if (event.target.className === 'item__add') {
    const itemID = getSkuFromProductItem(event.path[1]);

    fetchItem(itemID).then(({ id: sku, title: name, price: salePrice }) => {
      ol.appendChild(createCartItemElement({ sku, name, salePrice }));
      saveCartItems(ol.innerHTML);
      
      getTotalPrice();
    });
  }
}

function addLoading() {
  const p = document.createElement('p');
  p.classList.add('loading');
  p.innerText = 'carregando...';
  items.appendChild(p);
}

function removeLoading() {
  document.querySelector('.loading').remove();
}

btnEmpty.addEventListener('click', () => {
  ol.innerHTML = '';
  localStorage.setItem('cartItems', '');
  getTotalPrice();
});

window.onload = () => {
  ol.addEventListener('click', removeCartItem);

  // carrega o carrinho com os itens salvos
  ol.innerHTML = getSavedCartItems();

  // atualiza o preço total
  getTotalPrice();

  // adiciona mensagem de carregamento
  addLoading();

  // lista os produtos na tela
  fetchProducts('computador').then((response) => {
    removeLoading();
    response.results.forEach(({ id: sku, title: name, thumbnail: image }) => {
      items.appendChild(createProductItemElement({ sku, name, image }, addToCart));
    });
  });
};
