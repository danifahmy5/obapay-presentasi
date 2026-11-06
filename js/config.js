/**
 * ObaPay Presentation Configuration & Master Data
 * Single Source of Truth for Slides, Narrations, and Screenshots
 */

const TOTAL_SLIDES = 28;

const PRESENTER_NOTES = {
    1: "Dari Kebutuhan Operasional, Menuju Sistem Farmasi yang Terintegrasi. Obapay adalah sistem informasi yang dikembangkan untuk mendukung pelayanan farmasi dan pengelolaan persediaan obat secara lebih terstruktur, efisien, dan terintegrasi. Berawal dari pengalaman menggunakan sistem yang ada, berkembang menjadi solusi yang dirancang sesuai kebutuhan operasional rumah sakit.",
    2: "Siklus A (Pengelolaan Logistik Farmasi): Alur terintegrasi 8 tahap mulai dari perencanaan kebutuhan (defecta), penganggaran, pengadaan Surat Pesanan resmi, penerimaan faktur dan batch, penyimpanan multi-gudang, distribusi antar depo, pengendalian mutu melalui kartu stok, hingga penghapusan yang mencakup stock opname, penyesuaian stok, dan retur ke supplier. Kedelapan tahap ini saling terhubung secara otomatis di ObaPay tanpa entri data ganda.",
    3: "Siklus A (Tahap 1): Perencanaan Kebutuhan Obat (Menu Defecta). Sistem menghitung Minimal Stock, Reorder Point (ROP), dan Threshold secara otomatis berdasarkan rata-rata penjualan 14 hari serta lead time supplier. Halaman ini menampilkan stok real-time lintas unit (Gudang Utama, OK/IBS, Rawat Inap, Rawat Jalan), mutasi jual real-time, serta fitur rekomendasi order dengan pilihan Multi-Supplier, Multi-Satuan (Box/Strip/Tablet), dan Multi-Order untuk pembuatan Draft PO sekaligus.",
    4: "Siklus A (Tahap 2): Penganggaran & Estimasi Nilai Pembelian (Draft PO). Saat petugas mengonfirmasi pembuatan Draft PO dari menu Defecta, sistem secara otomatis mengalkulasi estimasi anggaran menggunakan acuan HNA pembelian terakhir per item, menjumlahkan estimasi total PO untuk masing-masing supplier, serta menampilkan Estimasi Grand Total secara transparan sebelum Surat Pesanan diterbitkan.",
    5: "Siklus A (Tahap 3): Pengadaan Surat Pesanan (PO), Approval & Distribusi Otomatis. Draft PO dari halaman Defecta diajukan melalui tombol Submit PO hingga berstatus Pending, lalu sistem otomatis mengirimkan notifikasi In-App di dashboard serta pesan WhatsApp berisi tautan persetujuan ke Kepala Instalasi Farmasi. Saat di-Approve, ObaPay otomatis mengirimkan lampiran Surat Pesanan beserta tautan Portal Surat Pesanan resmi langsung ke WhatsApp Supplier/PBF, mendukung format cetak PDF SP Reguler maupun SP Khusus (Narkotika, Psikotropika, Prekursor, OOT) lengkap dengan nomor SIPA dan tanda tangan digital.",
    6: "Siklus A (Tahap 4): Penerimaan Barang Berbasis PO Terkait. Proses penerimaan barang fisik di instalasi farmasi dimulai dari Purchase Order yang telah berstatus Approved. Pada halaman Detail PO ini, petugas logistik cukup menekan tombol 'Terima Barang' yang otomatis mengarahkan ke form penerimaan faktur dengan data distributor dan item pesanan yang sudah terkunci rapi tanpa ketik ulang. Nilai HNA dan diskon secara otomatis mengambil dari transaksi pembelian terakhir sebagai saran serta tetap fleksibel bisa diganti sesuai faktur fisik yang diterima. Staf juga dapat memantau status pemenuhan barang secara langsung melalui tombol 'Progress'.",
    7: "Siklus A (Tahap 5): Penataan Stok & Distribusi Rak Obat. Saat memproses faktur penerimaan obat, petugas langsung memetakan lokasi rak fisik penyimpanan (seperti Rak A1, Rak A2) untuk setiap item obat. Dilengkapi pencatatan nomor batch, tanggal expired (ED), saran HNA dan diskon dari transaksi terakhir yang fleksibel bisa diganti, serta fitur Generate Batch otomatis untuk menjamin kepatuhan FEFO dan kerapian tata letak persediaan sejak awal.",
    8: "Siklus A (Tahap 6): Distribusi & Transfer Stok Antar Gudang. Modul transfer stok memudahkan penyaluran obat dari Gudang Utama ke depo satelit seperti Rawat Jalan. Sistem menyediakan 2 mode kalkulasi anfra: mode 'Per Tanggal' yang secara otomatis hanya memunculkan data obat jika transaksi pemakaian lebih banyak dari sisa stok akhir di depo tujuan, serta mode 'Per Hari' berbasis tren rata-rata pemakaian hari yang sama dalam 4 minggu terakhir dikalikan buffer anfra. Dilengkapi fleksibilitas alokasi batch secara FEFO maupun manual bebas pilih batch.",
    9: "Siklus A (Tahap 7): Pengendalian & Mutu Persediaan. Kartu stok menampilkan riwayat transaksi masuk, keluar, dan saldo obat. Petugas memilih obat serta periode untuk menelusuri perubahan persediaan dan memeriksa rujukan transaksi.",
    10: "Siklus A (Tahap 8): Penghapusan, Stock Opname & Retur. Stock opname ditempatkan pada tahap penghapusan dalam alur presentasi ini. Petugas mencocokkan stok fisik dengan sistem, mencatat jenis dan alasan penyesuaian, lalu mengajukan dokumen massal. Selisih dapat berupa kekurangan maupun kelebihan stok. Retur supplier tetap menggunakan faktur pembelian, rincian batch, dan tanggal kedaluwarsa untuk menghitung nilai pengembalian serta pengurangan hutang.",
    11: "Siklus B (Pelayanan Pasien) memastikan ketepatan dispensing dan keselamatan pasien melalui 6 tahap alur terstruktur: penerimaan e-resep poliklinik/rawat inap, skrining 14 poin telaah klinis, penyiapan & kalkulator racikan e-tiket, pemeriksaan akhir 5 tepat, penyerahan obat & retur rawat inap, serta edukasi pasien via WhatsApp secara otomatis.",
    12: "Siklus B (Tahap 1): E-Resep ERM & Pemisahan Obat Kronis/Non-Kronis. Peresepan elektronik terintegrasi langsung dengan ERM dokter, memungkinkan pemisahan otomatis tagihan obat kronis dan non-kronis dengan sistem peringatan dini jika nilai non-kronis melampaui batas Rp 35.000. Dokter juga dibekali panel riwayat pasien, template resep, dan opsi pengajuan obat non-formularium.",
    13: "Siklus B (Tahap 2): Skrining & 14 Poin Telaah Resep Klinis. Pada lembar detail transaksi, apoteker memverifikasi checklist 14 parameter telaah klinis dan administratif secara terstandar. Dilengkapi rekam identitas petugas penelaah beserta tanda tangan digital/paraf apoteker, serta fitur auto e-tiket aturan pakai.",
    14: "Siklus B (Tahap 3): Penyiapan Obat, Racikan & Audit Waktu Dispensing. Sistem secara transparan merekam jam pelaksanaan penyiapan/racikan beserta inisial petugas penyiap untuk mengukur SPM waktu tunggu layanan farmasi. Sekaligus menghitung komponen rincian jasa resep dan tuslah racikan puyer secara otomatis.",
    15: "Siklus B (Tahap 4): Pemeriksaan Akhir (Telaah Obat 5 Tepat & Double-Check). Pemeriksaan fisik independen sebelum obat diserahkan ke pasien, memverifikasi 5 Tepat (Pasien, Obat, Dosis, Rute, Waktu). Sistem mencatat timestamp pengecekan secara presisi serta tanda tangan digital apoteker pemeriksa untuk akreditasi KARS/JCI.",
    16: "Siklus B (Tahap 5): Penyerahan Obat (Handover) & Validasi Penerima. Dokumentasi serah-terima obat ke pasien merekam status Sudah Diserahkan, nama penerima, nomor telepon, dan petugas penyerah. Serta merekam jam penyerahan akhir (17:34) sebagai penutup siklus pelayanan dispensing farmasi.",
    17: "Siklus B (Tahap 6): Portal Edukasi Pasien Digital (WhatsApp). Pasien menerima tautan WhatsApp resmi untuk membuka portal edukasi obat interaktif rumah sakit. Memuat panduan cara minum obat yang aman, peringatan penting efek samping, serta video tutorial YouTube dan infografis visual ramah pasien.",
    18: "Tujuh laporan pilihan yang dibahas pada slide berikutnya adalah HPP Farmasi, Stagnant Stock, Dead Stock, Resep BPJS & Obat Kronis, Kepatuhan Formularium, Response Time Farmasi, dan DDD Antibiotika. Secara keseluruhan, ObaPay memiliki 40+ jenis laporan yang mencakup penjualan, pembelian, inventori, keuangan, serta operasional lainnya. Akses laporan mengikuti hak pengguna.",
    19: "Laporan HPP Farmasi Realtime & Rumus Akuntansi: Menyajikan kalkulasi Harga Pokok Penjualan otomatis berbasis rumus baku persediaan: Persediaan Akhir Lalu (Rp 138,4 Jt) + Pembelian (Rp 55,8 Jt) − Persediaan Akhir Ini (Rp 162,8 Jt) = Total HPP (Rp 31,45 Jt). Dilengkapi tabel rincian HPP per obat, audit sumber data, dan export Excel.",
    20: "Laporan Stagnant Stock (Stok Lambat Berputar): Mengidentifikasi obat yang sisa persediaannya lebih besar dari transaksi penjualan selama 90 hari terakhir. Dashboard merangkum 15 obat lambat bergerak dengan modal tertahan sebesar Rp 167.769.500, memandu redistribusi stok antar depo satelit.",
    21: "Laporan Dead Stock (Stok Mati Nol Mutasi): Mendeteksi item obat tanpa mutasi penjualan sama sekali dalam periode 90 hari (seperti Fibrion dan Fondaparinux senilai Rp 55.650.000). Memilah metode pembayaran untuk percepatan negosiasi tukar guling batch atau retur distributor sebelum kedaluwarsa.",
    22: "Laporan Resep BPJS & Evaluasi Plafon Obat Kronis: Mengevaluasi kepatuhan nilai nominal resep BPJS terhadap plafon anjuran Rp 35.000 dengan memisahkan tagihan obat kronis (Rp 2,02 Jt) dan non-kronis (Rp 6,98 Jt). Dashboard mendeteksi 75 resep over-plafon dengan total kelebihan biaya Rp 4,36 Jt serta merangkum performa peresepan per DPJP untuk kendali mutu INA-CBGs.",
    23: "Laporan Kepatuhan & Penjualan Obat Formularium: Contoh periode 1–30 November 2026 dengan kategori BPJS, semua formularium, dan 5 gudang menampilkan 20 jenis obat serta 180 transaksi obat. Panel kepatuhan menggunakan rumus (F1 + F3) / (F1 + F3 + non formularium): (72 + 72) / (72 + 72 + 9) = 94,12%. Total 153 pada panel kepatuhan berbeda dari ringkasan 180 transaksi obat. Panel kepatuhan mengikuti periode dan kategori penjualan serta mencakup semua gudang; non formularium mengikuti kategori kunjungan dan mencakup pengajuan semua status. Tabel merinci kode, nama, formularium, dan transaksi tiap obat, dilengkapi cetak dan ekspor Excel.",
    24: "Laporan Response Time Antrian Pasien & SPM: Mengukur kepatuhan SPM Kemenkes dengan rata-rata total waktu 35.4 menit. Resep non-racik tercapai dalam 24.3 menit (target ≤ 30 menit, kepatuhan 83.3%) dan racikan 50.1 menit (target ≤ 60 menit, kepatuhan 66.7%), lengkap dengan analisis titik bottleneck di ruang peracikan.",
    25: "Evaluasi Penggunaan Antibiotik (Metode WHO ATC/DDD & PPRA): Menguantifikasi penggunaan antibiotik rumah sakit menggunakan standar baku WHO Defined Daily Dose (DDD) per 100 hari rawat inap (patient-days). Mendukung stratifikasi kategori AWaRe (Access, Watch, Reserve) dan program pengendalian resistensi antimikroba (PPRA) untuk mencegah lonjakan kuman kebal obat dan memenuhi indikator akreditasi Starkes.",
    26: "Integrasi ERM & Single Sign-On (SSO): Dokter cukup mengklik tombol 'Resep' pada ERM, sistem mengirimkan identitas dokter, pasien, dan kunjungan secara aman. ObaPay memvalidasi akses dan menyinkronkan data secara otomatis, lalu dokter langsung diarahkan ke form E-Resep dengan konteks yang sudah tersedia tanpa perlu login ulang. Solusi ini memberikan manfaat utama Single Sign-On (SSO), Zero Double Entry, Patient Context Safety, dan Seamless Workflow untuk mempercepat pelayanan rawat jalan.",
    27: "Penjelasan API Peresepan (Interoperabilitas Dua Arah): ObaPay menyediakan konektivitas API yang memungkinkan ERM menyinkronkan data resep lengkap dengan obat dan racikan, memantau progres status pelayanan farmasi secara real-time, mengelola duplikasi resep serta pembatalan dengan otorisasi aman, dan mengakses katalog master obat beserta sisa stok dan informasi DDD. Dilengkapi keamanan RESTful API autentikasi Laravel Sanctum, format data JSON terstruktur, dan arsitektur siap interoperabilitas FHIR / SATUSEHAT.",
    28: "“Mari kita diskusikan bersama: di titik mana proses saat ini paling sering mengalami hambatan, data apa yang paling sulit diperoleh dengan cepat, dan proses apa yang paling layak menjadi prioritas transformasi digital kita?”"
};

