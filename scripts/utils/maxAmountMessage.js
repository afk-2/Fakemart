let maxAmountMessageTimeoutId;

// Max Amount Added Message Visibility
export function displayMaxAmountMessage(productId) {
  const maxAmountMessage = document.querySelector(`.js-max-amount-message-${productId}`);

  maxAmountMessage.classList.add("max-amount-message-visible");

  if (maxAmountMessageTimeoutId) {
    clearTimeout(maxAmountMessageTimeoutId);
  }

  const timeoutId = setTimeout(() => {
    maxAmountMessage.classList.remove("max-amount-message-visible");
  }, 2000);

  maxAmountMessageTimeoutId = timeoutId;
}