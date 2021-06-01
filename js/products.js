(function () {
  openProductPage();
})();

async function openProductPage() {
  const itemId = getCurrentProductId();
  const product = await new ProductsService().getProductById(itemId);

  const productPageHtml = `
  <div id="product-img">
    <img src="${product.imgUrl}" alt="Natural Soap" id="item-image">
  </div>
  <div id="product-description">
    <div id="item-main-info">
        <p id="sale-status">In stock</p>
        <h2>${product.name}</h2>
        <p id="item-price">$ ${product.price}</p>
        <a href="#" id="add-to-cart-button" data-id="${product.id}" class="button">Add to Cart &#x27F6;</a>
    </div>
    <div id="item-description">
        <hr>
        <p class="item-description-text">Description</p>   
        <p>${product.description}</p>
        <hr>
        <p class="item-ingredients-text">Ingredients:</p>
        <p>${product.ingredients}</p>
    </div>
</div>`;

  document.querySelector("#product-content").innerHTML = productPageHtml;

  document
    .querySelector("#cart-icon")
    .addEventListener("click", () => new Cart().renderCartModal());

  document
    .querySelector("#add-to-cart-button")
    .addEventListener("click", (event) => new Cart().addItemToCart(event));
  updateCartCount();
  renderCartIcon();
}
