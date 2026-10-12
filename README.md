# Moving out selling good stuff

A small, build-free moving sale catalog for GitHub Pages. The site is plain HTML, CSS, and JavaScript, so there is no package install or build step.

## Edit the listings

Open [`data/items.js`](data/items.js). Each object in `window.SALE_ITEMS` is one item. Change a price or description there, delete an object to remove an item, or copy one to add a new listing. Keep each `id` unique. The card order follows the array order; visitors can also filter, search, and sort.

```js
{
  id: 'small-desk',
  title: 'Small desk',
  category: 'Bedroom',
  price: '€25',
  amount: 25,
  size: '80 × 50 × 75',
  images: ['assets/images/small-desk-01.jpg'],
  sourceRow: 40
},
```

`price` is the text shown to visitors; `amount` is the number used for price sorting. `size`, `condition`, `reference` (original product page), and `listing` (a sale listing) are optional. Add `status: 'sold'` inside an item's `{ ... }` entry to keep it visible with a SOLD label. The food dehydrator entry is an example. Remove the `status` property if the item is available again. Use `images: []` when there is no photo. `sourceRow` records the original row in the `SellGive` sheet and can be omitted for new items.

Put new photos in `assets/images/` and list their relative paths in the item. Existing local photos were resized by [`tools/prepare-images.ps1`](tools/prepare-images.ps1); if you still have the original `products pictures/` folder, you can run that script again in PowerShell. It also writes `assets/images/manifest.json` to help find the generated names. The four motor photos were downloaded from their linked supplier product pages and are marked as supplier photos.

The names and phone numbers shown on the page are in `window.SALE_CONFIG.contacts` near the top of `data/items.js`. Each item also offers a **Copy inquiry** button so a visitor can paste a message into a text conversation.

The page requests a fresh copy of `data/items.js` when it loads, so sold-status updates should appear after a normal reload once GitHub Pages has published the new commit. A browser may still briefly cache `index.html` itself after this loader changes; a hard refresh resolves that initial transition.

## Preview locally

In PowerShell, from this folder, run:

```powershell
node tools/serve.mjs
```

Open <http://127.0.0.1:4173> in your browser. Press **Ctrl+C** in PowerShell when finished. No dependencies or installation are needed beyond Node.js. You can also double-click `index.html` for a quick look, but the local server is better for checking links and the copy button.

## Publish with GitHub Pages

1. Create a GitHub repository and upload the site files, including `index.html`, `styles.css`, `script.js`, `data/`, `assets/`, and `.nojekyll`. The original workbook and source photo folder are excluded by `.gitignore`.
2. In the repository, open **Settings → Pages**. Under **Build and deployment**, select **Deploy from a branch**.
3. Select your published branch (usually `main`) and **/(root)**, then save. GitHub will show the site's URL on that page.

This follows [GitHub's branch publishing instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site). GitHub Pages sites are public, so review all listing details and photos before publishing.

## Files

- `index.html` — page structure
- `styles.css` — visual design and responsive layout
- `script.js` — filters, search, sorting, and photo galleries
- `data/items.js` — editable listings and optional contact URL
- `assets/images/` — optimized display photos
- `AGENT.md` — maintenance notes for future coding agents
