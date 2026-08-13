import { createNavbar } from '../../../components/navbar/navbar';
import type { NavigateCallback } from '../../../components/navbar/navbar';
import './home.css';

export default function createHomePage(onNavigate: NavigateCallback): HTMLElement {
    const container = document.createElement('div');
    container.className = 'page-container home-page';

    const header = createNavbar('/', onNavigate);

    const main = document.createElement('main');
    main.className = 'page-content';

    // Hero section with tagline
    const heroSection = document.createElement('section');
    heroSection.className = 'hero-tagline-section';
    heroSection.innerHTML = `
        <h1 class="hero-tagline">Colour the air, fun everywhere</h1>
    `;

    // Cards section for navigation
    const cardsSection = document.createElement('section');
    cardsSection.className = 'cards-grid-section';
    cardsSection.innerHTML = `
        <div class="cards-grid">
            <a href="/about" data-nav class="nav-card">
                <div class="nav-card-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <h3>About Us</h3>
                <p>Learn about our mission and what makes Colorwave different.</p>
            </a>

            <a href="/race-info" data-nav class="nav-card">
                <div class="nav-card-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
                </div>
                <h3>Race Info</h3>
                <p>Everything you need to know about the event day.</p>
            </a>

            <a href="/registration" data-nav class="nav-card">
                <div class="nav-card-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>
                </div>
                <h3>Registration</h3>
                <p>Sign up and secure your spot in the race.</p>
            </a>

            <a href="/terms" data-nav class="nav-card">
                <div class="nav-card-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                </div>
                <h3>Terms & Conditions</h3>
                <p>Read our event policies and guidelines.</p>
            </a>
        </div>
    `;

    main.append(heroSection, cardsSection);

    // Add event listeners for navigation
    main.querySelectorAll<HTMLAnchorElement>('[data-nav]').forEach((element) => {
        const href = element.getAttribute('href');
        if (!href) {
            return;
        }

        element.addEventListener('click', (event) => {
            event.preventDefault();
            onNavigate(href);
        });
    });

    container.append(header, main);
    return container;
}