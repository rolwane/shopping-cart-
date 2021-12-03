const cartItems = document.querySelector('.cart__items');

function getTotalPrice() {
  const items = cartItems.querySelectorAll('li');
  let totalPrice = 0;
  items.forEach((item) => {
    const itemPrice = item.getAttribute('data-price');
    totalPrice += Number(itemPrice);
  });
  document.querySelector('.total-price').innerText = totalPrice;
}

function removeItem(event) {
  event.target.remove();
  saveCartItems();
  getTotalPrice();
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.setAttribute('data-sku', sku);
  li.setAttribute('data-price', salePrice);
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', removeItem);
  return li;
}

// Adiciona itens no carrinho
function addToCart(event) {
  if (event.target.className === 'item__add') {
    const skuItem = getSkuFromProductItem(event.path[1]);
    fetchItem(skuItem).then(({ id: sku, title: name, price: salePrice }) => {
      cartItems.appendChild(createCartItemElement({ sku, name, salePrice }));
      saveCartItems();
      getTotalPrice();
    });
  }
}

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

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.addEventListener('click', addToCart);
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

// Limpa o carrinho
document.querySelector('.empty-cart').addEventListener('click', () => {
  localStorage.cartItems = '[]';
  cartItems.innerHTML = '';
  getTotalPrice();
});

// Adiciona texto de carregamento antes da API mostrar as informações
function addLoading() {
  const p = document.createElement('p');
  p.classList.add('loading');
  p.innerText = 'carregando...';
  document.querySelector('.items').appendChild(p);
}

// Remove o texto de carregamento
function clearLoading() {
  document.querySelector('.loading').remove();
}

window.onload = () => {
  // Atualiza o carrinho de compra caso tenha itens salvos
  getSavedCartItems(fetchItem, createCartItemElement, getTotalPrice);

  addLoading();

  // Lista os produtos na tela
  fetchProducts().then((response) => {
    const items = document.querySelector('.items');
    response.results.forEach(({ id: sku, title: name, thumbnail: image }) => {
      items.appendChild(createProductItemElement({ sku, name, image }));
    });

    clearLoading();
  });
};
