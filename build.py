#!/usr/bin/env python3
"""
ObaPay Presentation Builder
Compiles modular HTML slides and components into a cohesive, production-ready presentasi.html.

Usage:
    python3 build.py          # Single build
    python3 build.py --watch  # Live rebuild on file change
"""

import os
import sys
import time

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def read_file(rel_path):
    full_path = os.path.join(BASE_DIR, rel_path)
    if os.path.exists(full_path):
        with open(full_path, 'r', encoding='utf-8') as f:
            return f.read()
    return ''

def build():
    print("Building presentation...")

    # Shell components
    icons = read_file('components/icons.html')
    navbar = read_file('components/navbar.html')
    notes_drawer = read_file('components/notes-drawer.html')
    footer = read_file('components/footer.html')
    checklist_modal = read_file('components/checklist-modal.html')
    lightbox_modal = read_file('components/lightbox-modal.html')

    # Read all slides
    slides_html = []
    i = 1
    while True:
        slide_name = f'slides/slide{i:02d}.html'
        s_content = read_file(slide_name)
        if s_content:
            slides_html.append(s_content)
            i += 1
        else:
            break
    print(f"Loaded {len(slides_html)} slides.")

    all_slides = "\n\n".join(slides_html)

    # Main HTML Template
    template = f"""<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ObaPay — From Manual to Smart Pharmacy</title>
    <link rel="apple-touch-icon" sizes="192x192" href="icons/pwa-192x192.png">
    <link rel="icon" type="image/svg+xml" href="icons/pwa-512x512.svg">
    <link rel="icon" type="image/png" sizes="512x512" href="icons/pwa-512x512.png">
    <link rel="icon" type="image/png" sizes="192x192" href="icons/pwa-192x192.png">
    <meta name="description" content="Kenali ObaPay: transformasi pelayanan farmasi dan pengelolaan persediaan obat menjadi lebih terintegrasi, otomatis, dan efisien.">
    <link rel="canonical" href="https://danifahmy5.github.io/obapay-presentasi/">

    <!-- Social sharing metadata: rendered statically for link-preview crawlers. -->
    <meta property="og:type" content="website">
    <meta property="og:locale" content="id_ID">
    <meta property="og:site_name" content="Presentasi ObaPay">
    <meta property="og:title" content="ObaPay — From Manual to Smart Pharmacy">
    <meta property="og:description" content="Kenali ObaPay: transformasi pelayanan farmasi dan pengelolaan persediaan obat menjadi lebih terintegrasi, otomatis, dan efisien.">
    <meta property="og:url" content="https://danifahmy5.github.io/obapay-presentasi/">
    <meta property="og:image" content="https://danifahmy5.github.io/obapay-presentasi/screenshots/slide01-dashboard-overview.png">
    <meta property="og:image:type" content="image/png">
    <meta property="og:image:width" content="1911">
    <meta property="og:image:height" content="978">
    <meta property="og:image:alt" content="Tampilan dashboard ObaPay untuk pengelolaan farmasi dan persediaan obat.">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="ObaPay — From Manual to Smart Pharmacy">
    <meta name="twitter:description" content="Kenali ObaPay: transformasi pelayanan farmasi dan pengelolaan persediaan obat menjadi lebih terintegrasi, otomatis, dan efisien.">
    <meta name="twitter:image" content="https://danifahmy5.github.io/obapay-presentasi/screenshots/slide01-dashboard-overview.png">
    <meta name="twitter:image:alt" content="Tampilan dashboard ObaPay untuk pengelolaan farmasi dan persediaan obat.">

    <!-- Google Fonts: Space Grotesk (PZN Display), Plus Jakarta Sans (Body), IBM Plex Mono (Code/Badges) -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700;800&display=swap"
        rel="stylesheet">
    <!-- Modular CSS Stylesheets -->
    <link rel="stylesheet" href="css/pzn-theme.css">
    <link rel="stylesheet" href="css/layout.css">
    <link rel="stylesheet" href="css/components.css">
    <link rel="stylesheet" href="css/slides.css">
</head>

<body>

    <!-- Inline SVG Symbol Sprite for Crisp Offline Icons -->
{icons}

    <!-- Header Navbar - Programmer Zaman Now Tech Vibe -->
{navbar}

    <!-- Main Slide Presentation Canvas -->
    <main class="presentation-stage">
        <div class="slide-canvas" id="slideCanvas">

{all_slides}

            <!-- Presenter Notes Drawer (Collapsible) -->
{notes_drawer}

        </div>
    </main>

    <!-- Bottom Controls Footer -->
{footer}

    <!-- Modal Checklist Screenshot Manual -->
{checklist_modal}

    <!-- Hidden File Input for Image Uploads -->
    <input type="file" id="globalImageInput" accept="image/*" multiple style="display: none;">

    <!-- Lightbox Zoom Modal Pop-up with Multi-Image Gallery -->
{lightbox_modal}

    <!-- Modular Application Scripts -->
    <script src="js/config.js"></script>
    <script src="js/storage.js"></script>
    <script src="js/components.js"></script>
    <script src="js/lightbox.js"></script>
    <script src="js/app.js"></script>
</body>

</html>
"""

    out_file = os.path.join(BASE_DIR, 'presentasi.html')
    with open(out_file, 'w', encoding='utf-8') as f:
        f.write(template)

    line_count = len(template.splitlines())
    print(f"Success! Generated {out_file} ({line_count} lines)")

def watch():
    print("Watching for changes in components, slides, css, js... (Press Ctrl+C to exit)")
    build()

    watch_dirs = [
        os.path.join(BASE_DIR, 'components'),
        os.path.join(BASE_DIR, 'slides'),
        os.path.join(BASE_DIR, 'css'),
        os.path.join(BASE_DIR, 'js')
    ]

    last_mtimes = {}

    def get_max_mtime():
        max_t = 0
        for d in watch_dirs:
            if not os.path.exists(d):
                continue
            for root, _, files in os.walk(d):
                for fn in files:
                    fp = os.path.join(root, fn)
                    try:
                        t = os.path.getmtime(fp)
                        if t > max_t:
                            max_t = t
                    except OSError:
                        pass
        return max_t

    prev_mtime = get_max_mtime()
    try:
        while True:
            time.sleep(0.5)
            curr_mtime = get_max_mtime()
            if curr_mtime > prev_mtime:
                prev_mtime = curr_mtime
                print("\n[Change detected]")
                build()
    except KeyboardInterrupt:
        print("\nWatcher stopped.")

if __name__ == '__main__':
    if len(sys.argv) > 1 and sys.argv[1] == '--watch':
        watch()
    else:
        build()
