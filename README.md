# 📽️ ObaPay Presentation System (Modular Architecture)

Struktur file presentasi `presentasi.html` telah dimodularisasi menjadi beberapa modul file terpisah dengan menerapkan konsep **Web Components** untuk mengeliminasi duplikasi kode.

---

## 📂 Struktur Direktori

```

├── presentasi.html              # File utama presentasi (ringkas, bersih & siap buka di browser)
├── build.py                     # Script builder untuk menggabungkan modul & slides (mendukung --watch)
├── rancangan presentasi.md      # PRD & narasi materi presentasi
├── README.md                    # Dokumentasi arsitektur presentasi ini
│
├── css/                         # Desain sistem modular
│   ├── styles.css               # Master stylesheet (mengimpor semua modul CSS)
│   ├── pzn-theme.css            # Variabel token, typography, buttons, tags, cards, hard-shadow
│   ├── layout.css               # Navbar, stage canvas, footer nav, notes drawer
│   ├── components.css           # Styling screenshot window, stage cards, modal checklist & lightbox
│   └── slides.css               # Layout khusus per slide (typewriter, device frame, matrix, roadmap)
│
├── js/                          # Logika & controller modular
│   ├── config.js                # Master data: TOTAL_SLIDES, PRESENTER_NOTES, SCREENSHOT_CONFIG, STAGES_B
│   ├── storage.js               # IndexedDB storage & helper pemeriksaan file gambar
│   ├── components.js            # Custom Web Components (<slide-top-meta>, <cycle-a-nav>, <screenshot-window>, dll.)
│   ├── lightbox.js              # Controller popup lightbox, zoom in/out, pan drag, multi-image gallery
│   └── app.js                   # Presenter navigation, keyboard shortcuts, mode panduan, live export
│
├── components/                  # Shell components UI berulang
│   ├── icons.html               # 32 inline SVG symbol sprite
│   ├── navbar.html              # Header navbar atas
│   ├── footer.html              # Bottom navigation controls & progress bar
│   ├── notes-drawer.html        # Presenter notes drawer (shortcut: N)
│   ├── checklist-modal.html     # Modal checklist screenshot
│   └── lightbox-modal.html      # Modal lightbox zoom foto
│
├── slides/                      # 27 slide file mandiri
│   ├── slide01.html             # Slide 1: Pembuka (Mengenal Obapay)
│   ├── slide02.html             # Slide 2: Siklus A (Overview 8 Tahap Logistik Farmasi)
│   ├── slide03.html             # Slide 3: Siklus A.1 (Perencanaan Kebutuhan / Defecta)
│   ├── slide04.html             # Slide 4: Siklus A.2 (Penganggaran & Estimasi Nilai Pembelian)
│   ├── slide05.html             # Slide 5: Siklus A.3 (Pengadaan: Surat Pesanan PO & Cetak Narkotika)
│   ├── slide06.html             # Slide 6: Siklus A.4 (Penerimaan: Faktur Pembelian / Batch / ED)
│   ├── slide07.html             # Slide 7: Siklus A.5 (Penyimpanan & Multi-Gudang)
│   ├── slide08.html             # Slide 8: Siklus A.6 (Distribusi & Penyaluran Antar Depo)
│   ├── slide09.html             # Slide 9: Siklus A.7 (Pengendalian Mutu & Stok Opname)
│   ├── slide10.html             # Slide 10: Siklus A.8 (Penghapusan Obat & Retur Supplier)
│   ├── slide11.html             # Slide 11: Siklus B (Overview 6 Tahap Pelayanan Resep)
│   ├── slide12.html             # Slide 12: Siklus B.1 (Penerimaan Resep & E-Resep ERM)
│   ├── slide13.html             # Slide 13: Siklus B.2 (Skrining & 14 Poin Telaah Resep Klinis)
│   ├── slide14.html             # Slide 14: Siklus B.3 (Penyiapan Obat & Racikan E-Tiket)
│   ├── slide15.html             # Slide 15: Siklus B.4 (Pemeriksaan Akhir / Telaah Obat 5 Tepat)
│   ├── slide16.html             # Slide 16: Siklus B.5 (Penyerahan Obat / Handover & Retur Ranap)
│   ├── slide17.html             # Slide 17: Siklus B.6 (Edukasi Pasien via WhatsApp)
│   ├── slide18.html             # Slide 18: Laporan HPP Farmasi Realtime
│   ├── slide19.html             # Slide 19: Laporan Stagnant Stock (Slow Moving)
│   ├── slide20.html             # Slide 20: Laporan Death Stock (Stok Mati)
│   ├── slide21.html             # Slide 21: Raport Resep > 35rb (Kendali Biaya BPJS)
│   ├── slide22.html             # Slide 22: Kepatuhan Formularium (INM Kemenkes)
│   ├── slide23.html             # Slide 23: Respon Time Farmasi (SPM Waktu Tunggu)
│   ├── slide24.html             # Slide 24: DDD Antibiotika (Metode WHO & PPRA)
│   ├── slide25.html             # Slide 25: Cara Kerja SSO & Integrasi ERM
│   ├── slide26.html             # Slide 26: Penjelasan API Peresepan (REST API)
│   └── slide27.html             # Slide 27: Diskusi & Tanya Jawab
│
└── screenshots/                 # Folder aset tangkapan layar (.png)
```

