# Agent guide

This repository is a static moving sale catalog intended for GitHub Pages. Keep it build-free unless the owner explicitly asks for a framework. The source of truth for published listings is `data/items.js`; `Move.xlsx` and `products pictures/` are local reference files and are intentionally ignored by Git.

## Editing rules

- Add, update, or remove products in `window.SALE_ITEMS`. Keep IDs unique and `amount` numeric so price sorting works.
- Items with `status: 'sold'` stay visible in the catalog with a SOLD label. Keep sold items at the end of search and sort results, and hide their inquiry and sale-listing actions.
- Preserve user-provided prices, quantities, measurements, conditions, and URLs. Do not invent availability, contact details, location, or pickup terms.
- Use relative paths for local images so the site works under a GitHub Pages repository path. Keep images reasonably compressed and avoid publishing original photo metadata.
- Distinguish supplier photos from photos of the actual item with `supplierPhoto: true`.
- If a listing has no image, use `images: []`; the page supplies a placeholder.
- Keep the page accessible: semantic controls, keyboard use of the dialog/gallery, meaningful image alt text, and visible focus styles.
- Keep `.nojekyll` and the root `index.html` for branch-based GitHub Pages publishing.

## Checks after changes

Open `index.html` and verify the affected card, its detail dialog, gallery, category filter, search, and responsive layout. Check that every local image path in `data/items.js` exists. Do not publish the ignored workbook or original photo folder.
