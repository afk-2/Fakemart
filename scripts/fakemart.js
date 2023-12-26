import {productsDeals, productsGroceries ,productsElectronics, productsHome_Living} from '../data/products.js';
import {cart, addToCart, calculateCartQuantity} from '../data/cart.js';
import { formatCurrency } from './utils/money.js';
import { renderHeader } from './header.js';

renderHeader();

// DISPLAY PRODUCTS
let productsHTML;

//TOP DEALS & PROMOTIONS
productsHTML = '';

generateProductsHTML(productsDeals);

document.querySelector('.js-deals-container')
  .innerHTML = productsHTML;

// GROCERIES & ESSENTIALS
productsHTML = '';

generateProductsHTML(productsGroceries);

document.querySelector('.js-groceries-container')
  .innerHTML = productsHTML;

// ELECTRONICS
productsHTML = '';

generateProductsHTML(productsElectronics);

document.querySelector('.js-electronics-container')
  .innerHTML = productsHTML;

// HOME & LIVING
productsHTML = '';

generateProductsHTML(productsHome_Living);

document.querySelector('.js-home-living-container')
  .innerHTML = productsHTML;

// Add Product Button
document.querySelectorAll('.add-product-button')
  .forEach((button) => {
    let {productId} = button.dataset;

    button.addEventListener('click', () => {
      addToCart(productId);
      renderHeader();
    });
  });


// Generate ProductsHTML Function
function generateProductsHTML(products) {
  products.forEach((product) => {
    productsHTML += `
      <div class="product-card">
        <div class="product-img-container">
          <img class="product-thumbnail" src="${product.thumbnail}">
          <div class="js-discount-tag discount-tag">${product.discount}%</div>
        </div>
        <div class="product-price">
          SAR
          <span class="current-price">
            ${formatCurrency(product.currentPriceCents)}
          </span>
          <span class="actual-price">
            ${formatCurrency(product.actualPriceCents)}
          </span>
        </div>
        <div class="product-name">
          ${product.name}
        </div>
        <div class="add-to-cart-container">
          <select class="quantity-selector js-quantity-selector-${product.id}">
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
          <button class="add-product-button button-primary"
          data-product-id="${product.id}">
            +
          </button> 
        </div>
      </div>
    `;

    hideTag(product.discount);
  });
}

// Slideshow
const productsContainer = document.querySelectorAll('.products-container');

const prevButton = document.querySelectorAll('.js-prev-button');
const nextButton = document.querySelectorAll('.js-next-button');

productsContainer.forEach((item, i) => {
  let containerDimensions = item.getBoundingClientRect();
  let containerWidth = containerDimensions.width;
  
  nextButton[i].addEventListener('click', () => {
    item.scrollLeft += containerWidth;
  })

  prevButton[i].addEventListener('click', () => {
    item.scrollLeft -= containerWidth;
  })
});

// Hide Tag
function hideTag(discount) {
  document.querySelectorAll('.js-discount-tag')
    .forEach((tag) => {
      if (tag.innerHTML === '0%') {
        tag.classList.replace('discount-tag', 'hide-tag');
      }
    });
}