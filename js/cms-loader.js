/**
 * Halls of Hope - CMS Content Loader
 * Dynamically loads content from JSON files managed by the CMS
 */

class HallsOfHopeCMS {
    constructor() {
        this.cache = {};
        this.init();
    }

    async init() {
        // Load settings that apply to all pages
        await this.loadGlobalSettings();
        
        // Determine current page and load specific content
        const page = this.getCurrentPage();
        
        switch(page) {
            case 'index':
                await this.loadHomePage();
                break;
            case 'watch':
                await this.loadWatchPage();
                break;
            case 'shop':
                await this.loadShopPage();
                break;
            case 'about':
                await this.loadAboutPage();
                break;
            case 'contact':
                await this.loadContactPage();
                break;
        }
    }

    getCurrentPage() {
        const path = window.location.pathname;
        if (path === '/' || path.includes('index')) return 'index';
        if (path.includes('watch')) return 'watch';
        if (path.includes('shop')) return 'shop';
        if (path.includes('about')) return 'about';
        if (path.includes('contact')) return 'contact';
        return 'index';
    }

    async fetchJSON(path) {
        if (this.cache[path]) return this.cache[path];
        try {
            const response = await fetch(path);
            if (!response.ok) return null;
            const data = await response.json();
            this.cache[path] = data;
            return data;
        } catch (e) {
            console.warn(`Could not load ${path}`);
            return null;
        }
    }

    async loadAllFromFolder(folder) {
        // This attempts to load all JSON files from a folder
        // Since we can't list directories in static hosting, we load known files
        const items = [];
        
        if (folder === 'videos') {
            const videoFiles = [
                'teen-ashamed-of-mom',
                'homeless-veteran-salutes',
                'waitress-secret-will',
                'man-abandoned-family',
                'ceo-mocks-homeless',
                'teacher-paid-lunch',
                'son-refused-visit-father',
                'soldier-returns',
                'bride-humiliated-janitor'
            ];
            for (const file of videoFiles) {
                const data = await this.fetchJSON(`/data/videos/${file}.json`);
                if (data) items.push(data);
            }
        }
        
        if (folder === 'products') {
            const productFiles = [
                '5-viral-story-hooks',
                'thumbnail-cheat-sheet',
                'story-structure-template',
                'thumbnail-prompt-pack',
                'video-elements-template',
                '10-story-hooks-bundle',
                '50-script-bundle',
                'full-script-library'
            ];
            for (const file of productFiles) {
                const data = await this.fetchJSON(`/data/products/${file}.json`);
                if (data) items.push(data);
            }
        }
        
        // Sort by order
        return items.sort((a, b) => (a.order || 10) - (b.order || 10));
    }

    // ============================================
    // GLOBAL SETTINGS (applies to all pages)
    // ============================================
    async loadGlobalSettings() {
        const [social, footer, general] = await Promise.all([
            this.fetchJSON('/data/settings/social.json'),
            this.fetchJSON('/data/settings/footer.json'),
            this.fetchJSON('/data/settings/general.json')
        ]);

        if (social) this.updateSocialLinks(social);
        if (footer) this.updateFooter(footer, general);
    }

    updateSocialLinks(social) {
        const linkMap = {
            'youtube': social.youtube,
            'instagram': social.instagram,
            'facebook': social.facebook,
            'tiktok': social.tiktok,
            'x.com': social.twitter,
            'twitter': social.twitter
        };

        document.querySelectorAll('.footer-social a, .social-links a').forEach(link => {
            const href = link.getAttribute('href') || '';
            for (const [key, value] of Object.entries(linkMap)) {
                if (href.includes(key)) {
                    link.setAttribute('href', value);
                    break;
                }
            }
        });

        // Update nav CTA if it's a YouTube link
        document.querySelectorAll('.nav-cta').forEach(link => {
            if (link.getAttribute('href')?.includes('youtube')) {
                link.setAttribute('href', social.youtube);
            }
        });
    }

