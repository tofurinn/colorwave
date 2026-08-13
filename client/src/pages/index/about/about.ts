import { createNavbar } from '../../../components/navbar/navbar';
import type { NavigateCallback } from '../../../components/navbar/navbar';
import './about.css';
export default function createAboutPage(onNavigate: NavigateCallback): HTMLElement {
    const container = document.createElement('div');
    container.className = 'page-container';

    const header = createNavbar('/about', onNavigate);

    const main = document.createElement('main');
    main.className = 'page-content';
    main.innerHTML = `
        <section class="page-section">
            <h1>About Us</h1>
            <p>ColourWave 2026 is a brand-new event introduced by HELP University in collaboration
between the Business Student Council (BSC) & the Psychology Student Union (PSU) from HELP University. This
marathon is an event that consists of two main components, run and post-run activities. The
run will be open to all university students across Malaysia with only one open category.</p>

            <p>ColourWave 2026 is a vibrant fun run that brings participants together through colour,
music, and celebration. Featuring exciting colour powder moments during the flag-off and
finale, the event creates an energetic atmosphere filled with fun, laughter, and connection.</p>
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
