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

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener() {
  
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
    const cart = document.querySelector('.cart__items');
    const skuItem = getSkuFromProductItem(event.path[1]);
    fetchItem(skuItem).then(({ id: sku, title: name, price: salePrice }) => {
      cart.appendChild(createCartItemElement({ sku, name, salePrice }));
    });
  }
}

window.onload = () => {
  function addListener() {
    const products = document.querySelectorAll('.item');
    products.forEach((product) => product.addEventListener('click', addToCart));
  }

  fetchProducts().then((response) => {
    const items = document.querySelector('.items');
    response.results.forEach(({ id: sku, title: name, thumbnail: image }) => {
      items.appendChild(createProductItemElement({ sku, name, image }));
    });

    addListener();
  });
};