    updateFooter(footer, general) {
        // Update tagline
        const taglineEl = document.querySelector('.footer-brand p');
        if (taglineEl && footer.tagline) {
            taglineEl.textContent = `"${footer.tagline}"`;
        }

        // Update copyright
        const copyrightEl = document.querySelector('.footer-bottom p');
        if (copyrightEl && footer.copyright) {
            copyrightEl.textContent = `© ${footer.copyright}`;
        }

        // Update footer links visibility
        const footerLinks = document.querySelector('.footer-links');
        if (footerLinks) {
            let linksHTML = '';
            if (footer.show_privacy) {
                linksHTML += `<a href="${footer.privacy_url || '#'}">Privacy Policy</a>`;
            }
            if (footer.show_terms) {
                linksHTML += `<a href="${footer.terms_url || '#'}">Terms of Service</a>`;
            }
            if (footer.show_refund) {
                linksHTML += `<a href="${footer.refund_url || '#'}">Refund Policy</a>`;
            }
            if (linksHTML) footerLinks.innerHTML = linksHTML;
        }
    }

    // ============================================
    // HOME PAGE
    // ============================================
    async loadHomePage() {
        const [general, stats, videos] = await Promise.all([
            this.fetchJSON('/data/settings/general.json'),
            this.fetchJSON('/data/settings/stats.json'),
            this.loadAllFromFolder('videos')
        ]);

        if (general) this.updateHeroSection(general);
        if (stats) this.updateStats(stats);
        if (videos) this.updateFeaturedVideos(videos.filter(v => v.featured));
    }

    updateHeroSection(general) {
        const heroTitle = document.querySelector('.hero h1');
        const heroSubtitle = document.querySelector('.hero p');
        
        if (heroTitle && general.hero_title) {
            heroTitle.innerHTML = general.hero_title;
        }
        if (heroSubtitle && general.hero_subtitle) {
            heroSubtitle.textContent = general.hero_subtitle;
        }
    }

    updateStats(stats) {
        const statEls = document.querySelectorAll('.stat');
        if (statEls.length >= 3) {
            if (statEls[0]) {
                const num = statEls[0].querySelector('.stat-number');
                const label = statEls[0].querySelector('.stat-label');
                if (num) num.textContent = stats.stat1_number;
                if (label) label.textContent = stats.stat1_label;
            }
            if (statEls[1]) {
                const num = statEls[1].querySelector('.stat-number');
                const label = statEls[1].querySelector('.stat-label');
                if (num) num.textContent = stats.stat2_number;
                if (label) label.textContent = stats.stat2_label;
            }
            if (statEls[2]) {
                const num = statEls[2].querySelector('.stat-number');
                const label = statEls[2].querySelector('.stat-label');
                if (num) num.textContent = stats.stat3_number;
                if (label) label.textContent = stats.stat3_label;
            }
        }
    }

    updateFeaturedVideos(videos) {
        const container = document.querySelector('.video-grid, .videos-grid');
        if (!container || !videos.length) return;

        container.innerHTML = videos.slice(0, 3).map(video => this.renderVideoCard(video)).join('');
    }

    // ============================================
    // WATCH PAGE
    // ============================================
    async loadWatchPage() {
        const [pageContent, videos] = await Promise.all([
            this.fetchJSON('/data/pages/watch.json'),
            this.loadAllFromFolder('videos')
        ]);

        if (pageContent) {
            const pageTitle = document.querySelector('.page-header h1');
            const pageSubtitle = document.querySelector('.page-header p');
            if (pageTitle) pageTitle.textContent = pageContent.page_title;
            if (pageSubtitle) pageSubtitle.textContent = pageContent.page_subtitle;

            const ctaTitle = document.querySelector('.subscribe-cta h2');
            const ctaText = document.querySelector('.subscribe-cta p');
            if (ctaTitle) ctaTitle.textContent = pageContent.cta_title;
            if (ctaText) ctaText.textContent = pageContent.cta_text;
        }

        if (videos) {
            const container = document.querySelector('.video-grid');
            if (container) {
                container.innerHTML = videos.map(video => this.renderVideoCard(video)).join('');
                this.initVideoFilters();
            }
        }
    }

    initVideoFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const videoCards = document.querySelectorAll('.video-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const category = btn.dataset.category;
                videoCards.forEach(card => {
                    if (category === 'all' || card.dataset.category === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    renderVideoCard(video) {
        const categoryLabels = {
            family: 'Family',
            military: 'Military',
            karma: 'Karma',
            redemption: 'Redemption',
            homeless: 'Homeless Hero',
            kindness: 'Kindness',
            betrayal: 'Betrayal',
            secrets: 'Secrets'
        };

        const thumbnail = video.thumbnail || video.thumbnail_url;

        return `
            <article class="video-card" data-category="${video.category}">
                <a href="${video.youtube_url}" target="_blank">
                    <div class="video-thumbnail">
                        <img src="${thumbnail}" alt="${video.title}" loading="lazy">
                        <div class="play-button"><i class="fas fa-play"></i></div>
                        <span class="video-category">${categoryLabels[video.category] || video.category}</span>
                        ${video.duration ? `<span class="video-duration">${video.duration}</span>` : ''}
                    </div>
                </a>
                <div class="video-info">
                    <h3 class="video-title">${video.title}</h3>
                    <p class="video-description">${video.description}</p>
                    <div class="video-meta">
                        ${video.views ? `<span><i class="fas fa-eye"></i> ${video.views}</span>` : ''}
                        ${video.duration ? `<span><i class="fas fa-clock"></i> ${video.duration}</span>` : ''}
                    </div>
                </div>
            </article>
        `;
    }

    // ============================================
    // SHOP PAGE
    // ============================================
    async loadShopPage() {
        const [pageContent, products] = await Promise.all([
            this.fetchJSON('/data/pages/shop.json'),
            this.loadAllFromFolder('products')
        ]);

        if (pageContent) {
            const pageTitle = document.querySelector('.page-header h1');
            if (pageTitle) pageTitle.innerHTML = pageContent.page_title.replace('Tools', '<span>Tools</span>');

            const pageSubtitle = document.querySelector('.page-header p');
            if (pageSubtitle) pageSubtitle.textContent = pageContent.page_subtitle;
        }

        if (products) {
            // Update free resources
            const freeProducts = products.filter(p => p.category === 'free');
            const freeGrid = document.querySelector('.free-grid');
            if (freeGrid && freeProducts.length) {
                freeGrid.innerHTML = freeProducts.map(p => this.renderFreeCard(p)).join('');
            }

            // Update paid products
            const paidProducts = products.filter(p => p.category !== 'free' && p.category !== 'premium');
            const productsGrid = document.querySelector('.products-grid');
            if (productsGrid && paidProducts.length) {
                productsGrid.innerHTML = paidProducts.map(p => this.renderProductCard(p)).join('');
            }

            // Update premium product
            const premiumProduct = products.find(p => p.category === 'premium');
            if (premiumProduct) {
                const premiumPrice = document.querySelector('.premium-pricing .price');
                if (premiumPrice) premiumPrice.textContent = `$${premiumProduct.price}`;
            }
        }

        // Update FAQ
        if (pageContent?.faq) {
            const faqGrid = document.querySelector('.faq-grid');
            if (faqGrid) {
                faqGrid.innerHTML = pageContent.faq.map((item, i) => `
                    <div class="faq-item${i === 0 ? ' active' : ''}">
                        <div class="faq-question">
                            ${item.question}
                            <i class="fas fa-chevron-down"></i>
                        </div>
                        <div class="faq-answer">${item.answer}</div>
                    </div>
                `).join('');
                this.initFaqAccordion();
            }
        }
    }

    renderFreeCard(product) {
        return `
            <div class="free-card">
                <div class="free-icon"><i class="${product.icon}"></i></div>
                <span class="free-badge">FREE</span>
                <h3>${product.title}</h3>
                <p>${product.description}</p>
                <a href="${product.gumroad_url || '#'}" class="btn btn-outline-gold">Download PDF</a>
            </div>
        `;
    }

    renderProductCard(product) {
        return `
            <div class="product-card${product.featured ? ' featured' : ''}">
                ${product.featured ? '<span class="product-badge">Most Popular</span>' : ''}
                <div class="product-image">
                    <i class="${product.icon}"></i>
                </div>
                <div class="product-content">
                    <span class="product-tag">${product.category}</span>
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-description">${product.description}</p>
                    <ul class="product-features">
                        ${(product.features || []).map(f => `<li><i class="fas fa-check"></i> ${f}</li>`).join('')}
                    </ul>
                    <div class="product-footer">
                        <div class="product-price">$${product.price}</div>
                        <a href="${product.gumroad_url || '#'}" class="btn btn-primary">Get Access</a>
                    </div>
                </div>
            </div>
        `;
    }

    initFaqAccordion() {
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                const item = question.parentElement;
                const isActive = item.classList.contains('active');
                document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
                if (!isActive) item.classList.add('active');
            });
        });
    }