const TYPEWRITER_PHRASES = [
    'Smart Pharmacy System',
    'Manajemen Stok Real-Time',
    'Pelayanan Resep & Kasir',
    'Tracking Batch & Kadaluarsa',
    'Pengadaan & Retur Terpadu',
    'Peracikan Obat Presisi',
    'Multi-Gudang & Mutasi Depo',
    'Analitik & Laporan Akurat'
];

const CYCLE_A_STAGES = [
    { num: 1, slide: 3, icon: 'bar-chart', name: 'Perencanaan Kebutuhan', sub: 'Defecta & Reorder Point' },
    { num: 2, slide: 4, icon: 'wallet', name: 'Penganggaran', sub: 'Estimasi PO & Nilai Stok' },
    { num: 3, slide: 5, icon: 'shopping-cart', name: 'Pengadaan Obat', sub: 'Surat Pesanan PO & Narkotika' },
    { num: 4, slide: 6, icon: 'file-text', name: 'Penerimaan Obat', sub: 'Faktur, Batch & Kadaluarsa' },
    { num: 5, slide: 7, icon: 'layers', name: 'Penyimpanan', sub: 'Multi Gudang & Lokasi Rak' },
    { num: 6, slide: 8, icon: 'repeat', name: 'Distribusi & Penyaluran', sub: 'Transfer Stok Antar Depo' },
    { num: 7, slide: 9, icon: 'shield-check', name: 'Pengendalian Mutu', sub: 'Kartu Stok & Mutasi' },
    { num: 8, slide: 10, icon: 'trash', name: 'Penghapusan Obat', sub: 'Stock Opname & Retur' }
];

