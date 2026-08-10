import { createNavbar } from '../components/navbar/navbar';
import type { NavigateCallback } from '../components/navbar/navbar';

export default function createTermsPage(onNavigate: NavigateCallback): HTMLElement {
    const container = document.createElement('div');
    container.className = 'page-container';

    const header = createNavbar('/terms', onNavigate);

    const main = document.createElement('main');
    main.className = 'page-content';
    main.innerHTML = `
        <section class="page-section">
            <h1>Terms & Conditions</h1>
            <p>Review the key policies that apply to your Colorwave registration, participation, and payment.</p>
        </section>

        <section class="section-card">
            <h2>Registration requirements</h2>
            <ul>
                <li>All runners must complete the registration form and upload payment proof.</li>
                <li>Entries are non-transferable and may not be resold.</li>
            </ul>
        </section>

        <section class="section-card">
            <h2>Refund policy</h2>
            <p>Registration fees are refundable only in the case of event cancellation. Please allow up to 14 business days for processing.</p>
        </section>

        <section class="section-card">
            <h2>Liability and safety</h2>
            <ul>
                <li>Participants agree to follow race instructions and safety guidelines.</li>
                <li>Colorwave is not responsible for personal injury or property loss during the event.</li>
            </ul>
        </section>
    `;

    container.append(header, main);
    return container;
}
