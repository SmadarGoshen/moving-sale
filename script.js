const items = window.SALE_ITEMS || [];
const availableCount = items.filter(item => item.status !== 'sold').length;
const soldCount = items.length - availableCount;
const config = window.SALE_CONFIG || {};
const contacts = config.contacts || [];
const grid = document.querySelector('#item-grid');
const filters = document.querySelector('#filters');
const search = document.querySelector('#search');
const sort = document.querySelector('#sort');
const dialog = document.querySelector('#item-dialog');
let activeCategory = 'All';
let activeItem = null;
let activePhoto = 0;
let returnFocus = null;
let toastTimer;

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function placeholder(container, label = 'No photo yet') {
  container.replaceChildren(el('span', 'placeholder-icon', '✳'), el('span', 'placeholder-label', label));
  container.classList.add('item-card__visual--placeholder', 'dialog-image--placeholder');
}

function addPhoto(container, src, alt, supplier = false) {
  const image = el('img');
  image.src = src;
  image.alt = alt;
  image.loading = 'lazy';
  image.addEventListener('error', () => placeholder(container, 'Photo unavailable'), { once: true });
  container.append(image);
  if (supplier) container.classList.add('item-card__visual--supplier');
}

function card(item) {
  const sold = item.status === 'sold';
  const article = el('article', sold ? 'item-card item-card--sold' : 'item-card');
  const button = el('button', 'item-card__button');
  button.type = 'button';
  button.setAttribute('aria-label', sold ? `View ${item.title}, sold` : `View ${item.title}, ${item.price}`);
  button.addEventListener('click', () => openItem(item, button));
  const visual = el('div', 'item-card__visual');
  if (item.images?.length) {
    addPhoto(visual, item.images[0], item.title, item.supplierPhoto);
    if (item.images.length > 1) visual.append(el('span', 'photo-count', `${item.images.length} PHOTOS`));
    if (item.supplierPhoto) visual.append(el('span', 'supplier-tag', 'SUPPLIER PHOTO'));
  } else {
    placeholder(visual);
  }
  if (sold) visual.append(el('span', 'sold-tag', 'SOLD'));
  const body = el('div', 'item-card__body');
  body.append(el('p', 'item-card__category', item.category));
  const titleRow = el('div', 'item-card__title-row');
  titleRow.append(el('h3', '', item.title), el('p', 'item-card__price', item.price));
  body.append(titleRow);
  if (item.size || item.condition) body.append(el('p', 'item-card__meta', item.condition || `Measurements: ${item.size}`));
  button.append(visual, body);
  article.append(button);
  return article;
}

function renderFilters() {
  const categories = ['All', ...new Set(items.map(item => item.category))];
  filters.replaceChildren(...categories.map(category => {
    const button = el('button', 'filter', category);
    button.type = 'button';
    button.setAttribute('aria-pressed', String(category === activeCategory));
    button.addEventListener('click', () => {
      activeCategory = category;
      renderFilters();
      renderItems();
    });
    return button;
  }));
}

function renderContacts() {
  const list = document.querySelector('#contact-list');
  const inDialog = document.querySelector('#dialog-contacts');
  inDialog.append(el('p', '', 'Contact:'));
  for (const contact of contacts) {
    const href = `tel:${contact.phone.replace(/[^+\d]/g, '')}`;
    const card = el('div', 'contact-card');
    const cardPhone = el('a', 'contact-card__phone', contact.phone);
    cardPhone.href = href;
    cardPhone.setAttribute('aria-label', `Call ${contact.name} at ${contact.phone}`);
    card.append(el('p', 'contact-card__name', contact.name), cardPhone);
    list.append(card);

    const dialogPhone = el('a', '', `${contact.name}: ${contact.phone}`);
    dialogPhone.href = href;
    inDialog.append(dialogPhone);
  }
}

function renderItems() {
  const query = search.value.trim().toLocaleLowerCase();
  const matching = items.filter(item =>
    (activeCategory === 'All' || item.category === activeCategory) &&
    `${item.title} ${item.category} ${item.condition || ''} ${item.size || ''}`.toLocaleLowerCase().includes(query)
  );
  if (sort.value === 'price-low') matching.sort((a, b) => a.amount - b.amount);
  if (sort.value === 'price-high') matching.sort((a, b) => b.amount - a.amount);
  if (sort.value === 'name') matching.sort((a, b) => a.title.localeCompare(b.title));
  matching.sort((a, b) => Number(a.status === 'sold') - Number(b.status === 'sold'));
  grid.replaceChildren(...matching.map(card));
  document.querySelector('#result-count').textContent = `${matching.length} ${matching.length === 1 ? 'item' : 'items'} shown`;
  document.querySelector('#empty-state').hidden = matching.length !== 0;
}

