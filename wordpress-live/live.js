/* Zinger Gifts WordPress live overrides.
   Routine front-end tweaks can be shipped here without reinstalling the theme. */
(() => {
  const blockedLabels = new Set(['blog','get free','get free1','products']);
  const blockedSlugs = new Set(['blog','get-free','get-free1','products']);

  const nav = document.querySelector('.site-header .nav');
  if (!nav) return;

  // Remove unwanted menu items from any WordPress-assigned menu.
  nav.querySelectorAll('a').forEach((link) => {
    const label = (link.textContent || '').trim().toLowerCase();
    const url = new URL(link.href, window.location.origin);
    const path = url.pathname.replace(/^\/+|\/+$/g,'').toLowerCase();
    const slug = path.split('/').pop();
    if (blockedLabels.has(label) || blockedSlugs.has(slug)) {
      const li = link.closest('li');
      (li || link).remove();
    }
  });

  // Force Shop to the WooCommerce shop page instead of a homepage anchor.
  nav.querySelectorAll('a').forEach((link) => {
    const label = (link.textContent || '').trim().toLowerCase();
    if (label === 'shop') {
      link.href = new URL('/shop/', window.location.origin).href;
    }
  });

  // Force Contact to its own page instead of a homepage section/anchor.
  nav.querySelectorAll('a').forEach((link) => {
    const label = (link.textContent || '').trim().toLowerCase();
    if (label === 'contact') {
      link.href = new URL('/contact/', window.location.origin).href;
    }
  });

  // Ensure Shop and Contact exist in the nav even if WordPress omitted them.
  const labels = new Set([...nav.querySelectorAll('a')].map(a => (a.textContent || '').trim().toLowerCase()));
  const addNavItem = (label, path) => {
    const a = document.createElement('a');
    a.textContent = label;
    a.href = new URL(path, window.location.origin).href;
    nav.appendChild(a);
  };
  if (!labels.has('shop')) addNavItem('Shop', '/shop/');
  if (!labels.has('contact')) addNavItem('Contact', '/contact/');
})();
