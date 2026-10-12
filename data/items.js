// Edit this array to add, remove, or update listings. See README.md for examples.
// Photo paths are relative to index.html. Empty images arrays use a styled placeholder.
const localPhotos = (name, count) => Array.from(
  { length: count },
  (_, index) => `assets/images/${name}-${String(index + 1).padStart(2, '0')}.jpg`
);

window.SALE_CONFIG = {
  title: 'The Moving Edit',
  contacts: [
    { name: 'Smadar', phone: '+49 176 32853378' },
    { name: 'Lior', phone: '+49 176 32527182' }
  ]
};

window.SALE_ITEMS = [
  { id: 'sideboard', title: 'Vintage-style sideboard', category: 'Living room', price: '€30', amount: 30, size: '42 × 180 × 80', images: localPhotos('comodor-livingroom-big', 3), listing: 'https://www.kleinanzeigen.de/s-anzeige/cabinet-vintage-style-sideboard/3539158893-88-9290', sourceRow: 10 },
  { id: 'dining-table', title: 'Dining table', category: 'Living room', price: '€30', amount: 30, size: '80 × 180 × 75', images: localPhotos('dining-table', 8), sourceRow: 14 },
  { id: 'armchairs', title: 'Armchairs · set of 2', category: 'Living room', price: '€15 each', amount: 15, size: '60 × 65 × 80', images: localPhotos('armchairs-x-2', 4), sourceRow: 13 },
  { id: 'bed', title: 'Bed frame', category: 'Bedroom', price: '€75', amount: 75, size: '167 × 209 × 100', images: localPhotos('bed', 4), reference: 'https://www.ikea.com/de/de/p/malm-bettgestell-hoch-weiss-s09929373/', sourceRow: 25 },
  { id: 'lamp', title: 'Lamp', category: 'Living room', price: '€5', amount: 5, images: localPhotos('lamp', 2), sourceRow: 11 },
  { id: 'wooden-shelves', title: 'Wooden shelves + hangers · 3', category: 'Living room', price: '€5 each', amount: 5, size: '21 × 180; 21 × 80; 21 × 80', images: localPhotos('wooden-shelves-hangers-x-3', 4), sourceRow: 12 },
  { id: 'black-chairs', title: 'Black chairs · set of 2', category: 'Living room', price: '€5 each', amount: 5, size: '43 × 49 × 79', images: localPhotos('black-chairs-x-2', 3), sourceRow: 15 },
  { id: 'wooden-chairs', title: 'Wooden chairs · set of 2', category: 'Living room', price: '€5 each', amount: 5, size: '47 × 46 × 83', images: localPhotos('chairs-x-2', 3), sourceRow: 16 },
  { id: 'green-footstool', title: 'Green footstool', category: 'Living room', price: '€10', amount: 10, size: '50 × 38 × 45', images: localPhotos('footstoolgreen', 3), sourceRow: 17 },
  { id: 'cushions', title: 'Cushions · 6 available', category: 'Living room', price: '€2 each', amount: 2, images: localPhotos('cussions-x-6', 2), sourceRow: 18 },
  { id: 'coffee-table', title: 'Coffee table', category: 'Living room', price: '€5', amount: 5, size: '90 × 45 × 46', images: localPhotos('coffee-table', 4), sourceRow: 19 },
  { id: 'footstools', title: 'Round footstools · set of 2', category: 'Living room', price: '€5', amount: 5, size: 'R 27', images: localPhotos('footstool-x-2', 1), sourceRow: 20 },
  { id: 'wardrobe', title: 'Large wardrobe', category: 'Bedroom', price: '€200', amount: 200, size: '64 × 300 × 240', images: localPhotos('large-closet', 3), sourceRow: 22 },
  { id: 'white-dresser', title: 'White dresser', category: 'Bedroom', price: '€40', amount: 40, size: '40 × 140 × 72', images: localPhotos('comodor-white', 3), reference: 'https://www.ikea.com/de/de/p/kullen-kommode-mit-6-schubladen-weiss-90309245/', sourceRow: 23 },
  { id: 'blue-dresser', title: 'Blue dresser', category: 'Bedroom', price: '€75', amount: 75, size: '108 × 50 × 96', images: localPhotos('comodor-blue', 4), reference: 'https://www.ikea.com/de/de/p/hemnes-kommode-mit-3-schubladen-graugruen-hellbraun-lasiert-70610738/', sourceRow: 24 },
  { id: 'bathroom-cabinet-1', title: 'Bathroom wall cabinet', category: 'Bathroom', price: '€10', amount: 10, size: '60 × 40 × 38', images: localPhotos('bathroom-closet-1', 3), reference: 'https://www.ikea.com/de/de/p/metod-wandschrank-weiss-10205534/', sourceRow: 28 },
  { id: 'bathroom-cabinet-2', title: 'Bathroom cabinet with door', category: 'Bathroom', price: '€40', amount: 40, size: '60 × 40 × 64', images: localPhotos('bathroom-closet-2', 3), reference: 'https://www.ikea.com/de/de/p/besta-regal-mit-tuer-weiss-kallviken-hellgrau-s99425009/', sourceRow: 29 },
  { id: 'hallway-drawers', title: 'Hallway shoe cabinets · 3', category: 'Hallway', price: '€10 × 3', amount: 10, condition: 'Good shape', images: localPhotos('plastic-drawers-hallway', 1), reference: 'https://www.ikea.com/de/en/p/trones-shoe-cabinet-storage-black-80397313/', sourceRow: 39 },
  { id: 'stepper', title: 'Stepper', category: 'Other', price: '€20', amount: 20, size: '40 × 59 × 42', images: localPhotos('stepper', 4), sourceRow: 26 },
  { id: 'bike-bags', title: 'Vaude bicycle bags · 2', category: 'Other', price: '€120 each', amount: 120, condition: 'Never used, in box', images: localPhotos('bicycle-begs-x-2', 2), reference: 'https://www.deporvillage.de/dreifach-radtasche-vaude-karakorum-schwarzgrau', sourceRow: 31 },
  { id: 'keyboard', title: 'Yamaha PSR-E373 keyboard', category: 'Other', price: '€100', amount: 100, condition: 'Good shape', images: localPhotos('yamaha-psr-e373-black-keyboard', 5), reference: 'https://www.amazon.de/-/en/dp/B08HN8K8PY?th=1', listing: 'https://www.kleinanzeigen.de/s-anzeige/yamaha-psr-e373-black-keyboard-portable-digital-keyboard-for-be/3539133949-74-9290', sourceRow: 36 },
  { id: 'guitar', title: 'Classical guitar', category: 'Other', price: '€80', amount: 80, condition: 'Good shape, hardly used', images: localPhotos('guitar', 4), reference: 'https://www.amazon.de/-/en/Ortega-Cedar-Mahogany-Classical-Guitar/dp/B00VGDPGDG', listing: 'https://www.kleinanzeigen.de/s-anzeige/mahogany-classical-guitar/3539129519-74-9290', sourceRow: 37 },
  { id: 'dehydrator', title: 'Food dehydrator', category: 'Other', price: '€30 VB', amount: 30, condition: 'Good shape, hardly used', images: localPhotos('food-dehydration-maschine', 3), listing: 'https://www.kleinanzeigen.de/s-anzeige/food-dehydrator-5-trays-stainless-steel-racks-touch-display-bp/3539150790-86-9290', sourceRow: 38 },
  { id: 'motor-nema17', title: 'NEMA 17 stepper motor · 26 Ncm', category: 'Other', price: '€7', amount: 7, condition: 'Never used, in box', images: ['assets/images/motor-nema17.jpg'], reference: 'https://www.omc-stepperonline.com/nema-17-bipolar-1-8deg-26ncm-36-8oz-in-0-4a-12v-42x42x34mm-4-wires-17hs13-0404s1', supplierPhoto: true, sourceRow: 32 },
  { id: 'motor-nema17-geared', title: 'NEMA 17 geared stepper motor · 5:1', category: 'Other', price: '€25', amount: 25, condition: 'Never used, in box', images: ['assets/images/motor-nema17-geared.jpg'], reference: 'https://www.omc-stepperonline.com/nema-17-stepper-motor-bipolar-l-33mm-w-gear-ratio-5-1-planetary-gearbox-17hs13-0404s-pg5', supplierPhoto: true, sourceRow: 33 },
  { id: 'motor-nema14', title: 'NEMA 14 stepper motor · 18 Ncm', category: 'Other', price: '€7', amount: 7, condition: 'Never used, in box', images: ['assets/images/motor-nema14.jpg'], reference: 'https://www.omc-stepperonline.com/nema-14-bipolar-1-8deg-18ncm-25-5oz-in-0-8a-5-4v-35x35x34mm-4-wires-14hs13-0804s', supplierPhoto: true, sourceRow: 34 },
  { id: 'motor-nema23', title: 'NEMA 23 stepper motor · 1.16 Nm', category: 'Other', price: '€12', amount: 12, condition: 'Never used, in box', images: ['assets/images/motor-nema23.jpg'], reference: 'https://www.omc-stepperonline.com/nema-23-bipolar-1-8deg-1-16nm-164-3oz-in-1-5a-5-4v-57x57x56mm-4-wires-23hs22-1504s', supplierPhoto: true, sourceRow: 35 },
  { id: 'plates', title: 'Plates', category: 'Kitchen', price: '€0–5', amount: 0, images: [], sourceRow: 2 },
  { id: 'glasses', title: 'Glasses', category: 'Kitchen', price: '€0–5', amount: 0, images: [], sourceRow: 3 },
  { id: 'oven-items', title: 'Oven items', category: 'Kitchen', price: '€0–5', amount: 0, images: [], sourceRow: 4 },
  { id: 'pots-pans', title: 'Pots and pans', category: 'Kitchen', price: '€0–5', amount: 0, images: [], sourceRow: 5 },
  { id: 'trash-bin', title: 'Trash bin', category: 'Kitchen', price: '€0–5', amount: 0, images: [], sourceRow: 6 },
  { id: 'kitchen-tools', title: 'Kitchen tools', category: 'Kitchen', price: '€0–5', amount: 0, images: [], sourceRow: 7 },
  { id: 'vases', title: 'Vases', category: 'Kitchen', price: '€0–5', amount: 0, images: [], sourceRow: 8 }
];
