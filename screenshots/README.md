# Panduan Screenshot Manual ObaPay untuk `presentasi.html`

Anda dapat menyematkan tangkapan layar (screenshot) aplikasi **ObaPay** ke dalam `ppt/presentasi.html` dengan **dua cara mudah**:

1. **Cara 1 — Langsung dari Browser (Tanpa Rename File):**
   Buka `ppt/presentasi.html` di browser, lalu klik tombol **"📁 Upload"** / **"Ganti"** pada kotak screenshot di slide bersangkutan (atau buka menu **"Panduan & Checklist Screenshot"** di pojok kanan atas). Gambar yang Anda pilih akan tersimpan otomatis di browser (IndexedDB), dan Anda dapat menekan tombol **"Unduh HTML Mandiri (dengan Screenshot)"** untuk mengunduh satu file `.html` mandiri yang sudah menyertakan seluruh screenshot di dalamnya.

2. **Cara 2 — Simpan File di Folder `ppt/screenshots/`:**
   Simpan hasil tangkapan layar Anda ke dalam folder `ppt/screenshots/` ini dengan nama file sesuai tabel di bawah. Saat `ppt/presentasi.html` dibuka, gambar akan otomatis dimuat langsung.

> [!TIP]
> **Dukungan Multi-Gambar (Galeri):** Jika satu tahapan memiliki beberapa tampilan (misalnya alur PO, alur penerimaan barang, dsb.), Anda dapat menambahkan akhiran nomor seperti `slide05-a3-pengadaan-po-1.png`, `slide05-a3-pengadaan-po-2.png`, dst. Sistem akan otomatis mendeteksi dan menampilkan tombol navigasi galeri (Prev/Next) serta thumbnail strip di Lightbox popup.

---

## 📸 Daftar Nama File & Halaman Rujukan ObaPay (Slide 1 – 29)

### 1. Pembuka & Tampilan Sistem
| Slide | Nama File di `ppt/screenshots/` | Menu di ObaPay | URL / Route Lokal | Fokus Tangkapan Layar |
|---|---|---|---|---|
| **Slide 1** (Desktop) | `slide01-dashboard-overview.png` | `Main Menu → Dashboard Analitik` | `/dashboard` | Ringkasan eksekutif penjualan, pergerakan stok, dan indikator operasional farmasi (Desktop). |
| **Slide 1** (Mobile) | `slide01-mobile-dashboard.png` | `Dashboard (Tampilan Responsive HP)` | `/dashboard` | Tampilan responsive mobile smartphone untuk kemudahan akses dokter & apoteker. |

---

