import './steps.css';

interface RaceInfoData {
    raceName: string;
    shortDescription: string;
    contactDetails: string;
    termsAccepted: boolean;
}

interface RaceInfoProps {
    raceInfo: RaceInfoData;
    setRaceInfo: (info: RaceInfoData) => void;
    onNext: () => void;
}

export default function createRaceInfoStep({
    raceInfo,
    setRaceInfo,
    onNext,
}: RaceInfoProps): HTMLElement {
    const container = document.createElement('div');
    container.className = 'step-container';
    container.innerHTML = `
        <div class="step-header">
            <h2>Step 1: Race Information</h2>
            <p>Here is the event information provided by the organiser.</p>
        </div>

        <form class="registration-form">
            <div class="form-grid">
                <div class="form-group full-width">
                    <label>Race Name</label>
                    <div class="info-card">Colorwave Charity Run</div>
                </div>

                <div class="form-group full-width">
                    <label>Short Description</label>
                    <div class="info-card">Join us for a vibrant charity run supporting student wellbeing and community outreach.</div>
                </div>

                <div class="form-group full-width">
                    <label>Contact Details</label>
                    <div class="info-card">Email: hello@colorwave.com<br />Phone: 012-345-6789</div>
                </div>

                <div class="form-group full-width checkbox-group">
                    <label>
                        <input id="termsAccepted" type="checkbox" />
                        I agree to the terms and conditions for this registration.
                    </label>
                </div>
            </div>

            <div class="form-actions">
                <button type="submit" class="next-button">Next</button>
            </div>
        </form>
    `;

    const form = container.querySelector<HTMLFormElement>('form')!;
    const termsAcceptedInput = container.querySelector<HTMLInputElement>('#termsAccepted')!;

    termsAcceptedInput.checked = raceInfo.termsAccepted;

    const updateRaceInfo = (field: keyof RaceInfoData, value: string | boolean) => {
        setRaceInfo({
            ...raceInfo,
            [field]: value,
        });
    };

    termsAcceptedInput.addEventListener('change', (event) => {
        updateRaceInfo('termsAccepted', (event.target as HTMLInputElement).checked);
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const currentInfo: RaceInfoData = {
            raceName: raceInfo.raceName,
            shortDescription: raceInfo.shortDescription,
            contactDetails: raceInfo.contactDetails,
            termsAccepted: termsAcceptedInput.checked,
        };

        if (!currentInfo.termsAccepted) {
            alert('Please accept the terms and conditions to continue.');
            return;
        }

        setRaceInfo(currentInfo);
        onNext();
    });

    return container;
}