    // ============================================
    // ABOUT PAGE
    // ============================================
    async loadAboutPage() {
        const pageContent = await this.fetchJSON('/data/pages/about.json');
        if (!pageContent) return;

        // Hero section
        const heroTitle = document.querySelector('.about-hero h1');
        const heroTagline = document.querySelector('.about-hero .tagline');
        const heroDesc = document.querySelector('.about-hero > .container > p:last-child');

        if (heroTitle) {
            heroTitle.innerHTML = pageContent.hero_title.replace('Overlooked', '<span>Overlooked</span>').replace('Unforgettable', '<span>Unforgettable</span>');
        }
        if (heroTagline) heroTagline.textContent = `"${pageContent.hero_tagline}"`;
        if (heroDesc) heroDesc.textContent = pageContent.hero_description;

        // Mission section
        const missionTitle = document.querySelector('.mission-content h2');
        const missionPs = document.querySelectorAll('.mission-content > p:not(.highlight)');
        const missionQuote = document.querySelector('.mission-content .highlight');

        if (missionTitle) missionTitle.innerHTML = pageContent.mission_title.replace('Mission', '<span>Mission</span>');
        if (missionPs[0]) missionPs[0].textContent = pageContent.mission_p1;
        if (missionQuote) missionQuote.textContent = `"${pageContent.mission_quote}"`;
        if (missionPs[1]) missionPs[1].textContent = pageContent.mission_p2;

        // Values
        if (pageContent.values) {
            const valuesGrid = document.querySelector('.values-grid');
            if (valuesGrid) {
                valuesGrid.innerHTML = pageContent.values.map(value => `
                    <div class="value-card">
                        <div class="value-icon"><i class="${value.icon}"></i></div>
                        <h3>${value.title}</h3>
                        <p>${value.description}</p>
                    </div>
                `).join('');
            }
        }

        // Timeline
        if (pageContent.timeline) {
            const timeline = document.querySelector('.timeline');
            if (timeline) {
                timeline.innerHTML = pageContent.timeline.map(item => `
                    <div class="timeline-item">
                        <div class="timeline-content">
                            <div class="timeline-dot"></div>
                            <span class="timeline-year">${item.year}</span>
                            <h3>${item.title}</h3>
                            <p>${item.description}</p>
                        </div>
                    </div>
                `).join('');
            }
        }
    }

    // ============================================
    // CONTACT PAGE
    // ============================================
    async loadContactPage() {
        const [pageContent, contactSettings] = await Promise.all([
            this.fetchJSON('/data/pages/contact.json'),
            this.fetchJSON('/data/settings/contact.json')
        ]);

        if (pageContent) {
            const pageTitle = document.querySelector('.page-header h1');
            const pageSubtitle = document.querySelector('.page-header p');
            if (pageTitle) pageTitle.textContent = pageContent.page_title;
            if (pageSubtitle) pageSubtitle.textContent = pageContent.page_subtitle;

            const sectionTitle = document.querySelector('.contact-info h2');
            const sectionDesc = document.querySelector('.contact-info > p');
            if (sectionTitle) sectionTitle.textContent = pageContent.section_title;
            if (sectionDesc) sectionDesc.textContent = pageContent.section_description;

            // FAQ
            if (pageContent.faq) {
                const faqGrid = document.querySelector('.faq-grid');
                if (faqGrid) {
                    faqGrid.innerHTML = pageContent.faq.map(item => `
                        <div class="faq-item">
                            <h4><i class="fas fa-question-circle"></i> ${item.question}</h4>
                            <p>${item.answer}</p>
                        </div>
                    `).join('');
                }
            }
        }

        if (contactSettings) {
            // Update email links
            const emailLinks = document.querySelectorAll('.info-content a[href^="mailto:"]');
            emailLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href.includes('hello@')) {
                    link.setAttribute('href', `mailto:${contactSettings.email_general}`);
                    link.textContent = contactSettings.email_general;
                } else if (href.includes('business@')) {
                    link.setAttribute('href', `mailto:${contactSettings.email_business}`);
                    link.textContent = contactSettings.email_business;
                } else if (href.includes('press@')) {
                    link.setAttribute('href', `mailto:${contactSettings.email_press}`);
                    link.textContent = contactSettings.email_press;
                }
            });

            // Update response time
            const responseEl = document.querySelector('.info-card:nth-child(2) .info-content p');
            if (responseEl) {
                responseEl.textContent = `We typically respond within ${contactSettings.response_time}`;
            }
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new HallsOfHopeCMS();
});
