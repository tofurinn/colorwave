import { createNavbar } from '../components/navbar/navbar';
import type { NavigateCallback } from '../components/navbar/navbar';
import './home.css';

export default function createHomePage(onNavigate: NavigateCallback): HTMLElement {
    const container = document.createElement('div');
    container.className = 'page-container home-page';

    const header = createNavbar('/', onNavigate);

    const main = document.createElement('main');
    main.className = 'page-content';
    main.innerHTML = `
        <section class="hero-section">
            <div>
                <p class="eyebrow">Welcome to Colorwave</p>
                <h1>Run, celebrate, and connect with our race community.</h1>
                <p class="hero-copy">Join the Colorwave event for a memorable race experience with support, fun, and a strong finish.</p>
                <div class="cta-grid">
                    <button type="button" class="button primary" data-nav="/about">About Us</button>
                    <button type="button" class="button secondary" data-nav="/race-info">Race Info</button>
                </div>
            </div>
            <div class="hero-card">
                <h2>Ready for the start line?</h2>
                <p>Learn more about the event, registration, and our safety guidelines before you sign up.</p>
            </div>
        </section>

        <section class="section-card">
            <h2>Event pages</h2>
            <div class="link-grid">
                <a href="/about" data-nav>About Us</a>
                <a href="/race-info" data-nav>Race Info</a>
                <a href="/terms" data-nav>Terms & Conditions</a>
                <a href="/registration" data-nav>Registration</a>
            </div>
        </section>
    `;

    main.querySelectorAll<HTMLAnchorElement>('[data-nav], button[data-nav]').forEach((element) => {
        const href = element.getAttribute('href') ?? element.getAttribute('data-nav');
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
