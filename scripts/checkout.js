import {calculateCartQuantity} from '../data/cart.js';
import { renderHeader } from './header.js';
import { renderOrderSummary } from './checkout/orderSummary.js';

renderHeader();
renderCheckoutTitle();
renderOrderSummary();

export function renderCheckoutTitle() {
  const cartQuantity = calculateCartQuantity();

  const checkoutTitleHTML= `
    Cart ( <span class="display-cart-quantity js-display-cart-quantity">${cartQuantity}</span> )
  `;

  document.querySelector('.js-checkout-title')
    .innerHTML = checkoutTitleHTML;
}



  


