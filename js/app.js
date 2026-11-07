/**
 * ObaPay Presentation Application Controller
 * Handles Navigation, Lifecycle, Event Listeners, and Interactive Controls
 */

let currentSlide = 1;
let isGuideMode = true;
let activeUploadTargetKey = null;
let currentStageB = 'B2';
let currentStep11 = 1;
let isLaserPointerActive = true;
let laserPointerEl = null;
let currentZoom = 1.0;
const MIN_ZOOM = 0.6;
const MAX_ZOOM = 1.6;
const ZOOM_STEP = 0.1;

        function goToSlide(n) {
            if (n < 1 || n > TOTAL_SLIDES) return;
            currentSlide = n;

            document.querySelectorAll('.slide-content-wrap').forEach((el) => {
                el.classList.remove('active');
            });
            const activeSlideEl = document.querySelector(`.slide-content-wrap[data-slide="${currentSlide}"]`);
            if (activeSlideEl) {
                activeSlideEl.classList.add('active');
            }

            document.getElementById('currentSlideNum').innerText = currentSlide;
            const totalSlideEl = document.getElementById('totalSlideNum');
            if (totalSlideEl) {
                totalSlideEl.innerText = TOTAL_SLIDES;
            }
            document.getElementById('slideSelectDropdown').value = currentSlide;
            const progressPct = ((currentSlide) / TOTAL_SLIDES) * 100;
            document.getElementById('slideProgressFill').style.width = `${progressPct}%`;

            document.getElementById('notesContentText').innerText = PRESENTER_NOTES[currentSlide] || "Tidak ada narasi spesifik.";
            localStorage.setItem('obapay_ppt_current_slide', currentSlide);
            try {
                if (window.location.protocol !== 'file:' || window.location.hash) {
                    if (window.history && window.history.replaceState) {
                        window.history.replaceState(null, '', `#slide-${currentSlide}`);
                    }
                }
            } catch (e) {
                // Safe fallback for file:// protocol restrictions
            }

            // Typewriter animation control for Slide 1
            if (currentSlide === 1) {
                resumeTypewriter();
            } else {
                pauseTypewriter();
            }
        }



        let twPhraseIdx = 0;
        let twCharIdx = TYPEWRITER_PHRASES[0].length;
        let twIsDeleting = true; // ready to delete after the initial reading pause
        let twTimer = null;

        function runTypewriterTick() {
            if (currentSlide !== 1) {
                twTimer = null;
                return;
            }

            const target = document.getElementById('typewriterWord');
            if (!target) return;

            const currentPhrase = TYPEWRITER_PHRASES[twPhraseIdx];

            if (twIsDeleting) {
                twCharIdx--;
                target.textContent = currentPhrase.substring(0, twCharIdx);

                if (twCharIdx <= 0) {
                    twIsDeleting = false;
                    twPhraseIdx = (twPhraseIdx + 1) % TYPEWRITER_PHRASES.length;
                    twTimer = setTimeout(runTypewriterTick, 380); // pause on blank before typing next word
                    return;
                }
                twTimer = setTimeout(runTypewriterTick, 35); // backspacing speed
            } else {
                twCharIdx++;
                target.textContent = currentPhrase.substring(0, twCharIdx);

                if (twCharIdx >= currentPhrase.length) {
                    twIsDeleting = true;
                    twTimer = setTimeout(runTypewriterTick, 2400); // pause on full phrase for comfortable reading
                    return;
                }
                const typingSpeed = 65 + Math.floor(Math.random() * 25); // realistic human typing cadence (65-90ms)
                twTimer = setTimeout(runTypewriterTick, typingSpeed);
            }
        }

        function resumeTypewriter() {
            if (!twTimer && currentSlide === 1) {
                twTimer = setTimeout(runTypewriterTick, 1400);
            }
        }

        function pauseTypewriter() {
            if (twTimer) {
                clearTimeout(twTimer);
                twTimer = null;
            }
        }

        function initTypewriter() {
            const twEl = document.getElementById('typewriterWord');
            const twBox = document.getElementById('typewriterBox');
            const clickTarget = twBox || twEl;

            if (clickTarget) {
                clickTarget.style.cursor = 'pointer';
                clickTarget.title = 'Klik untuk langsung berganti ke kata kunci berikutnya';
                clickTarget.addEventListener('click', () => {
                    if (twTimer) clearTimeout(twTimer);
                    twPhraseIdx = (twPhraseIdx + 1) % TYPEWRITER_PHRASES.length;
                    twCharIdx = TYPEWRITER_PHRASES[twPhraseIdx].length;
                    if (twEl) twEl.textContent = TYPEWRITER_PHRASES[twPhraseIdx];
                    twIsDeleting = true;
                    twTimer = setTimeout(runTypewriterTick, 2400);
                });
            }
            if (currentSlide === 1) {
                resumeTypewriter();
            }
        }


        function nextSlide() {
            if (currentSlide < TOTAL_SLIDES) goToSlide(currentSlide + 1);
        }

        function prevSlide() {
            if (currentSlide > 1) goToSlide(currentSlide - 1);
        }

        function toggleNotesDrawer() {
            const drawer = document.getElementById('presenterDrawer');
            const icon = document.getElementById('notesToggleIcon');
            if (!drawer) return;
            drawer.classList.toggle('collapsed');
            if (icon) {
                icon.innerText = drawer.classList.contains('collapsed') ? "▲ Buka Narasi" : "▼ Ciutkan";
            }
        }

        function toggleGuideMode() {
            isGuideMode = !isGuideMode;
            const label = document.getElementById('guideModeLabel');
            if (label) {
                label.innerText = isGuideMode ? "Mode Panduan: ON" : "Mode Presentasi: BERSIH";
            }
            applyGuideMode();
        }

        function applyGuideMode() {
            document.querySelectorAll('.window-placeholder-guide').forEach(guide => {
                const img = guide.parentElement.querySelector('.screenshot-real-img');
                if (img && img.dataset.loaded === 'true') {
                    guide.style.display = 'none';
                    img.style.display = 'block';
                } else {
                    guide.style.display = 'flex';
                    if (img) img.style.display = 'none';
                }
            });
        }

        function handleImageLoaded(img) {
            if (!img) return;
            img.dataset.loaded = 'true';
            img.style.display = 'block';
            const frame = img.closest('.screenshot-window') || img.parentElement;
            if (frame) {
                const guide = frame.querySelector('.window-placeholder-guide');
                if (guide) guide.style.display = 'none';
                const content = frame.querySelector('.window-content');
                if (content && !content.querySelector('.zoom-indicator-overlay')) {
                    const overlay = document.createElement('div');
                    overlay.className = 'zoom-indicator-overlay';
                    overlay.innerHTML = '<span class="icon-svg"><svg><use href="#icon-maximize"></use></svg></span> <span>🔍 Klik untuk Perbesar</span>';
                    content.appendChild(overlay);
                }
            }
            updateChecklistCount();
        }

        function handleImageError(imgEl, key) {
            imgEl.dataset.loaded = 'false';
            imgEl.style.display = 'none';
            const guide = document.getElementById(`guide-${key}`);
            if (guide) guide.style.display = 'flex';
            const frame = imgEl.closest('.screenshot-window');
            if (frame) {
                const overlay = frame.querySelector('.zoom-indicator-overlay');
                if (overlay) overlay.remove();
            }
            updateChecklistCount();
        }

        async function checkAndApplyImage(key) {
            const frame = document.querySelector(`.screenshot-window[data-key="${key}"]`);
            if (!frame) return;

            const img = frame.querySelector('.screenshot-real-img');
            const guide = frame.querySelector('.window-placeholder-guide');

            // 1. Prioritaskan File Fisik (screenshots/{key}.png)
            const fileExists = await probeImageExists(`screenshots/${key}.png`);
            if (fileExists) {
                img.src = `screenshots/${key}.png`;
                handleImageLoaded(img);
                return true;
            }

            // 2. Fallback ke IndexedDB jika file fisik belum ada
            const dbData = await getScreenshotFromDB(key);
            if (dbData) {
                img.src = dbData;
                handleImageLoaded(img);
                return true;
            }

            // 3. Jika keduanya tidak ditemukan, tampilkan panduan placeholder
            handleImageError(img, key);
            return false;
        }


        function switchSlide1Device(mode) {
            const btnBoth = document.getElementById('btnModeBoth');
            const btnDesktop = document.getElementById('btnModeDesktop');
            const btnMobile = document.getElementById('btnModeMobile');
            const winDesktop = document.getElementById('winDesktopSlide1');
            const winMobile = document.getElementById('winMobileSlide1');
            const deviceContainer = document.getElementById('slide1DeviceContainer');

            deviceContainer?.classList.toggle('is-both', mode !== 'desktop' && mode !== 'mobile');

            [btnBoth, btnDesktop, btnMobile].forEach(btn => btn?.classList.remove('active'));

            if (mode === 'desktop') {
                btnDesktop?.classList.add('active');
                if (winDesktop) winDesktop.style.display = 'flex';
                if (winMobile) winMobile.style.display = 'none';
            } else if (mode === 'mobile') {
                btnMobile?.classList.add('active');
                if (winDesktop) winDesktop.style.display = 'none';
                if (winMobile) winMobile.style.display = 'flex';
            } else {
                btnBoth?.classList.add('active');
                if (winDesktop) winDesktop.style.display = 'flex';
                if (winMobile) winMobile.style.display = 'flex';
            }
        }


        function triggerUpload(key) {
            activeUploadTargetKey = key;
            const input = document.getElementById('globalImageInput');
            input.value = '';
            input.click();
        }

        document.getElementById('globalImageInput').addEventListener('change', async (e) => {
            const files = Array.from(e.target.files || []);
            if (!files.length || !activeUploadTargetKey) return;

            const readAsDataUrl = (file) => new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (ev) => resolve(ev.target.result);
                reader.readAsDataURL(file);
            });

            // Save each file: first file as primary key, subsequent files as key-1, key-2, etc.
            for (let i = 0; i < files.length; i++) {
                const dataUrl = await readAsDataUrl(files[i]);
                const saveKey = i === 0 ? activeUploadTargetKey : `${activeUploadTargetKey}-${i}`;
                await saveScreenshotToDB(saveKey, dataUrl);
            }

            GALLERY_CACHE.delete(activeUploadTargetKey);

            // Re-apply primary image to DOM
            await checkAndApplyImage(activeUploadTargetKey);

            if (activeUploadTargetKey.startsWith('slide05-a')) {
                const imgA = document.getElementById('imgStageA');
                if (imgA) {
                    const primary = await getScreenshotFromDB(activeUploadTargetKey);
                    if (primary) {
                        imgA.src = primary;
                        handleImageLoaded(imgA);
                    }
                }
            }
            if (activeUploadTargetKey.startsWith('slide05-b')) {
                const imgB = document.getElementById('imgStageB');
                if (imgB) {
                    const primary = await getScreenshotFromDB(activeUploadTargetKey);
                    if (primary) {
                        imgB.src = primary;
                        handleImageLoaded(imgB);
                    }
                }
            }

            updateChecklistCount();
            renderChecklistTable();
            e.target.value = '';
        });


        function showStageDetailB(id) {
            currentStageB = id;
            const data = STAGES_B[id];
            if (!data) return;

            document.querySelectorAll('#panel-cycleB .stage-card-item').forEach((b, idx) => {
                b.classList.toggle('active', (idx + 1) === parseInt(id.replace('B', '')));
            });

            const badgeEl = document.getElementById('stageBadgeB');
            if (badgeEl) {
                badgeEl.innerHTML = `
                    <span class="icon-svg"><svg><use href="#icon-pill"></use></svg></span>
                    ${data.badge}
                `;
            }
            const titleEl = document.getElementById('stageTitleB');
            if (titleEl) titleEl.innerText = data.title;
            const descEl = document.getElementById('stageDescB');
            if (descEl) descEl.innerHTML = data.desc;
            const menuEl = document.getElementById('stageMenuB');
            if (menuEl) menuEl.innerText = data.menu;
            const routeEl = document.getElementById('stageRouteB');
            if (routeEl) routeEl.innerText = data.route;

            const frame = document.getElementById('frameStageB');
            if (frame) {
                frame.setAttribute('data-key', data.key);
                const frameTitle = document.getElementById('frameTitleB');
                if (frameTitle) frameTitle.innerText = `obapay.local${data.route.split(' ')[0]}`;
                const guideTarget = document.getElementById('guideTargetB');
                if (guideTarget) guideTarget.innerText = `Rujukan Screenshot: ${data.title}`;
                const guideBadge = document.getElementById('guideBadgeB');
                if (guideBadge) guideBadge.innerText = `Menu: ${data.menu} (\`${data.route}\`)`;
                const guideLink = document.getElementById('guideLinkB');
                if (guideLink) guideLink.href = `http://localhost:8000${data.route.split(' ')[0]}`;
                checkAndApplyImage(data.key);
            }
        }

        function triggerUploadCurrentB() {
            const data = STAGES_B[currentStageB];
            if (data) triggerUpload(data.key);
        }

        function switchCycleTab(tab) {
            document.querySelectorAll('.cycle-tab-btn').forEach((b) => b.classList.remove('active'));
            document.querySelectorAll('.cycle-panel-view').forEach(p => p.classList.remove('active'));

            if (tab === 'cycleA') {
                const btn = document.querySelectorAll('.cycle-tab-btn')[0];
                if (btn) btn.classList.add('active');
                const panel = document.getElementById('panel-cycleA');
                if (panel) panel.classList.add('active');
            } else if (tab === 'cycleB') {
                const btn = document.querySelectorAll('.cycle-tab-btn')[1];
                if (btn) btn.classList.add('active');
                const panel = document.getElementById('panel-cycleB');
                if (panel) panel.classList.add('active');
                showStageDetailB(currentStageB);
            } else {
                const btn = document.querySelectorAll('.cycle-tab-btn')[2];
                if (btn) btn.classList.add('active');
                const panel = document.getElementById('panel-cycleMap');
                if (panel) panel.classList.add('active');
            }
        }


        function switchStep11(step) {
            currentStep11 = step;
            const data = (typeof STEPS_11 !== 'undefined') ? STEPS_11[step] : null;
            if (!data) return;

            document.querySelectorAll('.stage-card-item').forEach((box, idx) => {
                box.classList.toggle('active', (idx + 1) === step);
            });

            const titleEl = document.getElementById('step11TitleText');
            if (titleEl) titleEl.innerText = `obapay.local${data.route.split(' ')[0]}`;
            const targetEl = document.getElementById('step11GuideTarget');
            if (targetEl) targetEl.innerText = `Rujukan: ${data.title}`;
            const badgeEl = document.getElementById('step11GuideBadge');
            if (badgeEl) badgeEl.innerText = `Menu: ${data.menu} (\`${data.route}\`)`;
            const instEl = document.getElementById('step11GuideInst');
            if (instEl) instEl.innerText = data.inst;
            const linkEl = document.getElementById('step11GuideLink');
            if (linkEl) linkEl.href = `http://localhost:8000${data.route.split(' ')[0]}`;

            const frame = document.getElementById('frameStep11');
            if (frame) {
                frame.setAttribute('data-key', data.key);
                checkAndApplyImage(data.key);
            }
        }

        function triggerUploadCurrentStep11() {
            const data = (typeof STEPS_11 !== 'undefined') ? STEPS_11[currentStep11] : null;
            if (data) triggerUpload(data.key);
        }


        /**
         * Checklist Modal & Status Counting
         */
        function openChecklistModal() {
            renderChecklistTable();
            document.getElementById('modalChecklist').classList.add('active');
        }

        function closeChecklistModal() {
            document.getElementById('modalChecklist').classList.remove('active');
        }

        async function updateChecklistCount() {
            let available = 0;
            const allDb = await getAllScreenshotsFromDB();
            const dbKeys = new Set(allDb.map(d => d.key));

            for (const item of SCREENSHOT_CONFIG) {
                if (dbKeys.has(item.key)) {
                    available++;
                } else {
                    const frame = document.querySelector(`.screenshot-window[data-key="${item.key}"]`);
                    if (frame) {
                        const img = frame.querySelector('.screenshot-real-img');
                        if (img && img.dataset.loaded === 'true') {
                            available++;
                        }
                    }
                }
            }
            const countEl = document.getElementById('availableScreenshotCount');
            if (countEl) countEl.innerText = available;
        }

        async function renderChecklistTable() {
            const tbody = document.getElementById('checklistTableBody');
            tbody.innerHTML = '';

            const allDb = await getAllScreenshotsFromDB();
            const dbMap = new Map(allDb.map(d => [d.key, d.dataUrl]));

            SCREENSHOT_CONFIG.forEach((item) => {
                const tr = document.createElement('tr');
                const hasImg = dbMap.has(item.key);

                tr.innerHTML = `
                    <td>
                        <span class="badge-status ${hasImg ? 'ready' : 'empty'}">
                            <span class="icon-svg"><svg><use href="${hasImg ? '#icon-check-circle' : '#icon-alert-triangle'}"></use></svg></span>
                            ${hasImg ? 'Siap' : 'Kosong'}
                        </span>
                    </td>
                    <td><strong style="font-family: var(--font-display);">Slide ${item.slide}</strong></td>
                    <td><code style="font-family: var(--font-mono); font-size: 0.78rem;">${item.file}</code></td>
                    <td>${item.menu}</td>
                    <td><a href="http://localhost:8000${item.route.split(' ')[0]}" target="_blank" style="color: var(--color-electric); text-decoration: none; font-weight: 600; font-family: var(--font-mono);">${item.route} ↗</a></td>
                    <td>
                        <button class="btn btn-acid" style="padding: 3px 8px; font-size: 0.75rem;" onclick="triggerUpload('${item.key}')">
                            📁 Upload
                        </button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        }


        async function exportStandaloneHtml() {
            const allDb = await getAllScreenshotsFromDB();
            const dbMap = new Map(allDb.map(d => [d.key, d.dataUrl]));

            let htmlContent = document.documentElement.outerHTML;

            SCREENSHOT_CONFIG.forEach(item => {
                if (dbMap.has(item.key)) {
                    const dataUrl = dbMap.get(item.key);
                    const regex = new RegExp(`src="screenshots\/${item.file}"`, 'g');
                    htmlContent = htmlContent.replace(regex, `src="${dataUrl}" data-loaded="true" style="display:block;"`);
                }
            });

            const blob = new Blob([htmlContent], {type: 'text/html;charset=utf-8'});
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'presentasi-smart-pharmacy-pzn-obapay.html';
            a.click();
            URL.revokeObjectURL(url);
        }


        /**
         * Keyboard Shortcuts
         */
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

            // If Lightbox Zoom is active, prioritize gallery & zoom keys
            if (document.getElementById('lightboxModal')?.classList.contains('active')) {
                if (e.key === 'ArrowRight' || e.key === 'PageDown') {
                    e.preventDefault();
                    navigateLightboxGallery(1);
                    return;
                } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
                    e.preventDefault();
                    navigateLightboxGallery(-1);
                    return;
                } else if (e.key === '+' || e.key === '=') {
                    e.preventDefault();
                    adjustLightboxZoom(0.25);
                    return;
                } else if (e.key === '-' || e.key === '_') {
                    e.preventDefault();
                    adjustLightboxZoom(-0.25);
                    return;
                } else if (e.key === '0') {
                    e.preventDefault();
                    resetLightboxZoom();
                    return;
                } else if (e.key === 'Escape') {
                    e.preventDefault();
                    closeLightboxDirect();
                    return;
                }
            }

            if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
                e.preventDefault();
                nextSlide();
            } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
                e.preventDefault();
                prevSlide();
            } else if (e.key === 'Home') {
                e.preventDefault();
                goToSlide(1);
            } else if (e.key === 'End') {
                e.preventDefault();
                goToSlide(TOTAL_SLIDES);
            } else if (e.key === 'f' || e.key === 'F') {
                e.preventDefault();
                toggleFullscreen();
            } else if (e.key === 'n' || e.key === 'N') {
                e.preventDefault();
                toggleNotesDrawer();
            } else if (e.key === 'g' || e.key === 'G') {
                e.preventDefault();
                toggleGuideMode();
            } else if (e.key === 'l' || e.key === 'L') {
                e.preventDefault();
                toggleLaserPointer();
            } else if ((e.ctrlKey || e.metaKey) && (e.key === '=' || e.key === '+')) {
                e.preventDefault();
                zoomIn();
            } else if ((e.ctrlKey || e.metaKey) && (e.key === '-' || e.key === '_')) {
                e.preventDefault();
                zoomOut();
            } else if ((e.ctrlKey || e.metaKey) && e.key === '0') {
                e.preventDefault();
                resetZoom();
            } else if (!e.ctrlKey && !e.metaKey && (e.key === '+' || e.key === '=')) {
                const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
                if (tag !== 'input' && tag !== 'textarea' && tag !== 'select') {
                    e.preventDefault();
                    zoomIn();
                }
            } else if (!e.ctrlKey && !e.metaKey && (e.key === '-' || e.key === '_')) {
                const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
                if (tag !== 'input' && tag !== 'textarea' && tag !== 'select') {
                    e.preventDefault();
                    zoomOut();
                }
            } else if (e.key === 'Escape') {
                closeChecklistModal();
                closeLightboxDirect();
            }
        });

        function toggleFullscreen() {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(err => console.log(err));
            } else {
                document.exitFullscreen().catch(err => console.log(err));
            }
        }

        /**
         * Laser Pointer / High-Visibility Presenter Cursor
         */
        function applyLaserPointerState() {
            const btn = document.getElementById('btnLaserPointer');
            if (isLaserPointerActive) {
                document.body.classList.add('laser-pointer-active');
                if (btn) btn.classList.add('active');
                if (laserPointerEl) laserPointerEl.style.display = 'block';
            } else {
                document.body.classList.remove('laser-pointer-active');
                if (btn) btn.classList.remove('active');
                if (laserPointerEl) laserPointerEl.style.display = 'none';
            }
            try {
                localStorage.setItem('obapay_ppt_laser_pointer', isLaserPointerActive ? '1' : '0');
            } catch (e) {}
        }

        function toggleLaserPointer() {
            isLaserPointerActive = !isLaserPointerActive;
            applyLaserPointerState();
        }

        function initLaserPointer() {
            const saved = localStorage.getItem('obapay_ppt_laser_pointer');
            if (saved !== null) {
                isLaserPointerActive = saved === '1';
            }

            // Create laser pointer DOM elements if not already present
            let existing = document.getElementById('presentationLaserPointer');
            if (!existing) {
                existing = document.createElement('div');
                existing.id = 'presentationLaserPointer';
                existing.className = 'presentation-laser-pointer';
                existing.innerHTML = '<span class="laser-halo"></span><span class="laser-dot"></span>';
                document.body.appendChild(existing);
            }
            laserPointerEl = existing;

            let mouseX = -100;
            let mouseY = -100;
            let currentX = -100;
            let currentY = -100;
            let isMouseInside = false;
            let rafId = null;

            function renderLaser() {
                if (isLaserPointerActive && isMouseInside) {
                    currentX += (mouseX - currentX) * 0.45;
                    currentY += (mouseY - currentY) * 0.45;
                    laserPointerEl.style.left = `${currentX}px`;
                    laserPointerEl.style.top = `${currentY}px`;
                    laserPointerEl.style.opacity = '1';
                } else if (laserPointerEl) {
                    laserPointerEl.style.opacity = '0';
                }
                rafId = requestAnimationFrame(renderLaser);
            }

            window.addEventListener('mousemove', (e) => {
                mouseX = e.clientX / currentZoom;
                mouseY = e.clientY / currentZoom;
                isMouseInside = true;
                if (!rafId) {
                    currentX = mouseX;
                    currentY = mouseY;
                    rafId = requestAnimationFrame(renderLaser);
                }
            }, { passive: true });

            document.addEventListener('mouseleave', () => {
                isMouseInside = false;
            });

            document.addEventListener('mouseenter', () => {
                isMouseInside = true;
            });

            // Click ripple effect
            window.addEventListener('mousedown', (e) => {
                if (!isLaserPointerActive) return;
                const ripple = document.createElement('div');
                ripple.className = 'laser-click-ripple';
                ripple.style.left = `${e.clientX / currentZoom}px`;
                ripple.style.top = `${e.clientY / currentZoom}px`;
                document.body.appendChild(ripple);
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            }, { passive: true });

            applyLaserPointerState();
        }

        /**
         * Presentation Zoom Controls (Ctrl + / - Simulator)
         */
        function applyZoom(newZoom) {
            currentZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Math.round(newZoom * 10) / 10));
            document.body.style.zoom = currentZoom;

            // Keep the scaled page at least as tall as the viewport so the footer stays at the bottom.
            document.body.style.minHeight = `${100 / currentZoom}vh`;

            // Fallback for browsers that don't support style.zoom (modern Firefox 126+ & Chromium do)
            if (!('zoom' in document.body.style)) {
                document.body.style.transform = `scale(${currentZoom})`;
                document.body.style.transformOrigin = 'top center';
            }

            const zoomDisplay = document.getElementById('zoomLevelDisplay');
            if (zoomDisplay) {
                zoomDisplay.innerText = `${Math.round(currentZoom * 100)}%`;
            }
            try {
                localStorage.setItem('obapay_ppt_zoom_level', currentZoom.toString());
            } catch (e) {}
        }

        function zoomIn() {
            applyZoom(currentZoom + ZOOM_STEP);
        }

        function zoomOut() {
            applyZoom(currentZoom - ZOOM_STEP);
        }

        function resetZoom() {
            applyZoom(1.0);
        }

        function initZoom() {
            const saved = localStorage.getItem('obapay_ppt_zoom_level');
            if (saved) {
                const val = parseFloat(saved);
                if (!isNaN(val) && val >= MIN_ZOOM && val <= MAX_ZOOM) {
                    applyZoom(val);
                    return;
                }
            }
            applyZoom(1.0);
        }

        document.getElementById('slideSelectDropdown')?.addEventListener('change', (e) => {
            goToSlide(parseInt(e.target.value));
        });

        document.getElementById('btnNextSlide')?.addEventListener('click', nextSlide);
        document.getElementById('btnPrevSlide')?.addEventListener('click', prevSlide);
        document.getElementById('btnLaserPointer')?.addEventListener('click', toggleLaserPointer);
        document.getElementById('btnZoomIn')?.addEventListener('click', zoomIn);
        document.getElementById('btnZoomOut')?.addEventListener('click', zoomOut);
        document.getElementById('btnZoomReset')?.addEventListener('click', resetZoom);
        document.getElementById('btnFullscreen')?.addEventListener('click', toggleFullscreen);
        document.getElementById('btnToggleGuide')?.addEventListener('click', toggleGuideMode);
        document.getElementById('btnChecklist')?.addEventListener('click', openChecklistModal);
        document.getElementById('btnExportStandalone')?.addEventListener('click', exportStandaloneHtml);

        /**
         * Initialization
         */
        window.addEventListener('DOMContentLoaded', async () => {
            const hashMatch = window.location.hash.match(/(\d+)/);
            if (hashMatch && parseInt(hashMatch[1]) >= 1 && parseInt(hashMatch[1]) <= TOTAL_SLIDES) {
                goToSlide(parseInt(hashMatch[1]));
            } else {
                const savedSlide = localStorage.getItem('obapay_ppt_current_slide');
                if (savedSlide && parseInt(savedSlide) >= 1 && parseInt(savedSlide) <= TOTAL_SLIDES) {
                    goToSlide(parseInt(savedSlide));
                } else {
                    goToSlide(1);
                }
            }

            await initDB();

            for (const item of SCREENSHOT_CONFIG) {
                await checkAndApplyImage(item.key);
            }

            document.querySelectorAll('.screenshot-real-img').forEach(img => {
                img.addEventListener('load', () => handleImageLoaded(img));
                if (img.complete && img.naturalWidth > 0) {
                    handleImageLoaded(img);
                }
            });

            if (document.getElementById('frameStageB')) {
                showStageDetailB('B1');
            }
            if (document.getElementById('frameStep11')) {
                switchStep11(1);
            }

            initTypewriter();
            initLaserPointer();
            initZoom();
            updateChecklistCount();
        });