const CYCLE_B_STAGES = [
    { id: 'B1', slide: 12, icon: 'file-text', name: 'Penerimaan Resep', sub: 'Integrasi E-Resep ERM & Antrian Menunggu' },
    { id: 'B2', slide: 13, icon: 'clipboard-check', name: 'Skrining & Telaah Resep', sub: 'Checklist 14 Poin Klinis & Cek Stok' },
    { id: 'B3', slide: 14, icon: 'pill', name: 'Penyiapan & Peracikan', sub: 'Racikan Puyer/Kapsul & Cetak E-Tiket' },
    { id: 'B4', slide: 15, icon: 'check-circle', name: 'Pemeriksaan Akhir', sub: 'Verifikasi 5 Tepat Telaah Obat & Jam Tahap' },
    { id: 'B5', slide: 16, icon: 'user-check', name: 'Penyerahan ke Pasien', sub: 'Form Handover, Konseling, Retur Rawat Inap' },
    { id: 'B6', slide: 17, icon: 'message-circle', name: 'Edukasi & Dokumentasi', sub: 'Kirim Link Edukasi via WhatsApp Pasien' }
];

const STAGES_B = {
    'B1': {title: 'Penerimaan Resep & E-Resep ERM', badge: 'Tahap B.1 — Pelayanan', desc: 'Resep elektronik dari dokter/poliklinik mengalir langsung ke modul antrian farmasi (Menunggu/Entry). Petugas tidak perlu lagi mengetik ulang nama pasien dan rincian obat.', menu: 'Transaksi Penjualan → Kelola Resep Dokter', route: '/farmasi/sales/doctor-prescriptions', key: 'slide05-b1-penerimaan-resep'},
    'B2': {title: 'Skrining & 14 Poin Telaah Resep', badge: 'Tahap B.2 — Pelayanan', desc: 'Apoteker memverifikasi 14 parameter klinis & administratif (ketepatan dosis, rute, frekuensi, duplikasi, interaksi obat, alergi, dan kesesuaian formularium) dengan tanda tangan digital.', menu: 'Detail Transaksi → Telaah Resep', route: '/farmasi/sales/{id}', key: 'slide05-b2-skrining-telaah-resep'},
    'B3': {title: 'Penyiapan Obat & Racikan (E-Tiket)', badge: 'Tahap B.3 — Pelayanan', desc: 'Asisten Apoteker menyiapkan obat tunggal maupun racikan (puyer, kapsul, salep). Sistem secara otomatis mencetak label E-Tiket aturan pakai terstandar yang jelas untuk pasien.', menu: 'Transaksi Penjualan → Kasir / POS', route: '/farmasi/sales/create', key: 'slide05-b3-penyiapan-racikan-etiket'},
    'B4': {title: 'Pemeriksaan Akhir (Telaah Obat 5 Tepat)', badge: 'Tahap B.4 — Pelayanan', desc: 'Pengecekan fisik sebelum obat diserahkan: Tepat Pasien, Tepat Nama Obat, Tepat Dosis & Jumlah, Tepat Rute, dan Tepat Waktu Pemberian, dicatat bersama inisial petugas dan jam.', menu: 'Detail Transaksi → Telaah Obat', route: '/farmasi/sales/{id}', key: 'slide05-b4-pemeriksaan-akhir-telaah-obat'},
    'B5': {title: 'Penyerahan Obat (Handover) & Rawat Inap', badge: 'Tahap B.5 — Pelayanan', desc: 'Dokumentasi penyerahan obat: nama penerima, no. kontak, status konseling oleh petugas, serta fasilitas Retur Obat Sebagian khusus pasien rawat inap.', menu: 'Detail Transaksi → Penyerahan Obat', route: '/farmasi/sales/{id}/handover', key: 'slide05-b5-penyerahan-handover'},
    'B6': {title: 'Edukasi Pasien via WhatsApp & Riwayat', badge: 'Tahap B.6 — Pelayanan', desc: 'Sistem secara otomatis mengirimkan tautan materi edukasi cara pakai dan efek samping obat langsung ke nomor WhatsApp pasien, lengkap dengan log pengiriman.', menu: 'Transaksi Penjualan → Edukasi Pasien', route: '/medicine-education-deliveries', key: 'slide05-b6-edukasi-whatsapp'}
};

