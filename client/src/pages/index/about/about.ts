import { createNavbar } from '../../../components/navbar/navbar';
import type { NavigateCallback } from '../../../components/navbar/navbar';
import './about.css';

export default function createAboutPage(onNavigate: NavigateCallback): HTMLElement {
    const container = document.createElement('div');
    container.className = 'page-container about-page';

    const header = createNavbar('/about', onNavigate);

    const main = document.createElement('main');
    main.className = 'page-content';
    main.innerHTML = `
        <section class="section-card">
            <h1>About Us</h1>
            <p>ColourWave 2026 is a brand-new event introduced by HELP University in collaboration between the Business Student Council (BSC) & the Psychology Student Union (PSU) from HELP University. This marathon is an event that consists of two main components: run and post-run activities. The run will be open to all university students across Malaysia with only one open category.</p>

            <p>ColourWave 2026 is a vibrant fun run that brings participants together through colour, music, and celebration. Featuring exciting colour powder moments during the flag-off and finale, the event creates an energetic atmosphere filled with fun, laughter, and connection.</p>
        </section>

        <section class="section-card mission-card">
            <h2>Our Mission</h2>
            <p>Our mission is to create an enjoyable, inclusive, and well-organised marathon that brings people together through sport, promotes a healthy and active lifestyle, and provides a memorable experience for participants of all backgrounds and abilities.</p>
        </section>

        <section class="section-card vision-card">
            <h2>Our Vision</h2>
            <p>Our vision is to show that sports can be fun for everyone.</p>
        </section>

        <section class="section-card objectives-card">
            <h2>Objectives</h2>
            <ul>
                <li>Creating a fun and inclusive atmosphere in HELP University.</li>
                <li>Promoting health, wellness, and unity among the student body.</li>
                <li>Target a total of 400 to 500 university students (participants) from universities all over Malaysia.</li>
                <li>Generate publicity and awareness for HELP University through the marathon event organised in HELP University.</li>
            </ul>
        </section>
    `;

    container.append(header, main);
    return container;
}