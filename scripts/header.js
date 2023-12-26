import {calculateCartQuantity} from '../data/cart.js';

export function renderHeader() {
  const cartQuantity = calculateCartQuantity();

  const headerHTML = `
    <div class="header-left-section">
      <a class="link-primary" href="fakemart.html">
        <img class="fakemart-logo" src="pics/Fakemart-logo.png">
      </a>
    </div>

    <div class="middle-section">
      <input class="search-bar" type="text" placeholder="Search your product">
      <button class="search-button button-primary">
        <img class="search-icon" src="pics/icons/search-icon.png">
      </button>
    </div>

    <div class="right-section">
      <a class="user-sign-in-container" href="#">
        <img class="user-icon" src="pics/icons/user-icon.jpg">
        <div class="sign-in">Sign In</div>
      </a>

      <div class="select-pickup-or-delivery">
        <a class="select-pickup" href="#">Pick-Up</a>
        <a class="select-delivery button-primary" href="#">Delivery</a>
      </div>

      <a class="cart-container" href="checkout.html">
        <img class="cart-icon" src="pics/icons/cart-icon.png">
        <div class="cart-quantity js-cart-quantity">${cartQuantity}</div>
      </a>
      </div>
  `;

  document.querySelector('.js-fakemart-header')
    .innerHTML = headerHTML;
}
