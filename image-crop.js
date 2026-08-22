(() => {
  const croppedProductIds = new Set([6, 7, 8]);

  const style = document.createElement('style');
  style.textContent = `
    .product-card.zg-photo-crop .product-photo { overflow: hidden; position: relative; background: #fff; }
    .product-card.zg-photo-crop .product-photo img {
      width: 100%;
      height: 100%;
      max-width: none;
      object-fit: cover;
      object-position: 50% 40%;
      transform: scale(1.28);
      transform-origin: 50% 40%;
      image-rendering: auto;
    }
    .modal-image.zg-photo-crop { overflow: hidden; position: relative; padding: 0; min-height: 520px; background: #fff; }
    .modal-image.zg-photo-crop img {
      width: 100%;
      height: 100%;
      max-width: none;
      max-height: none;
      object-fit: cover;
      object-position: 50% 40%;
      transform: scale(1.15);
      transform-origin: 50% 40%;
      image-rendering: auto;
    }
    .cart-thumb.zg-photo-crop { overflow: hidden; }
    .cart-thumb.zg-photo-crop img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: 50% 40%;
      transform: scale(1.2);
      transform-origin: 50% 40%;
      image-rendering: auto;
    }
    @media (max-width: 700px) {
      .product-card.zg-photo-crop .product-photo img { transform: scale(1.22); }
      .modal-image.zg-photo-crop { min-height: 390px; }
      .modal-image.zg-photo-crop img { transform: scale(1.10); }
    }
  `;
  document.head.appendChild(style);

  function markProductCards() {
    document.querySelectorAll('.product-card').forEach((card, index) => {
      const p = products[index];
      if (p && croppedProductIds.has(p.id)) card.classList.add('zg-photo-crop');
    });
  }

  const baseRenderProducts = window.renderProducts;
  window.renderProducts = function () {
    baseRenderProducts();
    markProductCards();
  };

  const baseShowDetails = window.showDetails;
  window.showDetails = function (id) {
    baseShowDetails(id);
    const modalImage = document.querySelector('#productModal .modal-image');
    if (modalImage && croppedProductIds.has(id)) modalImage.classList.add('zg-photo-crop');
  };

  const baseRenderCart = window.renderCart;
  window.renderCart = function () {
    baseRenderCart();
    document.querySelectorAll('.cart-item').forEach((item, index) => {
      const p = cart[index];
      const thumb = item.querySelector('.cart-thumb');
      if (thumb && p && croppedProductIds.has(p.id)) thumb.classList.add('zg-photo-crop');
    });
  };

  markProductCards();
})();