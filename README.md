
---

# 📦 StockAtelier

**StockAtelier** is a professional, minimalist inventory management solution designed for small cafés. Built with performance and simplicity in mind, it provides a clean user experience while allowing owners to efficiently manage stock and monitor inventory value in real time.

---

## 🌟 Features

* **📊 Real-time Dashboard**
  Get an instant overview of total stock value and item counts.

* **🧾 Full CRUD Management**
  Easily add, edit, and delete inventory items.

* **🎨 Modern UI**
  Clean and minimalist design focused on clarity and usability.

* **🔄 Database Sync**
  Powered by Supabase for reliable and real-time data persistence.

---

## 🛠️ Tech Stack

| Component | Technology              |
| --------- | ----------------------- |
| Framework | Next.js 15 (App Router) |
| Database  | Supabase (PostgreSQL)   |
| Styling   | Tailwind CSS            |
| Runtime   | Docker                  |

---

## 🚀 Getting Started

The fastest way to run the project is using **Docker Compose**.

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/emenybouchoucha/stock-pro.git
cd stock-pro
```

---

### 2️⃣ Setup Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

---

### 3️⃣ Run the Application

```bash
docker-compose up --build
```

📍 The app will be available at:
👉 [http://localhost:3000](http://localhost:3000)

---

## 🎬 Demo

Watch **StockAtelier** in action:
👉 *(Add your demo video link here)*

---

## 📂 Project Structure

```
.
├── app/                 # Next.js routes and business logic
├── components/          # Reusable UI components (Buttons, Inputs, Cards)
├── docker/              # Docker configuration files
├── docker-compose.yml   # App & database orchestration
└── .env.local           # Environment variables
```

---

## 🛠️ Troubleshooting

### ⚠️ Database Connection Issues

* Ensure the database container is running properly.
* Docker Compose handles dependencies using `depends_on`.

### ⚠️ Port Conflicts

* If ports **3000** or **5432** are already in use:

  * Modify them in `docker-compose.yml`.

---

## 💡 Future Improvements

* User authentication & roles
* Analytics dashboard
* Export reports (PDF/CSV)
* Low stock alerts


