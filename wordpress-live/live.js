/* Zinger Gifts WordPress live overrides.
   Routine front-end tweaks can be shipped here without reinstalling the theme. */
(() => {
  const blocked = new Set(['blog','get free','products']);
  document.querySelectorAll('.site-header .nav a').forEach((link) => {
    const label = (link.textContent || '').trim().toLowerCase();
    const path = (new URL(link.href, window.location.origin)).pathname.replace(/^\/+|\/+$/g,'').toLowerCase();
    const slug = path.split('/').pop();
    if (blocked.has(label) || ['blog','get-free','products'].includes(slug)) {
      const li = link.closest('li');
      (li || link).remove();
    }
  });
})();