### 2. Siklus A: Pengelolaan Logistik Farmasi (Slide 2 – 10)
| Slide | Nama File di `ppt/screenshots/` | Menu di ObaPay | URL / Route Lokal | Fokus Tangkapan Layar |
|---|---|---|---|---|
| **Slide 3** (A.1) | `slide05-a1-defecta.png` | `Stok & Gudang → Defecta` | `/inventory/defecta` | Tabel kalkulasi Defecta otomatis (Min Stock, ROP, Threshold), stok multi-depo, dan tombol **Buat Draft PO**. |
| **Slide 4** (A.2) | `slide05-a2-penganggaran.png` | `Stok & Gudang → Defecta (Konfirmasi Draft PO)` | `/inventory/defecta` | Modal estimasi anggaran belanja, acuan HNA terakhir, kalkulasi subtotal per supplier, dan Estimasi Grand Total. |
| **Slide 5** (A.3) | `slide05-a3-pengadaan-po.png` | `Pembelian → Surat Pesanan Pembelian` | `/purchasing/purchase-orders` | Alur pengajuan PO, status approval In-App & notifikasi WhatsApp, tautan portal supplier, serta cetak PDF SP Narkotika/Reguler. |
| **Slide 6** (A.4) | `slide05-a4-penerimaan-faktur.png` | `Pembelian → Surat Pesanan Pembelian → Detail PO` | `/purchasing/purchase-orders/5` | Halaman Detail PO berstatus APPROVED dengan tombol aksi **Terima Barang** dan **Progress** pemenuhan pesanan. |
| **Slide 7** (A.5) | `slide05-a5-penyimpanan-lokasi.png` | `Pembelian → Penerimaan Obat (Input Faktur)` | `/purchasing/purchase-invoices/50/edit` | Form faktur pembelian dengan pemetaan lokasi rak fisik (*Rak A1, Rak A2*), nomor batch, tanggal ED, dan tombol *Generate Batch*. |
| **Slide 8** (A.6) | `slide05-a6-distribusi-transfer.png` | `Stok & Gudang → Transfer Stok → Buat Transfer` | `/inventory/stock-transfers/create` | Form transfer stok dengan panel penentuan rute gudang, 2 kalkulasi mode (*Per Tanggal* & *Per Hari*), toggle alokasi batch *FEFO/Manual*, dan kolom anfra. |
| **Slide 9** (A.7) | `slide09-kartu-stok.png` | `Laporan → Kartu Stok` | `/reports/stock-card` | Kartu stok obat dengan filter periode, transaksi masuk dan keluar, serta saldo persediaan. |
| **Slide 10** (A.8) | `slide05-a7-pengendalian-stok.png` | `Stok & Gudang → Penyesuaian Stok → Stock Opname Massal` | `/inventory/stock-adjustments/create` | Form opname massal dengan perbandingan stok sistem vs fisik, highlight deviasi selisih (-30 / +7), serta dropdown kategori & alasan penyesuaian. |
| **Slide 10** (A.8) | `slide05-a8-penghapusan-retur.png` | `Pembelian → Retur Pembelian → Buat Retur` | `/purchasing/purchase-returns/create` | Form retur pembelian berbasis nomor invoice, tabel rincian pengembalian per batch dan ED, serta pemotongan saldo hutang distributor. |

---

### 3. Siklus B: Pelayanan Obat & Resep Pasien (Slide 11 – 17)
| Slide | Nama File di `ppt/screenshots/` | Menu di ObaPay | URL / Route Lokal | Fokus Tangkapan Layar |
|---|---|---|---|---|
| **Slide 12** (B.1) | `slide05-b1-penerimaan-resep.png` | `Peresepan → E-Resep Dokter (Terintegrasi ERM)` | `/prescriptions/4/edit` | Form e-resep dokter dengan pemisahan tagihan kronis vs non-kronis, peringatan batas plafon Rp 35rb, panel riwayat pasien & template resep. |
| **Slide 13** (B.2) | `slide05-b2-skrining-telaah-resep.png` | `Transaksi Penjualan → Kasir / Detail Transaksi` | `/farmasi/sales/1682` | Panel 14 checklist telaah klinis & administratif bawaan sistem, rekam nama petugas penelaah, dan tanda tangan digital apoteker. |
| **Slide 14** (B.3) | `slide05-b3-penyiapan-racikan-etiket.png` | `Transaksi Penjualan → Kasir / Detail Transaksi` | `/farmasi/sales/1682` | Log tahapan pelayanan jam penyiapan obat (*dewi_racik, 10:10*) serta transparansi kalkulasi rincian biaya jasa resep dan tuslah puyer. |
| **Slide 15** (B.4) | `slide05-b4-pemeriksaan-akhir-telaah-obat.png` | `Transaksi Penjualan → Kasir / Detail Transaksi` | `/farmasi/sales/1682` | Checklist 5 Tepat telaah obat fisik independen sebelum penyerahan, audit timestamp jam pengecekan (*apt_hendra, 10:18*), dan TTD apoteker. |
| **Slide 16** (B.5) | `slide05-b5-penyerahan-handover.png` | `Transaksi Penjualan → Kasir / Detail Transaksi` | `/farmasi/sales/1682` | Form penyerahan obat dengan status *Sudah Diserahkan*, identitas penerima, nomor telepon, dan audit timestamp jam penyerahan (*17:34*). |
| **Slide 17** (B.6) | `slide05-b6-edukasi-whatsapp.png` | `Portal Edukasi Pasien (Tautan WhatsApp)` | `/education/portal/{token}` | Tampilan portal edukasi obat interaktif pasien (*Clobazam 10mg*) dengan aturan minum, peringatan penting, efek samping, dan video YouTube. |

