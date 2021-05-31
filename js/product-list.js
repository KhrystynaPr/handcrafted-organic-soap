class ProductList {
  constructor() {
    this.container = document.querySelector('.shop-items');
    this.productService = new ProductsService();
    this.productService
      .getProducts()
      .then(() => this.renderProducts());
  }

 async renderProducts() {
  const productItems =  await this.productService.getProducts();

  let productsHtml = '';
  for (const product of productItems) {
    productsHtml += getProductItemHtml(product);
  }
  this.container.innerHTML = productsHtml;
  document.querySelectorAll(".add-to-cart-button")
  .forEach(button =>
    button.addEventListener('click', event => 
    new Cart().addItemToCart(event)
    )
  );

  document.querySelectorAll(".soap-image")
  .forEach (button =>
    button.addEventListener('click', event =>
    openProductPage(event)
    )
  );
 }
}
 

function getProductItemHtml (item) {
  return `
  <article>
    <a href="#"><img src="${item.imgUrl}" data-id="${item.id} alt="Natural soap" class="soap-image"></a>
    <h3><a href="product.html" class="soap-name">${item.name}</a></h3>
    <p class="soap-price">$ ${item.price}</p>
    <a href="#cart" class="button add-to-cart-button" data-id="${item.id}">Add to Cart &#x27F6;</a>
  </article>
  `;
}

function openProductPage (event) {
  const itemId = event.target.dataset.id;
  const ps = new ProductsService();
  const product = ps.getProductById(itemId)

  const productPageHtml = `
  <div id="product-img">
    <img src="${product.imgUrl}" alt="illustration" id="item-image">
  </div>
  <div id="product-description">
    <div id="item-main-info">
        <p id="sale-status">In stock</p>
        <h2>${product.name}</h2>
        <p id="item-price">$ ${product.price}</p>
        <a href="index.html#cart" id="add-to-cart-button" class="button">Add to Cart &#x27F6;</a>
    </div>
    <div id="item-description">
        <hr>
        <p class="item-description-text">Description</p>   
        <p>${product.description}</p>
        <hr>
        <p class="item-ingredients-text">Ingredients:</p>
        <p>${product.ingredients}</p>
    </div>
</div>`

const newWindow = window.open("product.html")
newWindow.onload = function() {
  newWindow.document.querySelector("#product-content").innerHTML = productPageHtml;
}
}