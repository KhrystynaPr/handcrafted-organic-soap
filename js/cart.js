class Cart {
  constructor() {
    if (!Cart._instance) Cart._instance = this;
      
    this.cartModal = document.querySelector("#cart");
    this.productService = new ProductsService();

    document.querySelector("#cart-icon").addEventListener('click', () => this.renderCartModal());
    updateCartCount();
    return Cart._instance;
  }

  removeItemFromCart (event) {
    const itemId = event.target.dataset.id;
    removeItemFromCartStorage(itemId);
    document.querySelector("#cart-icon").click();
    updateCartCount();
  }
  
  addItemToCart (event) {
    const itemId = event.target.dataset.id;
    addItemToCartStorage(itemId, 1);
    updateCartCount();
  }

  async renderCartModal() {
    const productsIdAndCount =  getCartItemsFromStorage();

    let totalPrice = 0;
    let cartItemsHtml = '';
    for (const id in productsIdAndCount) {
      if (id === "" || id === "undefined" || productsIdAndCount[id] < 1) {
        continue;
      }
      const product = await this.productService.getProductById(id);
      totalPrice += productsIdAndCount[id] * product.price;
      cartItemsHtml += getCartItemsHtml(product, productsIdAndCount[id]);
    }
    this.cartModal.innerHTML = `
        <div id="cart-content" class="container">
          <div id="cart-header">                                                                  
              <p>Shopping cart</p>
              <svg id="close-cart" width="100" viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg" style="max-width:100%" height="100%"><path d="M19.7 18.3c.4.4.4 1 0 1.4-.2.2-.4.3-.7.3-.3 0-.5-.1-.7-.3L12 13.4l-6.3 6.3c-.4.4-1 .4-1.4 0-.2-.2-.3-.4-.3-.7 0-.3.1-.5.3-.7l6.3-6.3-6.3-6.3c-.4-.4-.4-1 0-1.4.4-.4 1-.4 1.4 0l6.3 6.3 6.3-6.3c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4L13.4 12l6.3 6.3z" fill="currentColor" style=""></path><mask id="a6094fde70ad45800227e21e8" maskUnits="userSpaceOnUse" x="4" y="4" width="16" height="16" style="" fill="currentColor"><path d="M19.7 18.3c.4.4.4 1 0 1.4-.2.2-.4.3-.7.3-.3 0-.5-.1-.7-.3L12 13.4l-6.3 6.3c-.4.4-1 .4-1.4 0-.2-.2-.3-.4-.3-.7 0-.3.1-.5.3-.7l6.3-6.3-6.3-6.3c-.4-.4-.4-1 0-1.4.4-.4 1-.4 1.4 0l6.3 6.3 6.3-6.3c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4L13.4 12l6.3 6.3z" fill="currentColor" style=""></path></mask><g mask="url(#a6094fde70ad45800227e21e8)" style="" fill="currentColor"><path fill="currentColor" d="M0 0h24v24H0z" style=""></path></g></svg>
          </div> 
          <div id="order-content">
              <div id="cart-content-header">
                  <p>PRODUCTS</p>
              </div>
              <div id="cart-items">
                  ${cartItemsHtml}
              </div>
              <hr>
              <div id="total">
                  <p>Total: <span id="total-price">${totalPrice} $</span></p>
              </div>
              <div id="order-form"> 
                  <p>PLACE AN ORDER</p>
                  <form action="https://formspree.io/f/mjvjwrqd" method="POST">
                      <label for="name">Name <span>*</span></label>
                      <input id="name" type="text" name="name" placeholder="Your name" required>
                      <label for="email" >Email <span>*</span></label>
                      <input id="email" type="email" name="replyto" placeholder="Your email address" required>
                      <label for="phone">Phone <span>*</span></label>
                      <input id="phone" type="number" name="phone" placeholder="Your phone" required>
                      <label for="comment">Comment </label>  
                      <textarea id="comment" name="message" placeholder="Your comment"></textarea>
                      <div id="end-order">
                          <span id="continue-shopping">Continue shopping</span>
                          <button class="button" type="submit">Order</button>
                      </div>
                  </form>
              </div>
          </div>
        </div>
          `;
      document.querySelectorAll(".remove").
      forEach (button =>
        button.addEventListener('click', event =>
        new Cart().removeItemFromCart(event)
        )
      );
      document.querySelector('#close-cart').addEventListener('click', () => this.closeCart());
      document.querySelector('#continue-shopping').addEventListener('click', () => this.closeCart());
      this.cartModal.style.display = "block";
  }

  closeCart() {
    this.cartModal.style.display = "none";
  }
}

function getCartItemsHtml(item, count) {

const totalPriceOfOneItem = count * item.price;

  return `
  <div>
  <img src="${item.imgUrl}" alt="Natural soap">
</div>
<div class="middle-content">
  <div>
      <p id="card-soap-title">${item.name}</p>
  </div>
  <div class="count">
      <span>&minus;</span>
      <input type="number" id="quantity" value="${count}">
      <span>&plus;</span>
  </div>
</div>
<div>
  <p>$ ${totalPriceOfOneItem}</p>
</div>
<div>
  <button class="remove product__remove-item-btn_1Qs"><svg data-id="${item.id}" width="28" height="32" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 2H13.6C13.8 2 14 2.2 14 2.4V3.6C14 3.8 13.8 4 13.6 4H0.4C0.2 4 0 3.9 0 3.6V2.4C0 2.2 0.2 2 0.4 2.1H4.1V2L4.9 0.3C5 0.1 5.1 0 5.3 0H8.8C8.9 0 9.1 0.1 9.2 0.2L10 1.9V2ZM1.8 16.1C1.9 17.1 2.8 18 3.8 18H10.1C11.2 18 12 17.2 12.1 16.1L13.1 5H1L1.8 16.1ZM12 6L11.2 16.1C11.2 16.6 10.7 17 10.2 17H3.8C3.3 17 2.8 16.6 2.8 16.1L2 6H12ZM5 8.09998H6V14.1H5V8.09998ZM9 8.09998H8V14.1H9V8.09998Z" fill="#9199AB"></path></svg></button>
</div>
  `;

}

function updateCartCount() {
  const allItems = getCartItemsFromStorage();
  let totalCount = 0;
  for (const id in allItems) {
    if (id === "" || id === "undefined" || allItems[id] < 1) {
      continue;
    }
    totalCount += allItems[id]; 
  }

  if (totalCount > 9) {
    totalCount = "9+"
  }

  document.querySelector("#cart-items-count").innerHTML = totalCount;

}


function getCartItemsFromStorage () {
  return JSON.parse(localStorage['cart'] || "{}");
}

function addItemToCartStorage (id, count) {
  const cart = getCartItemsFromStorage();
  cart[id] = (cart[id] || 0) + count;
  localStorage['cart'] = JSON.stringify(cart);
}

function removeItemFromCartStorage (id) {
  const cart = getCartItemsFromStorage();
  cart[id] = 0;
  localStorage['cart'] = JSON.stringify(cart);
} 

function removeOneItemFromCartStorage (id) {
  const cart = getCartItemsFromStorage();
  if (cart[id] > 1) {
    cart[id] -= 1;
  } else {
    cart[id] = 0;
  }
  
  localStorage['cart'] = JSON.stringify(cart);
}