---

### 4. Analitik, Kendali Biaya & Indikator Mutu Farmasi (Slide 19 – 26)
| Slide | Nama File di `ppt/screenshots/` | Menu di ObaPay | URL / Route Lokal | Fokus Tangkapan Layar |
|---|---|---|---|---|
| **Slide 19** | `slide18-hpp-farmasi.png` | `Laporan → Laporan HPP` | `/reports/hpp` | Laporan HPP otomatis dengan kartu rumus baku akuntansi persediaan (*awal + beli - akhir = HPP Rp 31,45 Jt*) dan rincian per 35 item obat. |
| **Slide 20** | `slide19-stagnant-stock.png` | `Laporan → Laporan Stagnan` | `/reports/stagnant-stock` | Laporan stok stagnan 90 hari dengan rekap modal tertahan (*Rp 167,7 Jt dari 15 obat*), sebaran multi-gudang, dan komparasi jumlah terjual. |
| **Slide 21** | `slide20-dead-stock.png` | `Laporan → Dead Stock` | `/reports/dead-stock` | Identifikasi 5 item dead stock tanpa penjualan 90 hari (*Rp 55,65 Jt*), sebaran gudang, dan klasifikasi pembayaran tunai/konsinyasi. |
| **Slide 22** | `slide21-resep-limit-35rb.png` | `Laporan → Penjualan → Evaluasi Resep BPJS & Obat Kronis` | `/reports/sales/doctor-prescription-limits` | Evaluasi kepatuhan nilai nominal resep BPJS (plafon Rp 35rb), pemisahan tagihan kronis vs non-kronis, dan rekapitulasi over-budget per DPJP. |
| **Slide 23** | `slide22-kepatuhan-formularium.png` | `Laporan → Penjualan → Penjualan Obat Formularium` | `/reports/sales/formularium-products` | Monitoring utilisasi formularium (F1, F2, F3) pada 5 gudang aktif, rekap 35 obat (266 terjual), dan ranking volume pemakaian obat. |
| **Slide 24** | `slide23-respon-time-spm.png` | `Laporan → Pelayanan → Respon Time Antrian` | `/reports/queues/response-time` | Pencapaian SPM Kemenkes (76.2%), durasi granular per tahapan alur resep (menunggu, racik, cek, serah), dan analisis titik *bottleneck*. |
| **Slide 25** | `slide24-ddd-antibiotika.png` | `Laporan → Penjualan → DDD Antibiotika` | `/reports/sales/antibiotic-ddd` | Laporan kuantitatif konsumsi antibiotik rawat inap metode WHO (DDD/100 hari rawat), agregat LOS, dan rincian per obat untuk program PPRA & akreditasi Starkes. |
| **Slide 26** | `slide26-near-expiry.png` | `Laporan → Inventori → Near Expiry` | `/reports/inventory/expiry` | Deteksi obat mendekati kedaluwarsa (near expiry), obat expired, filter hari/gudang, serta kalkulasi nilai kerugian nominal HPP persediaan. |

---

### 5. Arsitektur & Interoperabilitas Sistem (Slide 27 – 28)
| Slide | Nama File di `ppt/screenshots/` | Menu di ObaPay | URL / Route Lokal | Fokus Tangkapan Layar |
|---|---|---|---|---|
| **Slide 27** | *(Tanpa Screenshot)* | `Integrasi ERM & SSO E-Resep` | — | Menggunakan visual diagram alur 3 langkah & kartu manfaat utama. |
| **Slide 28** | *(Tanpa Screenshot)* | `Integrasi Sistem → API Peresepan E-Resep` | `/api/prescriptions` | Menggunakan visual grid 4 fitur interoperabilitas, keamanan Sanctum, & rute API gateway. |

---

### 6. Slide Penutup (Slide 29)
*Slide 29 (Tanya Jawab & Diskusi) menggunakan layout kartu pertanyaan pemantik diskusi interaktif tanpa memerlukan tangkapan layar aplikasi.*
