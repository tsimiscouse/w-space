# 🏢 W-Space API - PAW Group 16

<img src="https://github.com/tsimiscouse/w-space/blob/main/asset/PAW16.png" width="800"/>

**Anggota Kelompok 16:**
- 🧑‍💻 *22/503935/TK/55096* Josua Adhi Candra Nugroho
- 🧑‍💻 *22/494733/TK/54301* Muhammad Aqiil Fauzaan
- 🧑‍💻 *22/496427/TK/54387* Muhammad Luthfi Attaqi
- 🧑‍💻 *22/494495/TK/54238* Barbara Neanake Ajiesti
- 🧑‍💻 *22/500335/TK/54838* Ramadhani Februarrahman

---

## 🔗 **Important Links**
- 🌐 **W-Space Showcase**: [https://w-space.my.canva.site/](https://w-space.my.canva.site/)  
- 📄 **Documentation & Demo**: [bit.ly/PAW16](https://bit.ly/PAW16)  
- 💻 **W-Space Web App**: [https://w-space-4tv1.vercel.app/](https://w-space-4tv1.vercel.app/)

---

## 📖 **Deskripsi Proyek**

**W-Space** adalah aplikasi berbasis web yang mempermudah pencarian dan penyewaan ruang seperti coworking space, studio kreatif, hingga ruang rapat. Proyek ini dirancang sebagai solusi **platform terpusat** dengan sistem **real-time availability**, filter ruang, dan kemudahan pemesanan yang dapat diakses dari berbagai perangkat.

Aplikasi ini dibangun dengan menggunakan:
- **Frontend:** React.js untuk menciptakan UI yang dinamis dan responsif.
- **Backend:** Node.js dengan RESTful API menggunakan Express.js untuk mengelola data ruang dan pengguna.
- **Database:** MongoDB sebagai solusi cloud-based yang fleksibel untuk manajemen data.

Implementasi berfokus pada:
1. **Client-Side Rendering:** Mengoptimalkan performa dengan rendering langsung di browser.  
2. **Atomic Design Principles:** Membagi komponen menjadi Atom, Molekul, hingga Organisme untuk modularitas dan reusabilitas tinggi.  
3. **Responsive Design:** Dirancang mobile-first menggunakan Tailwind CSS agar optimal di semua perangkat.  

---

## 🛠 **Teknologi yang Digunakan**
- **Frontend:** React.js, Tailwind CSS, AOS.js  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB Atlas Free Tier  
- **Authentication:** JWT  
- **Deployment:** Vercel  

---

## 🎯 **Fitur Utama**

- **CRUD Operation:** Kelola data ruang, pengguna, dan pemesanan dengan fitur Create, Read, Update, Delete.  
- **Real-Time Booking:** Sistem kalender untuk mengecek ketersediaan ruang.  
- **Search & Filter:** Fitur pencarian dengan filter berdasarkan lokasi, fasilitas, dan jenis ruang.  
- **Rating & Review:** Ulasan pengguna untuk meningkatkan kepercayaan dan transparansi.  
- **Email Integration:** Sistem notifikasi email otomatis dengan integrasi API Gmail melalui SendGrid.

---


## 📚 Frontend W-Space
Frontend W-Space dirancang dengan tampilan yang user-friendly untuk memudahkan pengguna dalam melakukan booking ruang. Berikut adalah tampilan halaman utama:

#### 🔑 Login Page
<img src="https://github.com/tsimiscouse/w-space/blob/main/asset/LoginPage.png" alt="Login Page" width="600"/>

#### 🏠 Homepage
<img src="https://github.com/tsimiscouse/w-space/blob/main/asset/Homepage.png" alt="Homepage" width="600"/>

#### 📚 Booking Page
<img src="https://github.com/tsimiscouse/w-space/blob/main/asset/BookingPage.png" alt="Booking Page" width='600'/>

#### 📞 Contact Us Page
<img src="https://github.com/tsimiscouse/w-space/blob/main/asset/ContactUs.png" alt="Contact Us" width='600'/>

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
SALT=<salt_value>

SENDGRID_API_KEY=YOUR_API_KEY
EMAIL_USER=<user_email>
EMAIL_TO=<your_email>

EMAIL_SENDER=<your_email>
EMAIL_SENDER_PASS=<your_email_password>
PORT=5000
```
Frontend (Client)
Buat file .env di dalam folder client dengan konfigurasi berikut:
```
REACT_APP_API_URL=YOUR_CLIENT_DOMAIN
REACT_APP_GOOGLE_MAPS_API_KEY=YOUR_API_KEY
```

4. Jalankan Aplikasi
Untuk memulai aplikasi backend dan frontend, jalankan perintah berikut di terminal:

**Pastikan untuk menginstall semua depedencies**

Backend (Server):
```
npm run dev
```
Frontend (Client):
```
npm start
```
Aplikasi akan berjalan di http://localhost:3000 untuk frontend dan backend.

## 🗂 Struktur Proyek
```
w-space/
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   └── routes/
│   ├── .env
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   └── index.js
│   ├── .env
│   ├── package.json
│   └── package-lock.json
│
├── asset
└── README.md
└── another asset

```
---

## 📄 Dokumentasi dan Video Demo

Kunjungi link berikut untuk dokumentasi lengkap, video demo CRUD, dan aplikasi yang sudah di-deploy:
- 📄 **Dokumentasi & Video Demo**: [bit.ly/PAW_16](https://bit.ly/PAW_16)  
- 💻 **W-Space Web App**: [https://w-space-4tv1.vercel.app/](https://w-space-4tv1.vercel.app/)

[![PAW16 Dokumentasi](https://img.shields.io/badge/Documentation-PAW_16-blue)](https://bit.ly/PAW_16)

---

_Thank you for visiting our repository. We hope this project is useful and continues to grow_ ✨🚀

