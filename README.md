# 🕒 WorkSynce

**WorkSynce** is a modern, intuitive **Leave & Workforce Management System** built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**.  
It helps teams manage time-off requests, approvals, and scheduling effortlessly — bringing balance and clarity to every workplace.

---

## 🚀 Features

### 🧭 Core Functionality
- 🌤 **Smart Leave Management** — Create, edit, and track employee leave requests.
- 📅 **Interactive Calendar View** — Visualize team schedules and leave overlaps.
- 📊 **Admin Dashboard** — Manage approvals, view analytics, and monitor usage.
- 👥 **Role-Based Access Control** — Separate dashboards for admins and employees.
- 💬 **Alerts & Notifications** — Integrated with [Sonner](https://sonner.emilkowal.ski/) for beautiful toast messages.
- 🔒 **Protected Routes** — Secure pages with role-based access control using Next.js middleware.
- 🌎 **Interactive Maps** — Display multiple office locations with [Leaflet](https://leafletjs.com/).
- 💡 **Dark Mode Ready** — Fully theme-aware (no hard-coded colors).

---

## 🧰 Tech Stack

| Category | Tools |
|-----------|--------|
| **Framework** | [Next.js 14+ (App Router)](https://nextjs.org) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) + CSS variables |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/) |
| **Forms & Validation** | [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/) |
| **State & Data** | [React Query](https://tanstack.com/query/latest) |
| **Notifications** | [Sonner](https://sonner.emilkowal.ski/) |
| **Maps** | [Leaflet](https://leafletjs.com/) via `react-leaflet` |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |

---

## 🧩 Folder Structure

```
worksynce/
├── app/
│   ├── (public)/         # Unprotected routes (Landing, About, Contact, Pricing, Features)
│   ├── (auth)/           # Auth routes (Login, Register)
│   ├── (dashboard)/      # Protected routes (Admin/User)
│   ├── layout.tsx        # Root layout (includes <Toaster />)
│   └── page.tsx          # Landing page
│
├── components/
│   ├── auth/             # Auth utilities (ProtectedRoute, AuthLayout)
│   ├── layout/           # Layout components (UnprotectedLayout, AdminLayout)
│   ├── ui/               # Reusable UI (Button, InputField, Modal, Dropdown, Tabs, Map)
│   └── features/         # Reusable page-level components
│
├── lib/
│   ├── mockDb.ts         # Mock API data for dev/testing
│   ├── utils.ts          # Utility functions (cn, formatting, helpers)
│   └── api/              # React Query API hooks
│
├── public/               # Static assets (logos, icons, etc.)
├── styles/               # Tailwind & theme setup
└── README.md
```

---

## ⚙️ Getting Started

### 1️⃣ Clone the repo
```bash
git clone https://github.com/yourusername/worksynce.git
cd worksynce
```

### 2️⃣ Install dependencies
```bash
npm install
# or
yarn
# or
pnpm install
```

### 3️⃣ Run the development server
```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) 🚀

---

## 🧠 Development Notes

- All colors are **theme-driven** from `/globals.css` using CSS variables:
  ```css
  :root {
    --primary: #2563eb;
    --secondary: #9333ea;
    --background: #ffffff;
    --foreground: #171717;
  }
  ```

- Dynamic imports ensure SSR-safety for client-only components (like maps).
- `react-query` manages API state for fetching and mutating data.
- `ProtectedRoute` automatically redirects users based on authentication and role.

---

## 🌍 Pages Overview

| Page | Description |
|------|-------------|
| `/` | Landing page with features overview |
| `/login` / `/register` | Auth pages with form validation |
| `/dashboard` | Employee dashboard with leave history & requests |
| `/admin` | Admin dashboard with approvals & analytics |
| `/features` | Highlight of worksynce capabilities |
| `/pricing` | Transparent, flexible pricing plans |
| `/about` | Company story, mission, and values |
| `/contact` | Contact form with map & Sonner alerts |

---

## 🧪 Mock API Endpoints

Located under `app/api/` for local development:

| Method | Endpoint | Description |
|---------|-----------|-------------|
| `GET` | `/api/leaves` | Fetch all leave requests |
| `POST` | `/api/leaves` | Create a new leave request |
| `PUT` | `/api/leaves/:id` | Update leave status or details |
| `DELETE` | `/api/leaves/:id` | Remove a leave request |

---

## 🎨 UI Highlights

- **Reusable Components:** Buttons, Modals, Dropdowns, Inputs, Tabs, and DatePickers.
- **Accessible Design:** Keyboard navigation and ARIA-friendly elements.
- **Animation:** Smooth transitions via Framer Motion.
- **Consistent Branding:** Uses `--primary` and `--secondary` across all interactive elements.

---

## 🧑‍💻 Author

**Benjamin Nyankson**  
Frontend Developer | React • Vue • Angular • TypeScript  
🌐 [Portfolio](https://portfolio-react-nine-lime.vercel.app)  
💼 [LinkedIn](https://www.linkedin.com/in/benjamin-nyankson/)  
📧 benjamin@example.com  

---

## 📦 Deployment

Easily deploy using [Vercel](https://vercel.com/new):

```bash
npm run build
npm start
```

Then connect your GitHub repo to Vercel — automatic builds, previews, and environment variables included.

---

## 🏁 License

This project is licensed under the **MIT License**.  
You’re free to use, modify, and distribute it with attribution.

---

### ✨ “WorkSynce — making time management effortless.”
