# Country Explorer App

A full-stack web application for exploring countries around the world using the **REST Countries API**.  
This project goes beyond a simple API fetch by introducing **server-side caching, live search, filtering, and clean UI-driven navigation**, all built with **Node.js, Express, EJS, and modern JavaScript**.

The app is designed as a **learning-focused capstone project**, emphasizing clarity, performance, and real-world patterns rather than overengineering.

---

## Key Features

### Home Page (All-in-One Explorer)
- Loads **all countries on first page load**
- Displays countries as responsive cards (flag, name, capital, population)
- **Live search** by country name (auto-updates as you type)
- **Region filtering** (Africa, Americas, Asia, Europe, Oceania)
- Search and region filters work **together**
- Clicking a country card navigates to the detailed country page

---

### Server-Side Caching
- All country data is fetched **once on server startup**
- Data is stored in an in-memory cache
- Cache refreshes automatically every **24 hours**
- All searches and filters run **against cached data**, not repeated API calls

This dramatically improves performance and reduces API dependency.

---

### Live Search (Client-Side)
- Implemented with **vanilla JavaScript**
- Uses a dedicated `/search` endpoint
- Debounced input handling
- Filters by:
  - Country name
  - Region
- Displays instant feedback (including “no match” state)

---

### Country Details Page
For a selected country, the app displays:

- SVG flag (uncropped, responsive)
- Common & official name
- Capital
- Region & subregion
- Population (formatted)
- Languages
- Currencies
- Neighboring countries:
  - Clickable cards
  - Flag + country name
- Back button for smooth navigation

All country and neighbor data is resolved **from cache**, not refetched.

---

### Error Handling
- Graceful **404 page** for:
  - Invalid routes
  - Invalid country searches
- User-friendly error messages instead of raw errors

---

## 🛠️ Tech Stack

- **Node.js**
- **Express**
- **EJS** (server-side rendering)
- **Axios** (API requests)
- **ES Modules** (no CommonJS)
- **Vanilla JavaScript** (live search)
- **CSS Grid & Flexbox**
- **REST Countries API (v3.1)**

---

## API Usage

**REST Countries API**
- Country names
- Flags (SVG preferred)
- Population data
- Regions & subregions
- Languages & currencies
- Borders (neighboring countries)

Only required fields are requested to keep responses lightweight.

---

## Architecture & Design Decisions

- **Single source of truth**: cached country dataset
- **Query-based URLs** for filtering and searching
- **SVG flags** for better quality and scaling
- **Minimal dependencies** to reinforce core concepts
- UI kept intentionally clean and extensible

---

## Learning Goals

This project demonstrates:
- Real-world Express app structure
- Server-side caching strategies
- Efficient API consumption
- Separation of concerns (routes, views, client JS)
- Progressive UI enhancement
- Clean, readable, beginner-friendly code

---

## Future Improvements (Optional)

- Embedded Google Maps
- Dark mode toggle
- Pagination or virtual scrolling
- Client-side caching (localStorage)
- API error retry logic

---

## Author

**Emran Talukder**  
Built as a capstone-style learning project while following Angela Yu’s Web Development course, with additional custom architecture and improvements.

---

Happy coding 
Build slowly, understand deeply, and improve intentionally.