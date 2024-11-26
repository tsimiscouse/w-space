# 🏢 W-Space API - PAW Group 16

<img src="https://github.com/tsimiscouse/w-space/blob/main/asset/PAW16.png" width="800"/>

**Anggota Kelompok 16:**
- 🧑‍💻 *22/503935/TK/55096* Josua Adhi Candra Nugroho
- 🧑‍💻 *22/494733/TK/54301* Muhammad Aqiil Fauzaan
- 🧑‍💻 *22/496427/TK/54387* Muhammad Luthfi Attaqi
- 🧑‍💻 *22/494495/TK/54238* Barbara Neanake Ajiesti
- 🧑‍💻 *22/500335/TK/54838* Ramadhani Februarrahman

---

## 📖 Deskripsi Proyek

W-Space adalah aplikasi berbasis web untuk membantu pengguna menemukan dan menyewa shared spaces seperti coworking space, ruang meeting, dedicated space, atau private office. Proyek ini dirancang untuk memenuhi kebutuhan harian pengguna melalui platform yang intuitif dan fungsional.

✨ Proyek ini menggunakan React.js dan Next.js untuk frontend serta backend berbasis Node.js dengan database MongoDB. Proyek ini juga mendukung fitur CRUD untuk ruang sewa dan fasilitas, dengan tambahan sistem booking yang memudahkan pengguna dalam merencanakan penyewaan ruang mereka.

---

## 🛠 Teknologi yang Digunakan
- **Frontend:** React.js 
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **CSS Framework** Tailwind CSS
- **Authentication:** JWT

---

## 🎯 Fitur Utama

- **CRUD:** Operasi Create, Read, Update, Delete untuk data ruang dan fasilitas.
- **Booking Real-Time:** Sistem kalender untuk mengecek ketersediaan dan melakukan booking ruang.
- **Search & Filter:** Cari ruang dengan filter berdasarkan lokasi, fasilitas, dan jenis ruang.
- **Google Maps API**
- **Admin Dashboard**
- **Auto Email API**

---

## 📚 Frontend W-Space
Frontend W-Space dirancang dengan tampilan yang user-friendly untuk memudahkan pengguna dalam melakukan booking ruang. Berikut adalah tampilan halaman utama:

#### 🔑 Login Page
<img src="https://github.com/tsimiscouse/w-space/blob/main/asset/LoginPage.png" alt="Login Page" width="600"/>

#### 🏠 Homepage
<img src="https://github.com/tsimiscouse/w-space/blob/main/homepage.png" alt="INI BLM GANTI YA" width="600"/>

#### 📚 Booking Page
<img src="https://github.com/tsimiscouse/w-space/blob/main/bookingpage.png" alt="INI BLM GANTI YA" width='600'/>

Frontend ini dibangun menggunakan React.js untuk menampilkan konten secara dinamis. Pengguna dapat dengan mudah menambah, menghapus, dan mencari ruang secara real-time.

---

## 🛠 Panduan Penggunaan

### 1. Clone Repository
Untuk memulai, clone repositori ini ke local machine Anda:

```bash
git clone https://github.com/tsimiscouse/w-space.git
```

### 2. Install Dependencies
Setelah cloning, navigasikan ke direktori project server dan client, kemudian install dependencies dengan menjalankan perintah berikut di masing-masing direktori:

```bash
npm install
```

3. Setup Environment Variables
Backend (Server)
Buat file .env di dalam folder server dengan konfigurasi berikut:
```bash
MONGO_URI=<your_mongo_db_connection_string>
JWTPRIVATEKEY=<your_jwt_private_key>
PORT=5000
```
Frontend (Client)
Buat file .env di dalam folder client dengan konfigurasi berikut:
```
REACT_APP_API_URL=http://localhost:5000
```

4. Jalankan Aplikasi
Untuk memulai aplikasi backend dan frontend, jalankan perintah berikut di terminal:

Backend (Server):
```
npm start
```
Frontend (Client):
```
npm start
```
Aplikasi akan berjalan di http://localhost:3000 untuk frontend dan http://localhost:5000 untuk backend.

## 🗂 Struktur Proyek
```
w-space/
├── server/
│   ├── src/
│   │   ├── controllers/    # Logic API untuk backend
│   │   ├── models/         # Schema MongoDB
│   │   └── routes/         # Routing API
│   ├── .env                # Environment variables
│   ├── server.js           # Entry point backend
│   ├── package.json        # Dependencies backend
│   └── package-lock.json   
│
├── client/
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # Komponen UI
│   │   └── App.js          # Main component aplikasi frontend
│   ├── .env                # Environment variables frontend
│   ├── package.json        # Dependencies frontend
│   └── package-lock.json
│
└── README.md               # Dokumentasi proyek
```
---

## 📄 Dokumentasi dan Video Demo

Untuk dokumentasi proyek dan video demo CRUD, silakan kunjungi link [bit.ly/PAW_16](bit.ly/PAW_16) atau click:

[![PAW16 Dokumentasi](https://img.shields.io/badge/Documentation-PAW_16-blue)](https://bit.ly/PAW_16)

---

_Thank you for visiting our repository. We hope this project is useful and continues to grow_ ✨🚀