---

## 🧩 Konsep Reusable Components

Untuk menghilangkan duplikasi ribuan baris kode HTML pada setiap slide:

### 1. `<slide-top-meta>`
Menggantikan blok header meta pada setiap slide:
```html
<slide-top-meta slide="3" badge="Siklus A: Tahap 1 dari 8" icon="package" speaker="Logistik Farmasi"></slide-top-meta>
```

### 2. `<cycle-b-nav>`
Merender 6 kartu tahapan Siklus Pelayanan Obat:
```html
<cycle-b-nav active="B1"></cycle-b-nav>
```

### 3. `<screenshot-window>`
Menggantikan ~45 baris boilerplate frame mockup, traffic light dots, URL bar, zoom button, change button, img tag, dan panduan upload. Cukup berikan attribute `key`:
```html
<screenshot-window key="slide05-a1-defecta"></screenshot-window>
```
Semua rincian menu, URL route, instruksi screenshot, dan judul otomatis dibaca dari `js/config.js` (`SCREENSHOT_CONFIG`).

### 4. `<svg-icon>`
Merender icon SVG offline secara instan:
```html
<svg-icon name="terminal"></svg-icon>
```

### 5. `<wave-background>`
Merender latar gelombang SVG organik di belakang slide:
```html
<wave-background variant="1"></wave-background>
```

---

## 🛠️ Cara Edit, Build & Alasan Arsitektur

### Kenapa Perlu `build.py`?
1. **Modularitas Kode**: Presentasi ini terdiri dari 27 slide dan 6 komponen UI (lebih dari 2.100 baris HTML). Memecahnya ke folder `slides/` dan `components/` membuat pengeditan jauh lebih rapi dan terfokus per slide.
2. **Bebas Kendala CORS Offline (`file://`)**: Browser modern memblokir pemanggilan `fetch()` antar file HTML lokal jika dibuka langsung tanpa web server (`file:///...`). Script `build.py` menyatukan seluruh file pecahan di `slides/` dan `components/` ke dalam satu file utama `presentasi.html` sehingga bisa dibuka langsung dengan klik dua kali di komputer mana pun.

### Menjalankan / Membuka Presentasi
Buka file `presentasi.html` langsung di browser Anda (bisa double-click secara offline via `file://` atau melalui web server lokal).

### Mengedit Slide
Cukup buka file slide yang bersangkutan di folder `slides/`, misalnya `slides/slide05.html`.

> **Penting:** Perubahan pada `slides/slideXX.html` tidak akan langsung terlihat di `presentasi.html` sebelum di-build ulang.

Setelah mengedit, jalankan perintah berikut untuk memperbarui `presentasi.html`:
```bash
python3 build.py
```
Atau jalankan mode **Auto-Rebuild (Watch)** saat sedang aktif mengedit agar setiap kali Anda menekan `Ctrl+S`, file `presentasi.html` otomatis diperbarui:
```bash
python3 build.py --watch
```

---

## 🌐 Deployment ke GitHub Pages

Presentasi ini **100% kompatibel dengan GitHub Pages** karena hasil akhirnya adalah halaman statis murni (`presentasi.html` + `css/` + `js/` + `screenshots/`).

### Alur kerja repository terpisah

Repository: https://github.com/danifahmy5/obapay-presentasi
Website: https://danifahmy5.github.io/obapay-presentasi/

### 1. Buka folder repository presentasi

```bash
cd /home/rosyid/project/obapay-presentasi
```

Semua pembaruan presentasi dilakukan di folder ini. Folder `ppt` di repository aplikasi ObaPay hanya berisi petunjuk lokasi baru.

### 2. Edit materi dan lihat hasilnya

Edit materi di `slides/`, komponen di `components/`, tampilan di `css/`, perilaku di `js/`, atau gambar di `screenshots/`.
Untuk pratinjau lokal:

```bash
python3 build.py
python3 -m http.server 8080
```

Buka http://localhost:8080/presentasi.html.
Setelah mengedit slide atau komponen, jalankan kembali `python3 build.py`, lalu muat ulang halaman browser.
Hentikan server dengan `Ctrl+C`, atau gunakan terminal lain untuk menjalankan perintah Git berikut.

### 3. Publikasikan perubahan

```bash
git add .
git commit -m "docs: perbarui presentasi"
git push origin main
```

GitHub Actions membangun HTML dan menerbitkan situs secara otomatis setelah push ke branch `main`.
Pantau proses di [tab Actions](https://github.com/danifahmy5/obapay-presentasi/actions).
Setelah workflow berhasil (centang hijau), buka [presentasi online](https://danifahmy5.github.io/obapay-presentasi/) dan muat ulang halaman untuk melihat perubahan.
`presentasi.html` adalah hasil build lokal dan tidak perlu di-commit.
Repository ini hanya memuat presentasi; aplikasi ObaPay tetap berada di repository privat terpisah.
Tautan demo localhost di presentasi membutuhkan aplikasi ObaPay yang berjalan di komputer pengunjung.