function showPhoto() {
  const gallery = document.querySelector('#dialog-image');
  gallery.className = 'dialog-image';
  const photos = activeItem.images || [];
  if (!photos.length) {
    placeholder(gallery);
  } else {
    gallery.replaceChildren();
    addPhoto(gallery, photos[activePhoto], `${activeItem.title}, photo ${activePhoto + 1}`, activeItem.supplierPhoto);
    if (!activeItem.supplierPhoto) gallery.classList.add('dialog-image--photo');
  }
  const controls = document.querySelector('#gallery-controls');
  controls.hidden = photos.length < 2;
  document.querySelector('#gallery-count').textContent = `${activePhoto + 1} / ${photos.length}`;
}

function openItem(item, button) {
  activeItem = item;
  activePhoto = 0;
  returnFocus = button;
  document.querySelector('#dialog-category').textContent = item.category;
  document.querySelector('#dialog-title').textContent = item.title;
  const sold = item.status === 'sold';
  const price = document.querySelector('#dialog-price');
  price.replaceChildren(el('span', sold ? 'sold-price' : '', item.price));
  if (sold) price.append(el('span', 'dialog-sold-tag', 'SOLD'));
  const details = document.querySelector('#dialog-details');
  details.replaceChildren();
  if (item.size) addDetail(details, 'Measurements', item.size);
  if (item.condition) addDetail(details, 'Condition', item.condition);
  document.querySelector('#supplier-note').hidden = !item.supplierPhoto;
  const listing = document.querySelector('#listing-link');
  listing.hidden = sold || !item.listing;
  if (item.listing) listing.href = item.listing;
  const reference = document.querySelector('#reference-link');
  reference.hidden = !item.reference;
  if (item.reference) reference.href = item.reference;
  document.querySelector('#copy-inquiry').hidden = sold;
  document.querySelector('#dialog-contacts').hidden = sold;
  showPhoto();
  dialog.showModal();
}

function addDetail(list, name, value) {
  const row = el('div');
  row.append(el('dt', '', name), el('dd', '', value));
  list.append(row);
}

function closeItem() { dialog.close(); }

function toast(message) {
  const node = document.querySelector('#toast');
  node.textContent = message;
  node.classList.add('toast--show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => node.classList.remove('toast--show'), 3000);
}

async function copyInquiry() {
  const message = `Hi! I'm interested in ${activeItem.title} (${activeItem.price}) from your moving sale. Is it still available?`;
  try {
    await navigator.clipboard.writeText(message);
    toast('Inquiry copied. Send it to Smadar or Lior.');
  } catch {
    const input = el('textarea');
    input.value = message;
    input.style.position = 'fixed';
    input.style.opacity = '0';
    dialog.append(input);
    input.select();
    const copied = document.execCommand('copy');
    input.remove();
    toast(copied ? 'Inquiry copied. Send it to Smadar or Lior.' : 'Copying failed. Please mention the item name.');
  }
}

document.querySelector('#total-count').textContent = soldCount
  ? `${availableCount} available · ${soldCount} sold`
  : `${availableCount} items to explore`;
document.querySelector('#clear-filters').addEventListener('click', () => {
  activeCategory = 'All';
  search.value = '';
  sort.value = 'default';
  renderFilters();
  renderItems();
});
search.addEventListener('input', renderItems);
sort.addEventListener('change', renderItems);
document.querySelector('#dialog-close').addEventListener('click', closeItem);
dialog.addEventListener('click', event => { if (event.target === dialog) closeItem(); });
dialog.addEventListener('close', () => returnFocus?.focus());
document.querySelector('#gallery-prev').addEventListener('click', () => { activePhoto = (activePhoto - 1 + activeItem.images.length) % activeItem.images.length; showPhoto(); });
document.querySelector('#gallery-next').addEventListener('click', () => { activePhoto = (activePhoto + 1) % activeItem.images.length; showPhoto(); });
document.querySelector('#copy-inquiry').addEventListener('click', copyInquiry);
dialog.addEventListener('keydown', event => {
  if (!activeItem?.images?.length) return;
  if (event.key === 'ArrowLeft') { activePhoto = (activePhoto - 1 + activeItem.images.length) % activeItem.images.length; showPhoto(); }
  if (event.key === 'ArrowRight') { activePhoto = (activePhoto + 1) % activeItem.images.length; showPhoto(); }
});
renderFilters();
renderContacts();
renderItems();
