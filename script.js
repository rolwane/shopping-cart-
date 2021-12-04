// Section onde é inserido todos os produtos
const items = document.querySelector('.items');

// Lista onde é inserido os itens do carrinho
const ol = document.querySelector('.cart__items');

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

function cartItemClickListener() {
  // coloque seu código aqui
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function addToCart(event) {
  if (event.target.className === 'item__add') {
    const itemID = getSkuFromProductItem(event.path[1]);

    fetchItem(itemID).then(({ id: sku, title: name, price: salePrice }) => {
      ol.appendChild(createCartItemElement({ sku, name, salePrice }));
    });
  }
}

window.onload = () => {
  fetchProducts('computador').then((response) => {
    response.results.forEach(({ id: sku, title: name, thumbnail: image }) => {
      items.appendChild(createProductItemElement({ sku, name, image }, addToCart));
    });
  });
};
