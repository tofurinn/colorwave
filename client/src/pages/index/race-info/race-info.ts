import { createNavbar } from '../../../components/navbar/navbar';
import type { NavigateCallback } from '../../../components/navbar/navbar';
import './race-info.css';
export default function createRaceInfoPage(onNavigate: NavigateCallback): HTMLElement {
    const container = document.createElement('div');
    container.className = 'page-container race-info-page';

    const header = createNavbar('/race-info', onNavigate);

    const main = document.createElement('main');
    main.className = 'page-content';
    main.innerHTML = `
        <section class="page-section">
            <h1>Race Info</h1>
            <p>Everything you need to know about the course, schedule, and race-day logistics for Colorwave.</p>
        </section>

        <section class="section-card">
            <h2>Race date & schedule</h2>
            <p><strong>Date:</strong> Saturday, June 14</p>
            <p><strong>Start time:</strong> 8:00 AM</p>
            <p><strong>Venue:</strong> City Park Greenway</p>
        </section>

        <section class="section-card">
            <h2>Course details</h2>
            <ul>
                <li>Scenic 5K route with flat pavement and park trails</li>
                <li>Water stations every 1.5 km</li>
                <li>Professional timing and volunteer support throughout</li>
            </ul>
        </section>

        <section class="section-card">
            <h2>Important notes</h2>
            <ul>
                <li>Race bib pickup begins at 7:00 AM</li>
                <li>Please bring a valid photo ID and a printed or digital payment receipt</li>
                <li>Restrooms and first-aid stations are available at the starting area</li>
            </ul>
        </section>
    `;

    container.append(header, main);
    return container;
}
