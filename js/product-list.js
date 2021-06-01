class ProductList {
  constructor() {
    this.container = document.querySelector(".shop-items");
    this.productService = new ProductsService();
    this.productService.getProducts().then(() => this.renderProducts());
  }

  async renderProducts() {
    const productItems = await this.productService.getProducts();

    let productsHtml = "";
    for (const product of productItems) {
      productsHtml += getProductItemHtml(product);
    }
    this.container.innerHTML = productsHtml;

    document
      .querySelectorAll(".add-to-cart-button")
      .forEach((button) =>
        button.addEventListener("click", (event) =>
          new Cart().addItemToCart(event)
        )
      );

    document
      .querySelectorAll(".soap-image")
      .forEach((button) =>
        button.addEventListener("click", (event) =>
          setCurrentProductId(event.target.dataset.id)
        )
      );
  }
}

function getProductItemHtml(item) {
  return `
  <article>
    <a href="product.html"><img src="${item.imgUrl}" data-id="${item.id}" alt="Natural soap" class="soap-image"></a>
    <h3><a href="product.html" class="soap-name">${item.name}</a></h3>
    <p class="soap-price">$ ${item.price}</p>
    <a href="#cart" class="button add-to-cart-button" data-id="${item.id}">Add to Cart &#x27F6;</a>
  </article>
  `;
}

function setCurrentProductId(id) {
  return (localStorage.currentProductId = id);
}

function getCurrentProductId() {
  return localStorage.currentProductId;
}
