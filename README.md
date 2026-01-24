---

# The Slice X

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)


**The Slice X** is a premium online real estate marketplace for buying, selling, and exploring land properties. Designed to offer an elegant, user-friendly, and modern experience, it makes property discovery seamless and reliable.

![The Slice X Logo](public/logo.png)

---

## 🌐 Website

[Visit The Slice X](https://www.theslicex.com)

---

## 📌 Features

### 1. Elegant Property Search
- Filter by **state, district, mandal, village**.
- Real-time search with smooth, responsive UI.
- Premium mobile-first design inspired by modern apps.

**Animated GIF Preview:**  
![Search Animation](public/gifs/search-bar.gif)

---

### 2. Property Listings
- High-quality images with gallery view.
- Display price in **Lakhs/Cr**.
- Seller and owner contact details with optional reveal.

**Animated GIF Preview:**  
![Listings Animation](public/gifs/listings.gif)

---

### 3. Wheel-like Pagination
- Smooth horizontal scroll with **center-highlight effect**.
- Interactive and visually appealing.

**Animated GIF Preview:**  
![Wheel Pagination Animation](public/gifs/wheel-pagination.gif)

---

### 4. Mobile Responsive View
- Fully optimized for small screens.
- Clean, readable fonts and intuitive layout.

**Animated GIF Preview:**  
![Mobile View Animation](public/gifs/mobile-view.gif)

---

## 🛠 Tech Stack

- **Frontend:** Next.js 13, React 18  
- **Styling:** TailwindCSS  
- **Icons:** React Icons, Lucide-React  
- **Backend:** Supabase  
- **Deployment:** Vercel  

---

## 📂 Project Structure

```text
frontend/
├─ app/
│  ├─ page.tsx
│  ├─ layout.tsx
│  └─ globals.css
├─ components/
│  ├─ Header.tsx
│  ├─ Footer.tsx
│  └─ ContactReveal.tsx
├─ lib/
│  └─ supabaseClient.ts
├─ public/
│  ├─ logo.png
│  ├─ favicon.png
│  ├─ gifs/
│  │  ├─ search-bar.gif
│  │  ├─ listings.gif
│  │  ├─ wheel-pagination.gif
│  │  └─ mobile-view.gif
├─ package.json
└─ README.md
````

---

## ⚡ Installation

1. Clone the repo:

```bash
git clone https://github.com/srinugalla/the-slice-x.git
cd the-slice-x/frontend
```

2. Install dependencies:

```bash
npm install
```

3. Setup environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the dev server:

```bash
npm run dev
```

Visit `http://localhost:3000`.

---

## 🚀 Deployment

Optimized for **Vercel**:

```bash
vercel
```

---

## 🎨 Design Inspiration

Inspired by **premium real estate websites** like:

* [FullScale.ie](https://fullscale.ie)
* Modern mobile-first apps with smooth animations and minimal design.

---

## 📞 Contact

For support or inquiries:

* Email: [support@theslicex.com](mailto:support@theslicex.com)
* Website: [https://www.theslicex.com](https://www.theslicex.com)

---

## 💡 Future Enhancements

* Hamburger menu on mobile
* Favorites/Wishlist
* User Authentication & Profiles
* Interactive Map View
* Dark Mode Toggle

---

## ⚖️ License

MIT License © 2026 [The Slice X](https://www.theslicex.com)