const STEPS_11 = {
    1: {title: 'Langkah 1: Resep Diterima di Antrian Farmasi', menu: 'Transaksi Penjualan → Kelola Resep', route: '/farmasi/sales/doctor-prescriptions', key: 'slide11-step1-resep-masuk', inst: 'Screenshot daftar resep dokter yang masuk ke antrian farmasi.'},
    2: {title: 'Langkah 2: Skrining Telaah Resep & Cek Stok', menu: 'Detail Transaksi → Telaah Resep', route: '/farmasi/sales/{id}', key: 'slide05-b2-skrining-telaah-resep', inst: 'Screenshot pengisian 14 poin telaah resep dan verifikasi stok gudang.'},
    3: {title: 'Langkah 3: Penyiapan, Cetak E-Tiket & Telaah Obat', menu: 'Detail Transaksi → Telaah Obat', route: '/farmasi/sales/{id}', key: 'slide05-b4-pemeriksaan-akhir-telaah-obat', inst: 'Screenshot hasil cetak e-tiket dan verifikasi 5 tepat sebelum penyerahan.'},
    4: {title: 'Langkah 4: Serah-Terima (Handover) & Edukasi Pasien', menu: 'Detail Transaksi → Penyerahan Obat', route: '/farmasi/sales/{id}/handover', key: 'slide05-b5-penyerahan-handover', inst: 'Screenshot bukti serah-terima obat dan pengiriman tautan WhatsApp.'},
    5: {title: 'Langkah 5: Transaksi Selesai & Mutasi Kartu Stok', menu: 'Laporan → Kartu Stok', route: '/reports/stock-card', key: 'slide07-kartu-stok-audit', inst: 'Screenshot kartu stok obat yang otomatis berkurang tanpa entri ulang.'},
    6: {title: 'Langkah 6: Data Operasional Memicu Defecta / PO', menu: 'Stok & Gudang → Defecta', route: '/inventory/defecta', key: 'slide05-a1-defecta', inst: 'Screenshot obat yang menyentuh batas minimum muncul di Defecta untuk dibeli ulang.'}
};

