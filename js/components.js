/**
 * ObaPay Presentation Web Components
 * Reusable Custom Elements for Zero-Duplication Slide Construction
 */

// 1. SvgIcon Component: <svg-icon name="terminal"></svg-icon>
class SvgIcon extends HTMLElement {
    connectedCallback() {
        const name = this.getAttribute('name') || '';
        const style = this.getAttribute('style') || '';
        const styleAttr = style ? ` style="${style}"` : '';
        this.innerHTML = `<span class="icon-svg"${styleAttr}><svg><use href="#icon-${name}"></use></svg></span>`;
    }
}
customElements.define('svg-icon', SvgIcon);

// 2. SlideTopMeta Component: <slide-top-meta slide="2" badge="Siklus A: Tahap 1 dari 8" icon="package" speaker="Dani Fahmy Rosyid • Logistik Farmasi"></slide-top-meta>
class SlideTopMeta extends HTMLElement {
    connectedCallback() {
        const slide = this.getAttribute('slide') || '';
        const rawBadge = this.getAttribute('badge') || '';
        const icon = this.getAttribute('icon') || 'terminal';
        const speaker = this.getAttribute('speaker') || 'Dani Fahmy Rosyid';

        const badgeText = rawBadge.startsWith('Slide')
            ? rawBadge
            : (slide ? `Slide ${String(slide).padStart(2, '0')} • ${rawBadge}` : rawBadge);
        
        const speakerText = speaker.startsWith('Dani')
            ? speaker
            : `Dani Fahmy Rosyid • ${speaker}`;

        this.innerHTML = `
            <div class="slide-top-meta">
                <span class="slide-badge-pill">
                    <span class="icon-svg"><svg><use href="#icon-${icon}"></use></svg></span>
                    ${badgeText}
                </span>
                <span class="slide-speaker-tag">
                    <span class="icon-svg"><svg><use href="#icon-user-check"></use></svg></span>
                    ${speakerText}
                </span>
            </div>
        `;
    }
}
customElements.define('slide-top-meta', SlideTopMeta);

// 3. CycleANav Component: <cycle-a-nav active="1"></cycle-a-nav>
class CycleANav extends HTMLElement {
    connectedCallback() {
        const active = parseInt(this.getAttribute('active') || '1');
        const stages = window.CYCLE_A_STAGES || [
            { num: 1, slide: 2, icon: 'bar-chart', name: 'Perencanaan Kebutuhan', sub: 'Defecta & Reorder Point' },
            { num: 2, slide: 3, icon: 'wallet', name: 'Penganggaran', sub: 'Estimasi PO & Nilai Stok' },
            { num: 3, slide: 4, icon: 'shopping-cart', name: 'Pengadaan Obat', sub: 'Surat Pesanan PO & Narkotika' },
            { num: 4, slide: 5, icon: 'file-text', name: 'Penerimaan Obat', sub: 'Faktur, Batch & Kadaluarsa' },
            { num: 5, slide: 6, icon: 'layers', name: 'Penyimpanan', sub: 'Multi Gudang & Lokasi Rak' },
            { num: 6, slide: 7, icon: 'repeat', name: 'Distribusi & Penyaluran', sub: 'Transfer Stok Antar Depo' },
            { num: 7, slide: 8, icon: 'shield-check', name: 'Pengendalian Mutu', sub: 'Kartu Stok & Mutasi' },
            { num: 8, slide: 9, icon: 'trash', name: 'Penghapusan Obat', sub: 'Stock Opname & Retur' }
        ];

        let html = '<div class="stage-grid-pzn">';
        stages.forEach(st => {
            const isActive = st.num === active ? ' active' : '';
            html += `
                <div class="stage-card-item${isActive}" onclick="goToSlide(${st.slide})">
                    <div class="stage-header-line">
                        <span class="stage-tag-num">Tahap ${st.num}</span>
                        <span class="stage-icon-mini"><span class="icon-svg"><svg><use href="#icon-${st.icon}"></use></svg></span></span>
                    </div>
                    <div class="stage-name">${st.name}</div>
                    <div class="stage-sub">${st.sub}</div>
                </div>
            `;
        });
        html += '</div>';
        this.innerHTML = html;
    }
}
customElements.define('cycle-a-nav', CycleANav);

