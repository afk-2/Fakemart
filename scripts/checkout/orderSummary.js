import { renderHeader } from '../header.js';
import { renderCheckoutTitle } from '../checkout.js';
import {saveToStorage, addToCart, cart, removeFromCart} from '../../data/cart.js';
import {productsDeals, productsGroceries, productsElectronics, productsHome_Living } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import { displayMaxAmountMessage } from '../utils/maxAmountMessage.js';

export function renderOrderSummary() {
  // Generating Order Summary HTML
  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    let matchingProduct;

    productsDeals.forEach((product) => {
      if (product.id === productId) {
        matchingProduct = product;
      }
    });

    productsGroceries.forEach((product) => {
      if (product.id === productId) {
        matchingProduct = product;
      }
    });

    productsElectronics.forEach((product) => {
      if (product.id === productId) {
        matchingProduct = product;
      }
    });

    productsHome_Living.forEach((product) => {
      if (product.id === productId) {
        matchingProduct = product;
      }
    });

    cartSummaryHTML += `
      <div class="product-container js-product-container-${matchingProduct.id}">
        <div class="image-container">
          <img class="product-image" src="${matchingProduct.thumbnail}">
        </div>


        <div class="product-details">
          <div class="product-name">
          ${matchingProduct.name}
          </div>

          <div class="product-price">
            SAR <span class="price">${formatCurrency(matchingProduct.currentPriceCents)}</span>
          </div>

          <div class="update-quantity">
            <div class="select-quantity">
              <button class="decrement-quantity-button button-primary"
              data-product-id="${matchingProduct.id}">
                <i class="fa fa-trash-o delete-icon" aria-hidden="true"></i>
              </button>
              <select class="quantity-selector js-quantity-selector" data-product-id="${matchingProduct.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
              <button class="increment-quantity-button button-primary"
              data-product-id="${matchingProduct.id}">
                +
              </button>
            </div>

            <button class="remove-product js-remove-product"
            data-product-id="${matchingProduct.id}">
              <i class="fa fa-trash-o delete-icon" aria-hidden="true"></i>
              Remove product
            </button>
        </div>

        <div class="max-amount-message js-max-amount-message-${matchingProduct.id}">Maximum amount added</div>
      </div>


      <div class="delivery-options">
        <p class="delivery-options-title">
          Choose a delivery option
        </p>

        <div class="delivery-option">
          <input type="radio" class="delivery-option-input" name="delivery-option">
          <div>
            <div class="delivery-option-date">
              Tuesday, June 21
            </div>
            <div class="delivery-option-price">
              FREE Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio" class="delivery-option-input" name="delivery-option">
          <div>
            <div class="delivery-option-date">
              Wednesday, June 15
            </div>
            <div class="delivery-option-price">
              SAR 4.99 - Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio" class="delivery-option-input" name="delivery-option">
          <div>
            <div class="delivery-option-date">
              Monday, June 13
            </div>
            <div class="delivery-option-price">
              SAR 9.99 - Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
  });

  document.querySelector('.js-checkout-products-container')
      .innerHTML = cartSummaryHTML;

  // Increment Quantity Button
  document.querySelectorAll('.increment-quantity-button')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const {productId} = button.dataset;

        
        updateSelectorValue();
        renderHeader();
        renderCheckoutTitle();
        renderOrderSummary();
        incrementCartQuantity(productId);
      });
    });

    function incrementCartQuantity(productId) {
      cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          if (cartItem.quantity < 10) {
            cartItem.quantity++;
          } else {
            displayMaxAmountMessage(productId);
          }
    
          saveToStorage();
        }
      });
    }

  // Decrement Quantity Button
  document.querySelectorAll('.decrement-quantity-button')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const {productId} = button.dataset;

        decrementCartQuantity(productId);
        updateSelectorValue();
        renderHeader();
        renderCheckoutTitle();
        renderOrderSummary();
      });
    });
    
    function decrementCartQuantity(productId) {
      cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          if (cartItem.quantity > 1) {
            cartItem.quantity--;
            saveToStorage();
          }
          else if (cartItem.quantity === 1) {
            removeFromCart(productId);
          }
        }
      });
    }

  // Remove Product Button
  document.querySelectorAll('.js-remove-product')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const {productId} = button.dataset;

        removeFromCart(productId);
        renderHeader();
        renderCheckoutTitle();
        renderOrderSummary();
      });
    });

  // Quantity Selector
  function updateSelectorValue() {
    document.querySelectorAll('.js-quantity-selector')
    .forEach((selector) => {
      const {productId} = selector.dataset;

      cart.forEach((cartItem) => {
        // Update Selector Value
        if (productId === cartItem.productId) {
          selector.value = cartItem.quantity;
        }
      });
    });
  }
  updateSelectorValue();
}

document.querySelectorAll('.decrement-quantity-button')
  .forEach((price) => {
    price.addEventListener('click', () => {
      console.log(1);
    })
  });