const SCREENSHOT_CONFIG = [
    {
        "key": "slide01-dashboard-overview",
        "slide": 1,
        "file": "slide01-dashboard-overview.png",
        "title": "Dashboard Analitik Farmasi (Desktop)",
        "menu": "Main Menu → Dashboard Analitik",
        "route": "/dashboard",
        "guideBadge": "DESKTOP APP",
        "guideIcon": "monitor",
        "guideTarget": "Dashboard Analitik (Desktop)",
        "guideInst": "Screenshot layar Dashboard Analitik ObaPay versi web desktop (ringkasan penjualan, pergerakan stok, dan indikator)."
    },
    {
        "key": "slide01-mobile-dashboard",
        "slide": 1,
        "file": "slide01-mobile-dashboard.png",
        "title": "Dashboard Responsive Mobile (Smartphone)",
        "menu": "Tampilan Mobile Smartphone",
        "route": "/dashboard",
        "guideBadge": "RESPONSIVE UI",
        "guideIcon": "smartphone",
        "guideTarget": "Dashboard Mobile Responsive",
        "guideInst": "Ambil tangkapan layar tampilan responsive smartphone (resolusi layar HP)."
    },
    {
        "key": "slide05-a1-defecta",
        "slide": 3,
        "file": "slide05-a1-defecta.png",
        "title": "Perencanaan Kebutuhan Obat (Menu Defecta)",
        "menu": "Stok & Gudang → Defecta",
        "route": "/inventory/defecta",
        "guideBadge": "LOGISTIK TAHAP 1",
        "guideIcon": "package",
        "guideTarget": "Rujukan Screenshot: Halaman Defecta",
        "guideInst": "Ambil screenshot tabel obat di bawah stok minimum, nama supplier, dan tombol 'Buat Draft PO'."
    },
    {
        "key": "slide05-a2-penganggaran",
        "slide": 4,
        "file": "slide05-a2-penganggaran.png",
        "title": "Penganggaran & Estimasi Nilai Pembelian (Draft PO)",
        "menu": "Stok & Gudang → Defecta (Konfirmasi Buat Draft PO)",
        "route": "/inventory/defecta",
        "guideBadge": "LOGISTIK TAHAP 2",
        "guideIcon": "wallet",
        "guideTarget": "Rujukan Screenshot: Konfirmasi Buat Draft PO & Estimasi",
        "guideInst": "Ambil screenshot modal Konfirmasi Buat Draft PO yang menampilkan HNA terakhir, estimasi per obat, total PO per supplier, dan estimasi grand total."
    },
    {
        "key": "slide05-a3-pengadaan-po",
        "slide": 5,
        "file": "slide05-a3-pengadaan-po.png",
        "title": "Pengadaan: Surat Pesanan (PO), Approval & Distribusi Otomatis",
        "menu": "Pembelian → Surat Pesanan Pembelian",
        "route": "/purchasing/purchase-orders",
        "guideBadge": "LOGISTIK TAHAP 3",
        "guideIcon": "shopping-cart",
        "guideTarget": "Rujukan Screenshot: Alur Surat Pesanan PO & Portal Supplier",
        "guideInst": "Ambil rangkaian screenshot daftar Draft PO, Submit PO (Pending), notifikasi WA & dashboard approver, klik Approve, pengiriman WA otomatis ke supplier, serta tampilan Portal Surat Pesanan & PDF SP Narkotika/Reguler."
    },
    {
        "key": "slide05-a4-penerimaan-faktur",
        "slide": 6,
        "file": "slide05-a4-penerimaan-faktur.png",
        "title": "Penerimaan Barang dari PO Terkait (Detail PO)",
        "menu": "Pembelian → Surat Pesanan Pembelian → Detail PO",
        "route": "/purchasing/purchase-orders/5",
        "guideBadge": "LOGISTIK TAHAP 4",
        "guideIcon": "file-text",
        "guideTarget": "Rujukan Screenshot: Detail PO Approved & Tombol Terima Barang",
        "guideInst": "Tampilan detail PO yang telah disetujui (Approved), ringkasan pemasok & total belanja, item obat, serta tombol aksi 'Terima Barang' dan 'Progress'."
    },
    {
        "key": "slide05-a5-penyimpanan-lokasi",
        "slide": 7,
        "file": "slide05-a5-penyimpanan-lokasi.png",
        "title": "Penataan Stok & Distribusi Rak Obat (Input Faktur)",
        "menu": "Pembelian → Penerimaan Obat (Input Faktur)",
        "route": "/purchasing/purchase-invoices/50/edit",
        "guideBadge": "LOGISTIK TAHAP 5",
        "guideIcon": "layers",
        "guideTarget": "Rujukan Screenshot: Form Input Faktur & Pemetaan Rak",
        "guideInst": "Tampilan form faktur pembelian dengan input nomor batch, tanggal expired, tombol Generate Batch, dan pemetaan lokasi rak penyimpanan (Rak A1, Rak A2)."
    },
    {
        "key": "slide05-a6-distribusi-transfer",
        "slide": 8,
        "file": "slide05-a6-distribusi-transfer.png",
        "title": "Distribusi & Transfer Stok Antar Gudang",
        "menu": "Stok & Gudang → Transfer Stok → Buat Transfer",
        "route": "/inventory/stock-transfers/create",
        "guideBadge": "LOGISTIK TAHAP 6",
        "guideIcon": "repeat",
        "guideTarget": "Rujukan Screenshot: Form Buat Transfer Stok & Analisis Anfra",
        "guideInst": "Tampilan penentuan rute gudang, 2 mode kalkulasi anfra (Per Tanggal & Per Hari), toggle mode alokasi batch FEFO/Manual, dan tabel analisis stok."
    },
    {
        "key": "slide09-kartu-stok",
        "slide": 9,
        "file": "slide09-kartu-stok.png",
        "title": "Kartu Stok & Pemantauan Mutasi",
        "menu": "Laporan → Kartu Stok",
        "route": "/reports/stock-card",
        "guideBadge": "LOGISTIK TAHAP 7",
        "guideIcon": "shield-check",
        "guideTarget": "Rujukan Screenshot: Kartu Stok Obat",
        "guideInst": "Tampilkan kartu stok obat dengan filter obat dan periode, transaksi masuk dan keluar, serta saldo persediaan."
    },
    {
        "key": "slide05-a7-pengendalian-stok",
        "slide": 10,
        "file": "slide05-a7-pengendalian-stok.png",
        "title": "Stock Opname & Penyesuaian Massal",
        "menu": "Stok & Gudang → Penyesuaian Stok → Stock Opname Massal",
        "route": "/inventory/stock-adjustments/create",
        "guideBadge": "LOGISTIK TAHAP 8",
        "guideIcon": "trash",
        "guideTarget": "Rujukan Screenshot: Stock Opname Massal & Selisih Fisik",
        "guideInst": "Tampilan form opname massal dengan perbandingan stok sistem vs fisik, highlight selisih (-30 / +7), serta kolom jenis dan alasan penyesuaian."
    },
    {
        "key": "slide05-a8-penghapusan-retur",
        "slide": 10,
        "file": "slide05-a8-penghapusan-retur.png",
        "title": "Retur Pembelian Berbasis Faktur",
        "menu": "Pembelian → Retur Pembelian → Buat Retur",
        "route": "/purchasing/purchase-returns/create",
        "guideBadge": "LOGISTIK TAHAP 8",
        "guideIcon": "trash",
        "guideTarget": "Rujukan Screenshot: Form Buat Retur Pembelian",
        "guideInst": "Tampilan penarikan faktur otomatis, tabel detail pengembalian per batch dan tanggal ED, serta kalkulasi pemotongan hutang."
    },
    {
        "key": "slide05-b1-penerimaan-resep",
        "slide": 12,
        "file": "slide05-b1-penerimaan-resep.png",
        "title": "E-Resep Dokter & Pemisahan Kronis/Non-Kronis",
        "menu": "Peresepan → E-Resep Dokter (Terintegrasi ERM)",
        "route": "/prescriptions/4/edit",
        "guideBadge": "PELAYANAN TAHAP 1",
        "guideIcon": "file-text",
        "guideTarget": "Rujukan Screenshot: Form E-Resep & Pemisahan Kronis",
        "guideInst": "Tampilan form e-resep dokter dengan pemisah tagihan kronis vs non-kronis, peringatan batas Rp 35.000, panel riwayat pasien & template resep."
    },
    {
        "key": "slide05-b2-skrining-telaah-resep",
        "slide": 13,
        "file": "slide05-b2-skrining-telaah-resep.png",
        "title": "Skrining 14 Poin Telaah Resep & TTD Apoteker",
        "menu": "Transaksi Penjualan → Kasir / Detail Transaksi",
        "route": "/farmasi/sales/1682",
        "guideBadge": "PELAYANAN TAHAP 2",
        "guideIcon": "clipboard-check",
        "guideTarget": "Rujukan Screenshot: Panel 14 Telaah Resep & TTD",
        "guideInst": "Tampilan tabel 14 checklist telaah klinis/administratif bawaan sistem, rekam nama petugas penelaah beserta tanda tangan digital apoteker."
    },
    {
        "key": "slide05-b3-penyiapan-racikan-etiket",
        "slide": 14,
        "file": "slide05-b3-penyiapan-racikan-etiket.png",
        "title": "Penyiapan Obat & Log Waktu Racik",
        "menu": "Transaksi Penjualan → Kasir / Detail Transaksi",
        "route": "/farmasi/sales/1682",
        "guideBadge": "PELAYANAN TAHAP 3",
        "guideIcon": "pill",
        "guideTarget": "Rujukan Screenshot: Log Penyiapan & Rincian Jasa Resep",
        "guideInst": "Tampilan log tahapan pelayanan pada jam penyiapan obat/racik oleh petugas, serta rincian kalkulasi biaya jasa resep per item."
    },
    {
        "key": "slide05-b4-pemeriksaan-akhir-telaah-obat",
        "slide": 15,
        "file": "slide05-b4-pemeriksaan-akhir-telaah-obat.png",
        "title": "Pemeriksaan Akhir (Telaah Obat 5 Tepat & Double-Check)",
        "menu": "Transaksi Penjualan → Kasir / Detail Transaksi",
        "route": "/farmasi/sales/1682",
        "guideBadge": "PELAYANAN TAHAP 4",
        "guideIcon": "check-circle",
        "guideTarget": "Rujukan Screenshot: Telaah Obat 5 Tepat & Timestamp",
        "guideInst": "Tampilan verifikasi checklist 5 tepat sebelum penyerahan obat, tanda tangan digital apoteker, dan audit timestamp jam pengecekan."
    },
    {
        "key": "slide05-b5-penyerahan-handover",
        "slide": 16,
        "file": "slide05-b5-penyerahan-handover.png",
        "title": "Penyerahan Obat (Handover) & Validasi Penerima",
        "menu": "Transaksi Penjualan → Kasir / Detail Transaksi",
        "route": "/farmasi/sales/1682",
        "guideBadge": "PELAYANAN TAHAP 5",
        "guideIcon": "user-check",
        "guideTarget": "Rujukan Screenshot: Form Penyerahan & Timestamp",
        "guideInst": "Tampilan form penyerahan obat, status sudah diserahkan, identitas & no telp penerima, serta log jam penyerahan (17:34)."
    },
    {
        "key": "slide05-b6-edukasi-whatsapp",
        "slide": 17,
        "file": "slide05-b6-edukasi-whatsapp.png",
        "title": "Portal Edukasi Pasien Digital (WhatsApp)",
        "menu": "Portal Edukasi Pasien (Tautan WhatsApp)",
        "route": "/education/portal/clobazam-10mg",
        "guideBadge": "PELAYANAN TAHAP 6",
        "guideIcon": "message-circle",
        "guideTarget": "Rujukan Screenshot: Portal Edukasi Obat Interaktif",
        "guideInst": "Tampilan portal edukasi obat pasien (Clobazam 10mg) dengan aturan minum, peringatan penting, efek samping, dan video panduan YouTube."
    },
    {
        "key": "slide18-hpp-farmasi",
        "slide": 19,
        "file": "slide18-hpp-farmasi.png",
        "title": "Laporan HPP Farmasi Realtime & Rumus Akuntansi",
        "menu": "Laporan → Laporan HPP",
        "route": "/reports/hpp",
        "guideBadge": "HPP & VALUASI",
        "guideIcon": "wallet",
        "guideTarget": "Laporan HPP Farmasi & Formula Baku Persediaan",
        "guideInst": "Tampilan laporan HPP dengan kartu rumus persediaan (awal + beli - akhir = HPP) serta tabel rincian nilai HPP per item obat."
    },
    {
        "key": "slide19-stagnant-stock",
        "slide": 20,
        "file": "slide19-stagnant-stock.png",
        "title": "Laporan Stagnant Stock (Stok Lambat Berputar)",
        "menu": "Laporan → Laporan Stagnan",
        "route": "/reports/stagnant-stock",
        "guideBadge": "STOK STAGNAN",
        "guideIcon": "clock",
        "guideTarget": "Laporan Stagnant Stock & Modal Tertahan 90 Hari",
        "guideInst": "Tampilan laporan stok stagnan dengan ringkasan 15 obat (Rp 167,7 Jt), perbandingan stok multi-gudang vs jumlah terjual 90 hari."
    },
    {
        "key": "slide20-dead-stock",
        "slide": 21,
        "file": "slide20-dead-stock.png",
        "title": "Laporan Dead Stock (Stok Mati Nol Mutasi)",
        "menu": "Laporan → Dead Stock",
        "route": "/reports/dead-stock",
        "guideBadge": "DEATH STOCK",
        "guideIcon": "trash",
        "guideTarget": "Laporan Dead Stock & Mitigasi Nilai Aset",
        "guideInst": "Tampilan 5 item dead stock (Rp 55,65 Jt) tanpa transaksi 90 hari, sebaran gudang, dan klasifikasi pembayaran tunai."
    },
    {
        "key": "slide21-resep-limit-35rb",
        "slide": 22,
        "file": "slide21-resep-limit-35rb.png",
        "title": "Laporan Resep BPJS & Evaluasi Plafon Obat Kronis",
        "menu": "Laporan → Penjualan → Evaluasi Resep BPJS & Obat Kronis",
        "route": "/reports/sales/doctor-prescription-limits",
        "guideBadge": "PLAFON BPJS",
        "guideIcon": "shield-check",
        "guideTarget": "Laporan Resep BPJS & Pemisahan Tagihan Kronis",
        "guideInst": "Tampilan evaluasi resep BPJS dengan pemisahan tagihan kronis vs non-kronis, ringkasan 75 resep over-plafon, dan tabel rekap per DPJP."
    },
    {
        "key": "slide22-kepatuhan-formularium",
        "slide": 23,
        "file": "slide22-kepatuhan-formularium.png",
        "title": "Laporan Kepatuhan & Penjualan Obat Formularium",
        "menu": "Laporan → Penjualan → Penjualan Obat Formularium",
        "route": "/reports/sales/formularium-products",
        "guideBadge": "FORMULARIUM RS",
        "guideIcon": "clipboard-check",
        "guideTarget": "Penjualan Obat & Kepatuhan Formularium Nasional",
        "guideInst": "Tampilan periode 1–30 November 2026, kategori BPJS dan 5 gudang: 20 jenis obat, 180 transaksi obat, kepatuhan F1 + F3 sebesar 94,12% (144 dari 153), serta tabel rincian penjualan obat."
    },
    {
        "key": "slide23-respon-time-spm",
        "slide": 24,
        "file": "slide23-respon-time-spm.png",
        "title": "Laporan Response Time Antrian Pasien (SPM)",
        "menu": "Laporan → Pelayanan → Respon Time Antrian",
        "route": "/reports/queues/response-time",
        "guideBadge": "SPM RESPON TIME",
        "guideIcon": "activity",
        "guideTarget": "Laporan Response Time Antrian Pasien (SPM)",
        "guideInst": "Tampilan kepatuhan SPM farmasi (76.2%), durasi rata-rata per tahapan pelayanan, komparasi resep racik vs non-racik, dan analisis bottleneck."
    },
    {
        "key": "slide24-ddd-antibiotika",
        "slide": 25,
        "file": "slide24-ddd-antibiotika.png",
        "title": "Evaluasi DDD Antibiotika (Metode WHO & PPRA)",
        "menu": "Master Data Obat (DDD) & Laporan PPRA",
        "route": "/medicines",
        "guideBadge": "PPRA & WHO DDD",
        "guideIcon": "pill",
        "guideTarget": "Master DDD Antibiotik & Evaluasi Konsumsi PPRA",
        "guideInst": "Ambil screenshot master data obat dengan kolom nilai DDD (Defined Daily Dose) WHO dan laporan konsumsi antibiotik per kategori AWaRe."
    }
];

if (typeof window !== 'undefined') {
    window.TOTAL_SLIDES = TOTAL_SLIDES;
    window.PRESENTER_NOTES = PRESENTER_NOTES;
    window.TYPEWRITER_PHRASES = TYPEWRITER_PHRASES;
    window.CYCLE_A_STAGES = CYCLE_A_STAGES;
    window.CYCLE_B_STAGES = CYCLE_B_STAGES;
    window.STAGES_B = STAGES_B;
    window.STEPS_11 = STEPS_11;
    window.SCREENSHOT_CONFIG = SCREENSHOT_CONFIG;
}
