"use strict";

const variants = {
  100: { label: "100 г", sku: "01306", price: 32640, oldPrice: 34920 },
  500: { label: "500 г", sku: "01307", price: 143200, oldPrice: 164600 },
  1000: { label: "1000 г", sku: "01308", price: 206400, oldPrice: 259200 },
  5000: { label: "5000 г", sku: "01309", price: 632000, oldPrice: 871000 },
};

const form = document.querySelector("#purchase-form");
const packaging = document.querySelector("#packaging");
const price = document.querySelector("#price");
const oldPrice = document.querySelector("#old-price");
const sku = document.querySelector("#sku");
const cartButton = document.querySelector("#cart-button");
const feedback = document.querySelector("#purchase-feedback");

// Храним цены в копейках, чтобы не ловить ошибки округления.
function formatPrice(kopecks) {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: kopecks % 100 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(kopecks / 100);
}

function selectedVariant() {
  const weight = form.querySelector('input[name="weight"]:checked').value;
  return variants[weight];
}

function updateVariant() {
  const variant = selectedVariant();
  price.textContent = formatPrice(variant.price);
  oldPrice.textContent = formatPrice(variant.oldPrice);
  sku.textContent = variant.sku;
  oldPrice.parentElement.hidden = variant.oldPrice <= variant.price;
  feedback.textContent = "";
}

packaging.addEventListener("change", updateVariant);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const variant = selectedVariant();
  feedback.textContent = `Выбрано: ${variant.label}, артикул ${variant.sku}, ${formatPrice(variant.price)}.`;
});

packaging.disabled = false;
cartButton.disabled = false;
updateVariant();
