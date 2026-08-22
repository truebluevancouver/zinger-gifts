(() => {
  const croppedProductIds = new Set([6, 7, 8]);
  const positions = {
    6: '100% 100%',
    7: '100% 58%',
    8: '0% 100%'
  };

  const style = document.createElement('style');
  style.textContent = `
    .product-card.zg-photo-crop .product-photo,
    .modal-image.zg-photo-crop,
    .cart-thumb.zg-photo-crop {
      overflow: hidden;
      position: relative;
      background: #fff;
    }
    .product-card.zg-photo-crop .product-photo img,
    .modal-image.zg-photo-crop img,
    .cart-thumb.zg-photo-crop img {
      width: 100%;
      height: 100%;
      max-width: none;
      max-height: none;
      object-fit: none;
      transform: none !important;
      image-rendering: auto;
    }
    .modal-image.zg-photo-crop { padding: 0; min-height: 520px; }
    @media (max-width: 700px) {
      .modal-image.zg-photo-crop { min-height: 390px; }
    }
  `;
  document.head.appendChild(style);

  function applyPosition(img, id) {
    if (img && croppedProductIds.has(id)) img.style.objectPosition = positions[id] || '50% 50%';
  }

  function markProductCards() {
    document.querySelectorAll('.product-card').forEach((card, index) => {
      const p = products[index];
      if (!p || !croppedProductIds.has(p.id)) return;
      card.classList.add('zg-photo-crop');
      applyPosition(card.querySelector('.product-photo img'), p.id);
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
    if (modalImage && croppedProductIds.has(id)) {
      modalImage.classList.add('zg-photo-crop');
      applyPosition(modalImage.querySelector('img'), id);
    }
  };

  const baseRenderCart = window.renderCart;
  window.renderCart = function () {
    baseRenderCart();
    document.querySelectorAll('.cart-item').forEach((item, index) => {
      const p = cart[index];
      const thumb = item.querySelector('.cart-thumb');
      if (thumb && p && croppedProductIds.has(p.id)) {
        thumb.classList.add('zg-photo-crop');
        applyPosition(thumb.querySelector('img'), p.id);
      }
    });
  };

  markProductCards();
})();