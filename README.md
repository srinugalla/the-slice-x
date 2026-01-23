<p align="center">
  <a href="https://the-slice-x.vercel.app">
    <img src="https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel">
  </a>
  <img src="https://img.shields.io/badge/Next.js-13.4-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js">
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.3-blue?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/TypeScript-4.9-blue?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Supabase-Red?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase">
</p>

````markdown
# The Slice X 🏡

**The Slice X** is a modern real estate web application for browsing and discovering trusted land and property listings. Users can filter by location, view property details, and contact owners/agents directly via WhatsApp.

---

## 🌟 Features

- **Dynamic Listings:** Browse thousands of land properties with images, prices, and area details.  
- **Advanced Filters:** Filter by state, district, mandal, or search by village/keywords.  
- **Property Modal:** Click any property to view full details and all images.  
- **WhatsApp Integration:** Contact property owners/agents directly.  
- **Responsive Design:** Fully mobile and tablet-friendly.  
- **Fast & Optimized:** Lazy-loaded images for performance.  
- **Pagination & Infinite Scrolling Ready:** Handle thousands of listings smoothly.

---

## 🎨 Technology Stack

| Frontend           | Backend / DB      | Deployment            |
|-------------------|-----------------|----------------------|
| Next.js 16.1.4    | Supabase         | Vercel / Hostinger   |
| TypeScript        | PostgreSQL       | Tailwind CSS         |
| React Icons       |                 |                      |

---

## 🚀 Live Demo

🌐 [View Slice X Live](https://the-slice-x.vercel.app)  

---

## 🏗 Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn
- Supabase account
- Git

### Installation

1. Clone the repository:

```bash
git clone https://github.com/srinugalla/the-slice-x.git
cd the-slice-x
````

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Configure environment variables:

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Structure

```
/app
  page.tsx          # Main homepage with listings & modal
/lib
  supabaseClient.ts # Supabase client config
/components         # Optional reusable UI components
/public             # Static assets
```

---

## 🖼 Screenshots

| Home Page                     | Property Modal                  |
| ----------------------------- | ------------------------------- |
| ![Home](screenshots/home.png) | ![Modal](screenshots/modal.png) |

*Replace `screenshots/` with actual screenshots.*

---

## ⚡ Deployment

**Vercel Deployment (Recommended for Next.js):**

1. Push your repo to GitHub.
2. Go to [Vercel](https://vercel.com/) → Import your GitHub repo.
3. Vercel auto-detects Next.js and deploys.
4. Add your custom domain (Hostinger domain) in Vercel settings.
5. Update DNS records in Hostinger according to Vercel instructions.

✅ Automatic SSL included.

---

## 💡 Future Enhancements

* Infinite scroll for seamless browsing of 10k+ listings
* User authentication (save favorites, track searches)
* Seller dashboard to add/edit listings
* Market insights with charts (price, area trends)
* Notifications when new properties are added

---

## 📞 Contact

* **Owner:** Srinugalla
* **GitHub:** [https://github.com/srinugalla](https://github.com/srinugalla)
* **Project Repo:** [https://github.com/srinugalla/the-slice-x](https://github.com/srinugalla/the-slice-x)

---

## 📝 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

**The Slice X** — Trusted properties you can rely on. 🏡
