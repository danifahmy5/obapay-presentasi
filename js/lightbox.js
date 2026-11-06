/**
 * ObaPay Lightbox & Multi-Image Gallery Controller
 */

        // ==========================================
        // ENHANCED LIGHTBOX ZOOM & MULTI-IMAGE GALLERY SYSTEM
        // ==========================================
        let lightboxScale = 1.0;
        let lightboxTranslateX = 0;
        let lightboxTranslateY = 0;
        let isDraggingLightbox = false;
        let dragStartX = 0;
        let dragStartY = 0;
        let dragInitialTranslateX = 0;
        let dragInitialTranslateY = 0;
        let hasDragged = false;
        const MIN_LIGHTBOX_SCALE = 0.5;
        const MAX_LIGHTBOX_SCALE = 3.5;

        const GALLERY_CACHE = new Map();
        let currentGallery = [];
        let currentGalleryIndex = 0;
        let currentGalleryKey = null;
        let currentGalleryBaseCaption = "Tangkapan Layar ObaPay";

        async function detectGalleryImages(key, primarySrc) {
            if (!key) {
                return [{ src: primarySrc, label: 'Gambar 1' }];
            }
            if (GALLERY_CACHE.has(key)) {
                return GALLERY_CACHE.get(key);
            }

            const list = [];
            const seenSrcs = new Set();

            function addImage(src, label) {
                if (src && !seenSrcs.has(src)) {
                    seenSrcs.add(src);
                    list.push({ src, label: label || `Gambar ${list.length + 1}` });
                }
            }

            // 1. Primary image
            if (primarySrc && !primarySrc.endsWith('/') && !primarySrc.endsWith('undefined')) {
                addImage(primarySrc, 'Gambar 1');
            }

            // 2. Probe static filesystem variants first: `screenshots/${baseName}-${i}.${ext}`
            const cfg = SCREENSHOT_CONFIG.find(c => c.key === key);
            let baseFile = cfg ? cfg.file : null;
            if (!baseFile && primarySrc && primarySrc.includes('screenshots/')) {
                baseFile = primarySrc.split('screenshots/')[1].split('?')[0];
            }

            if (baseFile) {
                const lastDot = baseFile.lastIndexOf('.');
                const namePart = lastDot > 0 ? baseFile.substring(0, lastDot) : baseFile;
                const extPart = lastDot > 0 ? baseFile.substring(lastDot + 1) : 'png';

                for (let i = 1; i <= 10; i++) {
                    const candidateUrl = `screenshots/${namePart}-${i}.${extPart}`;
                    if (!seenSrcs.has(candidateUrl)) {
                        const exists = await probeImageExists(candidateUrl);
                        if (exists) {
                            addImage(candidateUrl, `Gambar ${list.length + 1} (${namePart}-${i}.${extPart})`);
                        }
                    }
                }
            }

            // 3. Fallback / append IndexedDB variants: `${key}-1`, `${key}-2`, ..., `${key}-10`
            const allDb = await getAllScreenshotsFromDB();
            const dbMap = new Map(allDb.map(d => [d.key, d.dataUrl]));

            for (let i = 1; i <= 10; i++) {
                const subKey = `${key}-${i}`;
                if (dbMap.has(subKey)) {
                    addImage(dbMap.get(subKey), `Gambar ${list.length + 1} (Upload ${i})`);
                }
            }

            GALLERY_CACHE.set(key, list);
            return list;
        }

        async function openLightbox(src, captionText, key) {
            if (!src || src.endsWith('/') || src.endsWith('undefined')) return;
            const modal = document.getElementById('lightboxModal');
            currentGalleryKey = key || null;
            currentGalleryBaseCaption = captionText || "Tangkapan Layar ObaPay";

            currentGallery = await detectGalleryImages(key, src);
            currentGalleryIndex = 0;

            resetLightboxZoomState();
            applyLightboxTransform();

            renderLightboxGalleryView();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function renderLightboxGalleryView() {
            const hasMultiple = currentGallery.length > 1;
            const pill = document.getElementById('lightboxGalleryPill');
            const arrowL = document.getElementById('lightboxArrowLeft');
            const arrowR = document.getElementById('lightboxArrowRight');
            const topPrev = document.getElementById('lightboxPrevBtnTop');
            const topNext = document.getElementById('lightboxNextBtnTop');
            const thumbStrip = document.getElementById('lightboxThumbStrip');
            const hintGallery = document.getElementById('lightboxHintGallery');
            const hintSep = document.getElementById('lightboxHintGallerySep');

            if (pill) {
                pill.style.display = hasMultiple ? 'inline-block' : 'none';
                pill.innerText = `${currentGalleryIndex + 1} / ${currentGallery.length}`;
            }
            if (arrowL) arrowL.style.display = hasMultiple ? 'flex' : 'none';
            if (arrowR) arrowR.style.display = hasMultiple ? 'flex' : 'none';
            if (topPrev) topPrev.style.display = hasMultiple ? 'inline-flex' : 'none';
            if (topNext) topNext.style.display = hasMultiple ? 'inline-flex' : 'none';
            if (hintGallery) hintGallery.style.display = hasMultiple ? 'inline' : 'none';
            if (hintSep) hintSep.style.display = hasMultiple ? 'inline' : 'none';

            // Build Thumbnail Strip
            if (thumbStrip) {
                if (hasMultiple) {
                    thumbStrip.style.display = 'flex';
                    thumbStrip.innerHTML = currentGallery.map((item, idx) => `
                        <img src="${item.src}" class="lightbox-thumb-item ${idx === currentGalleryIndex ? 'active' : ''}"
                             alt="Thumbnail ${idx + 1}"
                             title="${item.label} (Klik untuk tampilkan)"
                             onclick="selectLightboxGalleryIndex(${idx})">
                    `).join('');
                } else {
                    thumbStrip.style.display = 'none';
                    thumbStrip.innerHTML = '';
                }
            }

            renderLightboxCurrentImage();
        }

        function renderLightboxCurrentImage() {
            if (!currentGallery.length) return;
            const currentItem = currentGallery[currentGalleryIndex];
            const img = document.getElementById('lightboxImg');
            const caption = document.getElementById('lightboxCaption');
            const pill = document.getElementById('lightboxGalleryPill');

            if (img) img.src = currentItem.src;
            if (caption) {
                caption.innerText = currentGallery.length > 1
                    ? `${currentGalleryBaseCaption} — (${currentGalleryIndex + 1} dari ${currentGallery.length})`
                    : currentGalleryBaseCaption;
            }
            if (pill && currentGallery.length > 1) {
                pill.innerText = `${currentGalleryIndex + 1} / ${currentGallery.length}`;
            }

            // Update active thumbnail
            document.querySelectorAll('.lightbox-thumb-item').forEach((thumb, idx) => {
                thumb.classList.toggle('active', idx === currentGalleryIndex);
            });
        }

        function navigateLightboxGallery(delta) {
            if (currentGallery.length <= 1) return;
            currentGalleryIndex = (currentGalleryIndex + delta + currentGallery.length) % currentGallery.length;
            resetLightboxZoomState();
            applyLightboxTransform();
            renderLightboxCurrentImage();
        }

        function selectLightboxGalleryIndex(idx) {
            if (idx < 0 || idx >= currentGallery.length) return;
            currentGalleryIndex = idx;
            resetLightboxZoomState();
            applyLightboxTransform();
            renderLightboxCurrentImage();
        }

        function resetLightboxZoomState() {
            lightboxScale = 1.0;
            lightboxTranslateX = 0;
            lightboxTranslateY = 0;
            isDraggingLightbox = false;
            hasDragged = false;
        }

        function closeLightboxDirect() {
            const modal = document.getElementById('lightboxModal');
            if (modal) {
                modal.classList.remove('active');
            }
            resetLightboxZoomState();
            applyLightboxTransform();
            document.body.style.overflow = '';
        }

        function handleLightboxBackdropClick(e) {
            if (e.target.id === 'lightboxModal' || e.target.id === 'lightboxViewport') {
                closeLightboxDirect();
            }
        }

        function handleLightboxViewportClick(e) {
            if (e.target.id === 'lightboxViewport') {
                closeLightboxDirect();
            }
        }

        function handleLightboxImageClick(e) {
            e.stopPropagation();
            // Jika user baru saja menggeser (drag), abaikan klik agar tidak toggle zoom
            if (hasDragged) {
                hasDragged = false;
                return;
            }
            if (lightboxScale === 1.0) {
                lightboxScale = 1.75;
            } else {
                lightboxScale = 1.0;
                lightboxTranslateX = 0;
                lightboxTranslateY = 0;
            }
            applyLightboxTransform();
        }

        function adjustLightboxZoom(delta) {
            const newScale = Math.min(MAX_LIGHTBOX_SCALE, Math.max(MIN_LIGHTBOX_SCALE, Math.round((lightboxScale + delta) * 100) / 100));
            if (newScale <= 1.0) {
                lightboxTranslateX = 0;
                lightboxTranslateY = 0;
            }
            lightboxScale = newScale;
            applyLightboxTransform();
        }

        function resetLightboxZoom() {
            resetLightboxZoomState();
            applyLightboxTransform();
        }

        function applyLightboxTransform() {
            const img = document.getElementById('lightboxImg');
            const percentLabel = document.getElementById('lightboxZoomPercent');
            if (img) {
                img.style.transform = `translate(${lightboxTranslateX}px, ${lightboxTranslateY}px) scale(${lightboxScale})`;
                if (lightboxScale > 1.0) {
                    img.classList.add('is-scaled');
                } else {
                    img.classList.remove('is-scaled');
                }
            }
            if (percentLabel) {
                percentLabel.innerText = `${Math.round(lightboxScale * 100)}%`;
            }
        }

        // Dragging & Panning Implementation for Zoomed Lightbox Image
        function initLightboxDrag() {
            const img = document.getElementById('lightboxImg');
            if (!img) return;

            img.addEventListener('pointerdown', (e) => {
                if (lightboxScale <= 1.0) return;
                // Hanya tangani klik kiri / primary touch
                if (e.button !== 0 && e.pointerType === 'mouse') return;

                isDraggingLightbox = true;
                hasDragged = false;
                dragStartX = e.clientX;
                dragStartY = e.clientY;
                dragInitialTranslateX = lightboxTranslateX;
                dragInitialTranslateY = lightboxTranslateY;

                img.classList.add('is-dragging');
                try {
                    img.setPointerCapture(e.pointerId);
                } catch (err) {}
                e.preventDefault();
            });

            img.addEventListener('pointermove', (e) => {
                if (!isDraggingLightbox) return;
                const deltaX = e.clientX - dragStartX;
                const deltaY = e.clientY - dragStartY;

                // Threshold agar getaran kecil saat klik tidak dianggap drag
                if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
                    hasDragged = true;
                }

                lightboxTranslateX = dragInitialTranslateX + deltaX;
                lightboxTranslateY = dragInitialTranslateY + deltaY;
                applyLightboxTransform();
            });

            const stopDrag = (e) => {
                if (!isDraggingLightbox) return;
                isDraggingLightbox = false;
                img.classList.remove('is-dragging');
                try {
                    if (e && img.hasPointerCapture(e.pointerId)) {
                        img.releasePointerCapture(e.pointerId);
                    }
                } catch (err) {}
            };

            img.addEventListener('pointerup', stopDrag);
            img.addEventListener('pointercancel', stopDrag);
        }

        // Initialize drag listeners when DOM is loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initLightboxDrag);
        } else {
            initLightboxDrag();
        }

        // Mouse Wheel (Scroll) Zoom inside Lightbox Viewport
        document.addEventListener('wheel', (e) => {
            const modal = document.getElementById('lightboxModal');
            if (modal && modal.classList.contains('active')) {
                const viewport = document.getElementById('lightboxViewport');
                if (viewport && (viewport.contains(e.target) || e.target.id === 'lightboxImg')) {
                    e.preventDefault();
                    if (e.deltaY < 0) {
                        adjustLightboxZoom(0.15);
                    } else {
                        adjustLightboxZoom(-0.15);
                    }
                }
            }
        }, {passive: false});

        // Global Click Trigger for Screenshot Zoom In (with multi-image gallery detection)
        document.addEventListener('click', (e) => {
            // 1. Klik langsung pada gambar screenshot
            if (e.target.classList.contains('screenshot-real-img')) {
                const img = e.target;
                if (img.style.display !== 'none' && img.src && !img.src.endsWith('/')) {
                    const win = img.closest('.screenshot-window') || img.closest('[data-key]');
                    const key = win?.getAttribute('data-key');
                    const caption = img.alt || win?.querySelector('.guide-target-title')?.innerText || "Tangkapan Layar ObaPay";
                    openLightbox(img.src, caption, key);
                    return;
                }
            }

            // 2. Klik pada zoom overlay badge di pojok gambar
            const overlay = e.target.closest('.zoom-indicator-overlay');
            if (overlay) {
                const win = overlay.closest('.screenshot-window') || overlay.closest('[data-key]');
                const img = win?.querySelector('.screenshot-real-img');
                if (img && img.style.display !== 'none' && img.src) {
                    const key = win?.getAttribute('data-key');
                    const caption = img.alt || win?.querySelector('.guide-target-title')?.innerText || "Tangkapan Layar ObaPay";
                    openLightbox(img.src, caption, key);
                    return;
                }
            }

            // 3. Klik pada tombol hijau dot-zoom di traffic lights window
            if (e.target.classList.contains('dot-zoom')) {
                const win = e.target.closest('.screenshot-window') || e.target.closest('[data-key]');
                const img = win?.querySelector('.screenshot-real-img');
                if (img && img.style.display !== 'none' && img.src) {
                    const key = win?.getAttribute('data-key');
                    const caption = img.alt || win?.querySelector('.guide-target-title')?.innerText || "Tangkapan Layar ObaPay";
                    openLightbox(img.src, caption, key);
                } else {
                    alert('Screenshot belum tersedia untuk diperbesar.');
                }
                return;
            }

            // 4. Klik pada tombol Zoom di header window
            const zoomBtn = e.target.closest('.btn-zoom-window');
            if (zoomBtn) {
                const win = zoomBtn.closest('.screenshot-window') || zoomBtn.closest('[data-key]');
                const img = win?.querySelector('.screenshot-real-img');
                if (img && img.style.display !== 'none' && img.src) {
                    const key = win?.getAttribute('data-key');
                    const caption = img.alt || win?.querySelector('.guide-target-title')?.innerText || "Tangkapan Layar ObaPay";
                    openLightbox(img.src, caption, key);
                } else {
                    alert('Screenshot belum tersedia untuk diperbesar.');
                }
                return;
            }
        });