// 4. CycleBNav Component: <cycle-b-nav active="B1"></cycle-b-nav>
class CycleBNav extends HTMLElement {
    connectedCallback() {
        const active = this.getAttribute('active') || 'B1';
        const stages = window.CYCLE_B_STAGES || [
            { id: 'B1', icon: 'file-text', name: 'Penerimaan Resep', sub: 'Integrasi E-Resep ERM & Antrian Menunggu' },
            { id: 'B2', icon: 'clipboard-check', name: 'Skrining & Telaah Resep', sub: 'Checklist 14 Poin Klinis & Cek Stok' },
            { id: 'B3', icon: 'pill', name: 'Penyiapan & Peracikan', sub: 'Racikan Puyer/Kapsul & Cetak E-Tiket' },
            { id: 'B4', icon: 'check-circle', name: 'Pemeriksaan Akhir', sub: 'Verifikasi 5 Tepat Telaah Obat & Jam Tahap' },
            { id: 'B5', icon: 'user-check', name: 'Penyerahan ke Pasien', sub: 'Form Handover, Konseling, Retur Rawat Inap' },
            { id: 'B6', icon: 'message-circle', name: 'Edukasi & Dokumentasi', sub: 'Kirim Link Edukasi via WhatsApp Pasien' }
        ];

        let html = '<div class="stage-grid-pzn grid-6col">';
        stages.forEach((st, idx) => {
            const isActive = st.id === active ? ' active' : '';
            html += `
                <div class="stage-card-item${isActive}" onclick="showStageDetailB('${st.id}')">
                    <div class="stage-header-line">
                        <span class="stage-tag-num" style="color: var(--color-electric);">Tahap ${idx + 1}</span>
                        <span class="stage-icon-mini"><span class="icon-svg"><svg><use href="#icon-${st.icon}"></use></svg></span></span>
                    </div>
                    <div class="stage-name">${st.name}</div>
                    <div class="stage-sub">${st.sub}</div>
                </div>
            `;
        });
        html += '</div>';
        this.innerHTML = html;
    }
}
customElements.define('cycle-b-nav', CycleBNav);

