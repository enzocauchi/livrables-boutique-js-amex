# 🚀 Cyberpunk 2077 Boutique - Quick Start

## Prerequisites
- Node.js (v14+)
- MySQL server running
- npm

## Installation

### 1. Backend Setup
```bash
cd backend
npm install
npm start
```

### 2. Frontend
Open `index.html` in browser or use live server

## Key Features

✅ **Responsive Design** - Mobile, Tablet, Desktop  
✅ **Stock Management** - Real-time availability  
✅ **Promotions** - Discount badges & pricing  
✅ **Address Saving** - Reuse delivery addresses  
✅ **Order Checkout** - Validation & confirmation  

## API Endpoints

- `GET /api/voitures` - All vehicles
- `GET /api/voiture/:id` - Vehicle details  
- `POST /api/commandes` - Create order

## Testing

### Mobile
Open DevTools → Toggle device toolbar → Test at 375px, 768px, 1024px

### Stock
Try adding out-of-stock item (should disable button)

### Checkout
1. Add items
2. Fill address
3. Click "Passer la commande"
4. See confirmation

## Files Modified

- 7 CSS files (responsive)
- 5 JS files (features)
- 1 HTML file (cart enhancements)
- 1 backend file (transactions)

**Status:** ✅ Complete & Production Ready

