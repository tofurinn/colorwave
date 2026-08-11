import './terms.css';
import { createNavbar } from '../components/navbar/navbar';
import type { NavigateCallback } from '../components/navbar/navbar';
import './terms.css';

export default function createTermsPage(onNavigate: NavigateCallback): HTMLElement {
    const container = document.createElement('div');
    container.className = 'page-container terms-page';

    const header = createNavbar('/terms', onNavigate);

    const main = document.createElement('main');
    main.className = 'page-content terms-page';
    main.innerHTML = `
        <section class="page-section terms-intro">
            <h1>Terms & Conditions</h1>
            <p>These Terms & Conditions apply to the ColourWave 2026 event and all participant registrations.</p>
        </section>

        <section class="section-card terms-section">
            <h2>1. Event Information</h2>
            <div class="terms-grid">
                <p><strong>Event Name:</strong> ColourWave 2026</p>
                <p><strong>Date:</strong> 1 November 2026</p>
                <p><strong>Venue:</strong> HELP University Subang Bestari</p>
                <p><strong>Distance:</strong> 4KM</p>
            </div>
        </section>

        <section class="section-card terms-section">
            <h2>2. Eligibility</h2>
            <p>Open to all university students. This event is open for registration to Malaysians and Non-Malaysians.</p>
        </section>

        <section class="section-card terms-section">
            <h2>3. Registration</h2>
            <ol>
                <li>Registration will be done virtually via a website created by the organiser.</li>
                <li>All payments will be transacted directly to HELP University’s bank account.</li>
                <li>Registration fees are non-refundable, unless the organiser decides otherwise.</li>
            </ol>
            <p><strong>Registration opens:</strong> 31 August 2026</p>
            <p><strong>Registration closes:</strong> 25 October 2026</p>
        </section>

        <section class="section-card terms-section">
            <h2>4. Event Entry</h2>
            <ol>
                <li>Organisers will not be responsible for any disputes arising from incomplete and/or incorrect entry details given by the participants.</li>
                <li>Individual race entries are non-transferable. Any person doing so will be held responsible in case of an accident arising from or provoked by the other person during the race. The organisers reserve the right to exclude both parties from future events.</li>
                <li>On-site reporting and registration will start one and a half hours before the commencement of the event.</li>
                <li>Participants must provide their confirmation email upon registration on the event day.</li>
            </ol>
        </section>

        <section class="section-card terms-section">
            <h2>5. Road & Traffic Safety</h2>
            <ol>
                <li>The organisers reserve the right to amend the racecourse with prior notice to participants.</li>
                <li>In the event of inclement weather, the organisers reserve the right to delay the commencement of the race, shorten the race or modify the course.</li>
                <li>Should the inclement weather persist after the delay, the organisers reserve the right to postpone the event date.</li>
                <li>Route may be changed due to safety, authority requirements or unforeseen circumstances.</li>
                <li>Organisers may shorten, suspend or cancel the event if necessary.</li>
            </ol>
        </section>

        <section class="section-card terms-section">
            <h2>6. Colour Powder Safety</h2>
            <ol>
                <li>Colour Powder will only be used at designated areas as per mentioned in the route / event floorplan.</li>
                <li>Participants should avoid intentionally throwing powder directly into another person’s eyes, mouth or face. Contact lenses / glasses may require additional precautions.</li>
                <li>Participants with allergies / sensitivities should take appropriate precautions.</li>
            </ol>
        </section>

        <section class="section-card terms-section">
            <h2>7. Health & Medical</h2>
            <p>All participants are to ensure the following medical advisory:</p>
            <ol>
                <li>This colour run event is physically demanding. If you are unsure of your physical health, please seek the advice of a medical professional before you register for the race.</li>
                <li>Participants are advised against the consumption of alcohol or stimulants or any kind of drugs within 24 hours of their race.</li>
                <li>Participants are to ensure that they are well-rested and well-hydrated on the day of the race.</li>
                <li>Participants are advised to dress appropriately.</li>
                <li>Should any participants feel unwell in the course of the race, he/she should stop and seek immediate medical attention at designated medical posts.</li>
            </ol>
            <p class="terms-note">The organisers reserve the right to remove any participant deemed physically incapable of continuing the race.</p>
        </section>

        <section class="section-card terms-section">
            <h2>8. Participant Conduct</h2>
            <ol>
                <li>The organisers shall not be liable for any damages arising from personal injuries sustained by the participants while and during the event.</li>
                <li>Organisers are not responsible for loss / damage of personal belongings.</li>
                <li>No fighting, harassment, threatening behaviour, abusive language or intentional obstruction of other participants.</li>
                <li>Participants must follow instructions implemented from organisers, security personnel and authorities.</li>
                <li>Participants acknowledge that photographs / videos may be taken during and throughout the event.</li>
                <li>Images may be used for event documentation, publicity and promotional purposes.</li>
            </ol>
            <p class="terms-note">The organisers reserve the right to remove any participant who breach the rules.</p>
        </section>
    `;

    container.append(header, main);
    return container;
}
