import { createNavbar } from '../components/navbar/navbar';
import type { NavigateCallback } from '../components/navbar/navbar';

export default function createAboutPage(onNavigate: NavigateCallback): HTMLElement {
    const container = document.createElement('div');
    container.className = 'page-container';

    const header = createNavbar('/about', onNavigate);

    const main = document.createElement('main');
    main.className = 'page-content';
    main.innerHTML = `
        <section class="page-section">
            <h1>About Us</h1>
            <p>Colorwave is dedicated to creating a welcoming, energizing race experience for runners of all levels. Our team focuses on safe courses, fun festivities, and supporting every participant from start to finish.</p>
        </section>

        <section class="section-card">
            <h2>Our mission</h2>
            <p>We want to help communities connect through sport while delivering a professionally managed event and clear communication before the race day.</p>
        </section>

        <section class="section-card">
            <h2>What makes Colorwave different?</h2>
            <ul>
                <li>Family-friendly race atmosphere</li>
                <li>Clear, easy registration and payment steps</li>
                <li>Strong focus on runner support and safety</li>
            </ul>
        </section>
    `;

    container.append(header, main);
    return container;
}
