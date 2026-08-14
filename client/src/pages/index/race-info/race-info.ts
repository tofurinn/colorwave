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
        <section class="section-card header-card">
            <h1>Race Info</h1>
            <p>Everything you need to know about the course, schedule, and race-day logistics for Colorwave 2026.</p>
        </section>

        <section class="section-card date-card">
            <h2>Race date & schedule</h2>
            <div class="info-row"><strong>Date:</strong> Sunday, November 1</div>
            <div class="info-row"><strong>Start time:</strong> 6:30AM - 12:30PM</div>
            <div class="info-row"><strong>Venue:</strong> HELP University Subang Bestari</div>
        </section>

        <section class="section-card course-card">
            <h2>Course details</h2>
            <div class="info-row"><strong>Event Distance:</strong> 4 KM Color Run</div>
            <div class="info-row"><strong>Venue:</strong> HELP University, Subang Bestari, 40150 Shah Alam, Selangor, Malaysia.</div>
            <div class="info-row"><strong>Route:</strong> Jalan Nova U5, Subang Bestari Area — Starting & ending point at HELP University Subang Bestari</div>
        </section>

        <section class="section-card notes-card">
            <h2>Important notes</h2> 
            <div class="info-row">All participants are encouraged to register 30 minutes prior to their wave at the registration booth or risk a delayed start.</div>
            <div class="info-row">Please bring a valid photo ID and a printed or digital payment receipt.</div>
            <div class="info-row">Water stations will be available along the route.</div>
            <div class="info-row">Restrooms and first-aid stations are available at the starting area.</div>
        </section>
    `;

    container.append(header, main);
    return container;
}