// 5. ScreenshotWindow Component: <screenshot-window key="slide05-a1-defecta"></screenshot-window>
class ScreenshotWindow extends HTMLElement {
    connectedCallback() {
        const key = this.getAttribute('key');
        if (!key) return;

        const cfg = (window.SCREENSHOT_CONFIG || (typeof SCREENSHOT_CONFIG !== 'undefined' ? SCREENSHOT_CONFIG : [])).find(c => c.key === key) || {};
        const title = this.getAttribute('title') || cfg.title || 'Tangkapan Layar ObaPay';
        const file = cfg.file || `${key}.png`;
        const route = cfg.route || '';
        const cleanRoute = route.split(' ')[0] || '';
        const menu = cfg.menu || '';
        const badge = cfg.guideBadge || 'OBAPAY';
        const icon = cfg.guideIcon || 'package';
        const target = cfg.guideTarget || `Rujukan: ${title}`;
        const inst = cfg.guideInst || 'Ambil tangkapan layar modul ini pada sistem ObaPay.';
        const customId = this.getAttribute('id') || '';
        const extraClass = this.getAttribute('class') || '';

        const idAttr = customId ? ` id="${customId}"` : '';
        const customStyle = this.getAttribute('style') || '';
        const styleAttr = customStyle ? ` style="${customStyle}"` : '';

        this.innerHTML = `
            <div class="screenshot-window ${extraClass}"${idAttr}${styleAttr} data-key="${key}">
                <div class="window-header">
                    <div class="window-traffic-lights">
                        <span class="traffic-dot dot-close"></span>
                        <span class="traffic-dot dot-minimize"></span>
                        <span class="traffic-dot dot-zoom" title="Klik untuk Zoom / Perbesar Layar"></span>
                    </div>
                    <div class="window-url-bar">obapay.local${cleanRoute}</div>
                    <div style="display: flex; gap: 6px;">
                        <button type="button" class="btn btn-acid btn-zoom-window"
                            style="padding: 2px 8px; font-size: 0.72rem;"
                            title="Klik untuk Zoom / Perbesar Layar">🔍 Zoom</button>
                        <button type="button" class="btn btn-acid" style="padding: 2px 8px; font-size: 0.72rem;"
                            onclick="triggerUpload('${key}')">Ganti</button>
                    </div>
                </div>
                <div class="window-content">
                    <img src="screenshots/${file}" alt="${title}"
                        class="screenshot-real-img" onload="handleImageLoaded(this)"
                        onerror="handleImageError(this, '${key}')">
                    <div class="window-placeholder-guide" id="guide-${key}">
                        <span class="guide-tech-badge">
                            <span class="icon-svg"><svg><use href="#icon-${icon}"></use></svg></span>
                            ${badge}
                        </span>
                        <div class="guide-target-title">${target}</div>
                        <div class="guide-route-box">Menu: ${menu} (${cleanRoute})</div>
                        <p class="guide-instructions-text">${inst}</p>
                        <div class="guide-action-buttons">
                            <button type="button" class="btn btn-acid" onclick="triggerUpload('${key}')">📁 Pilih / Drop Screenshot</button>
                            ${cleanRoute ? `
                            <a href="http://localhost:8000${cleanRoute}" target="_blank" class="btn">
                                Buka Halaman
                                <span class="icon-svg"><svg><use href="#icon-external-link"></use></svg></span>
                            </a>` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}
customElements.define('screenshot-window', ScreenshotWindow);

// 6. WaveBackground Component: <wave-background variant="1|2|3|4" mask="left"></wave-background>
class WaveBackground extends HTMLElement {
    connectedCallback() {
        const maskMode = this.getAttribute('mask') || '';
        const useLeftMask = maskMode === 'left' || this.hasAttribute('mask-text');

        // Determine variant: explicit attribute -> closest slide data-slide -> default '1'
        let variant = this.getAttribute('variant');
        if (!variant) {
            const slideWrap = this.closest('.slide-content-wrap');
            const slideNum = slideWrap?.getAttribute('data-slide');
            variant = slideNum || '1';
        }
        // Normalize variant
        if (variant === 'flow') variant = '1';
        else if (variant === 'crest' || variant === 'horizon') variant = '2';
        else if (variant === 'stream' || variant === 'cascade') variant = '3';
        else if (variant === 'contour' || variant === 'corner') variant = '4';
        else {
            const vInt = parseInt(variant) || 1;
            variant = String(((vInt - 1) % 4) + 1);
        }

        const idSuffix = Math.random().toString(36).substring(2, 8);
        const maskId = `waveMask_${idSuffix}`;
        const gradTopId = `waveGradTop_${idSuffix}`;
        const gradBtm1Id = `waveGradBtm1_${idSuffix}`;
        const gradBtm2Id = `waveGradBtm2_${idSuffix}`;
        const gradBtm3Id = `waveGradBtm3_${idSuffix}`;
        const strokeId = `waveStroke_${idSuffix}`;

        const maskAttr = useLeftMask ? ` mask="url(#${maskId})"` : '';
        const maskDef = useLeftMask ? `
            <mask id="${maskId}">
                <rect width="1440" height="800" fill="white" />
                <rect x="0" y="0" width="580" height="720" fill="black" />
            </mask>
        ` : '';

        // Generate variant-specific paths
        let pathsHtml = '';
        if (variant === '2') {
            pathsHtml = `
                <!-- Variant 2: Crest & Balanced Undulation -->
                <!-- Top-Left Crest -->
                <path d="M0,0 L520,0 C440,90 320,130 180,120 C90,115 30,140 0,160 Z" fill="url(#${gradTopId})" />
                <path d="M520,0 C440,90 320,130 180,120 C90,115 30,140 0,160" stroke="url(#${strokeId})" stroke-width="2.5" stroke-dasharray="8 6" />

                <!-- Top-Right Accent Curve -->
                <path d="M1440,0 L1180,0 C1260,60 1350,75 1440,90 Z" fill="url(#${gradBtm1Id})" />

                <!-- Bottom Layer 1 (Back, sweeping swell) -->
                <path d="M0,640 C320,560 620,740 980,630 C1200,560 1340,640 1440,600 L1440,800 L0,800 Z" fill="url(#${gradBtm1Id})" />
                <path d="M0,640 C320,560 620,740 980,630 C1200,560 1340,640 1440,600" stroke="#2b2be8" stroke-width="2" stroke-opacity="0.35" />

                <!-- Bottom Layer 2 (Mid, dynamic crossing wave) -->
                <path d="M0,710 C280,650 680,690 1020,590 C1240,530 1360,650 1440,620 L1440,800 L0,800 Z" fill="url(#${gradBtm2Id})" />
                <path d="M0,710 C280,650 680,690 1020,590 C1240,530 1360,650 1440,620" stroke="url(#${strokeId})" stroke-width="2.5" stroke-dasharray="10 6" />

                <!-- Bottom Layer 3 (Front, gentle rolling ribbon) -->
                <path d="M0,760 C380,720 760,760 1080,680 C1280,620 1380,700 1440,670 L1440,800 L0,800 Z" fill="url(#${gradBtm3Id})" />
                <path d="M0,760 C380,720 760,760 1080,680 C1280,620 1380,700 1440,670" stroke="#38bdf8" stroke-width="2" stroke-opacity="0.45" />
            `;
        } else if (variant === '3') {
            pathsHtml = `
                <!-- Variant 3: Cascading Diagonal Stream -->
                <!-- Top-Right Cascading Ribbon -->
                <path d="M1440,0 L880,0 C980,90 1140,110 1260,220 C1360,310 1410,410 1440,460 Z" fill="url(#${gradTopId})" />
                <path d="M880,0 C980,90 1140,110 1260,220 C1360,310 1410,410 1440,460" stroke="url(#${strokeId})" stroke-width="2.5" stroke-dasharray="8 6" />

                <!-- Bottom-Left Swelling Wave -->
                <path d="M0,580 C180,560 380,670 640,630 C880,590 1120,720 1440,670 L1440,800 L0,800 Z" fill="url(#${gradBtm1Id})" />
                <path d="M0,580 C180,560 380,670 640,630 C880,590 1120,720 1440,670" stroke="#2b2be8" stroke-width="2" stroke-opacity="0.35" />

                <!-- Bottom Mid Interlocking Wave -->
                <path d="M0,690 C260,650 560,740 880,660 C1140,590 1320,680 1440,630 L1440,800 L0,800 Z" fill="url(#${gradBtm2Id})" />
                <path d="M0,690 C260,650 560,740 880,660 C1140,590 1320,680 1440,630" stroke="url(#${strokeId})" stroke-width="2.5" stroke-dasharray="10 6" />

                <!-- Bottom Front Rolling Wave -->
                <path d="M0,750 C320,730 680,780 1020,710 C1220,660 1360,730 1440,700 L1440,800 L0,800 Z" fill="url(#${gradBtm3Id})" />
                <path d="M0,750 C320,730 680,780 1020,710 C1220,660 1360,730 1440,700" stroke="#38bdf8" stroke-width="2" stroke-opacity="0.45" />
            `;
        } else if (variant === '4') {
            pathsHtml = `
                <!-- Variant 4: Concentric Topographic Swells & Framing -->
                <!-- Top-Left Concentric Contour Layer 1 -->
                <path d="M0,0 L420,0 C380,80 290,150 190,180 C110,205 50,220 0,240 Z" fill="url(#${gradTopId})" />
                <path d="M420,0 C380,80 290,150 190,180 C110,205 50,220 0,240" stroke="url(#${strokeId})" stroke-width="2.5" stroke-dasharray="8 6" />

                <!-- Top-Left Concentric Contour Layer 2 (Inner Ring) -->
                <path d="M0,0 L260,0 C220,55 170,100 110,125 C60,145 25,155 0,165 Z" fill="url(#${gradBtm2Id})" />
                <path d="M260,0 C220,55 170,100 110,125 C60,145 25,155 0,165" stroke="#38bdf8" stroke-width="1.8" stroke-dasharray="6 4" />

                <!-- Bottom-Right Wide Swell Layer 1 (Back) -->
                <path d="M220,800 C480,700 780,550 1060,570 C1240,580 1360,650 1440,680 L1440,800 Z" fill="url(#${gradBtm1Id})" />
                <path d="M220,800 C480,700 780,550 1060,570 C1240,580 1360,650 1440,680" stroke="#2b2be8" stroke-width="2" stroke-opacity="0.35" />

                <!-- Bottom-Right Swell Layer 2 (Mid) -->
                <path d="M460,800 C700,730 940,610 1180,620 C1310,625 1390,680 1440,710 L1440,800 Z" fill="url(#${gradBtm2Id})" />
                <path d="M460,800 C700,730 940,610 1180,620 C1310,625 1390,680 1440,710" stroke="url(#${strokeId})" stroke-width="2.5" stroke-dasharray="10 6" />

                <!-- Bottom-Right Swell Layer 3 (Front) -->
                <path d="M720,800 C920,755 1120,680 1280,685 C1360,688 1410,720 1440,750 L1440,800 Z" fill="url(#${gradBtm3Id})" />
                <path d="M720,800 C920,755 1120,680 1280,685 C1360,688 1410,720 1440,750" stroke="#38bdf8" stroke-width="2" stroke-opacity="0.45" />
            `;
        } else {
            // Variant 1: Sweeping Bottom Surge (Default)
            pathsHtml = `
                <!-- Variant 1: Sweeping Bottom Surge -->
                <!-- 1. Top Right Accent Wave -->
                <path d="M1440,0 L1020,0 C1120,80 1240,130 1350,110 C1390,95 1420,110 1440,140 Z" fill="url(#${gradTopId})" />
                <path d="M1020,0 C1120,80 1240,130 1350,110 C1390,95 1420,110 1440,140" stroke="url(#${strokeId})" stroke-width="2.5" stroke-dasharray="8 6" />

                <!-- 2. Bottom Wave Layer 1 (Back, sweeping up behind cards) -->
                <path d="M0,740 C350,740 600,720 860,500 C1100,380 1280,560 1440,480 L1440,800 L0,800 Z" fill="url(#${gradBtm1Id})" />
                <path d="M0,740 C350,740 600,720 860,500 C1100,380 1280,560 1440,480" stroke="#2b2be8" stroke-width="2" stroke-opacity="0.35" />

                <!-- 3. Bottom Wave Layer 2 (Mid, undulating crossing wave) -->
                <path d="M0,760 C400,760 650,710 940,570 C1180,470 1320,620 1440,550 L1440,800 L0,800 Z" fill="url(#${gradBtm2Id})" />
                <path d="M0,760 C400,760 650,710 940,570 C1180,470 1320,620 1440,550" stroke="url(#${strokeId})" stroke-width="2.5" stroke-dasharray="10 6" />

                <!-- 4. Bottom Wave Layer 3 (Front, lowest rolling wave) -->
                <path d="M0,780 C450,780 700,750 980,650 C1220,570 1350,690 1440,640 L1440,800 L0,800 Z" fill="url(#${gradBtm3Id})" />
                <path d="M0,780 C450,780 700,750 980,650 C1220,570 1350,690 1440,640" stroke="#38bdf8" stroke-width="2" stroke-opacity="0.45" />
            `;
        }

        this.innerHTML = `
            <div class="slide-wave-bg" aria-hidden="true">
                <svg viewBox="0 0 1440 800" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        ${maskDef}
                        <!-- Top Right Wave Gradient -->
                        <linearGradient id="${gradTopId}" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stop-color="#ccff00" stop-opacity="0.25" />
                            <stop offset="50%" stop-color="#38bdf8" stop-opacity="0.18" />
                            <stop offset="100%" stop-color="#2b2be8" stop-opacity="0.14" />
                        </linearGradient>

                        <!-- Bottom Back Wave Gradient -->
                        <linearGradient id="${gradBtm1Id}" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stop-color="#2b2be8" stop-opacity="0.16" />
                            <stop offset="45%" stop-color="#38bdf8" stop-opacity="0.14" />
                            <stop offset="100%" stop-color="#ccff00" stop-opacity="0.18" />
                        </linearGradient>

                        <!-- Bottom Mid Wave Gradient -->
                        <linearGradient id="${gradBtm2Id}" x1="100%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stop-color="#2b2be8" stop-opacity="0.20" />
                            <stop offset="55%" stop-color="#38bdf8" stop-opacity="0.16" />
                            <stop offset="100%" stop-color="#ccff00" stop-opacity="0.22" />
                        </linearGradient>

                        <!-- Bottom Front Wave Gradient -->
                        <linearGradient id="${gradBtm3Id}" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.20" />
                            <stop offset="60%" stop-color="#2b2be8" stop-opacity="0.16" />
                            <stop offset="100%" stop-color="#ccff00" stop-opacity="0.24" />
                        </linearGradient>

                        <!-- Dynamic Wave Stroke Gradient -->
                        <linearGradient id="${strokeId}" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stop-color="#2b2be8" stop-opacity="0.45" />
                            <stop offset="50%" stop-color="#38bdf8" stop-opacity="0.40" />
                            <stop offset="100%" stop-color="#ccff00" stop-opacity="0.55" />
                        </linearGradient>
                    </defs>

                    <g${maskAttr}>
                        ${pathsHtml}
                    </g>
                </svg>
            </div>
        `;
    }
}
customElements.define('wave-background', WaveBackground);
