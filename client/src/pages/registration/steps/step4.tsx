import './steps.css';

interface TShirtInfoData {
    size: string;
    design: string;
    notes: string;
}

interface TShirtInfoProps {
    tShirtInfo: TShirtInfoData;
    setTShirtInfo: (info: TShirtInfoData) => void;
    onNext: () => void;
}

export default function createTShirtStep({
    tShirtInfo,
    setTShirtInfo,
    onNext,
}: TShirtInfoProps): HTMLElement {
    const container = document.createElement('div');
    container.className = 'step-container';
    container.innerHTML = `
        <div class="step-header">
            <h2>Step 4: T-Shirt Selection</h2>
            <p>Choose your preferred shirt size and race design.</p>
        </div>

        <form class="registration-form">
            <div class="form-grid">
                <div class="form-group full-width">
                    <label for="size">T-Shirt Size *</label>
                    <select id="size" required>
                        <option value="">Select size</option>
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                    </select>
                </div>
                <div class="form-group full-width">
                    <label for="design">Design</label>
                    <select id="design">
                        <option value="">Select design</option>
                        <option value="wave">Wave</option>
                        <option value="sunrise">Sunrise</option>
                        <option value="motion">Motion</option>
                    </select>
                </div>
                <div class="form-group full-width">
                    <label for="notes">Special requests</label>
                    <textarea id="notes" rows="3" placeholder="Any notes for your shirt"></textarea>
                </div>
            </div>

            <div class="size-chart">
                <h3>Size Chart</h3>
                <ul>
                    <li>XS: 34-36 in chest</li>
                    <li>S: 36-38 in chest</li>
                    <li>M: 38-40 in chest</li>
                    <li>L: 40-42 in chest</li>
                    <li>XL: 42-44 in chest</li>
                </ul>
            </div>

            <div class="form-actions">
                <button type="submit" class="next-button">Next</button>
            </div>
        </form>
    `;

    const form = container.querySelector<HTMLFormElement>('form')!;
    const sizeSelect = container.querySelector<HTMLSelectElement>('#size')!;
    const designSelect = container.querySelector<HTMLSelectElement>('#design')!;
    const notesInput = container.querySelector<HTMLTextAreaElement>('#notes')!;

    sizeSelect.value = tShirtInfo.size;
    designSelect.value = tShirtInfo.design;
    notesInput.value = tShirtInfo.notes;

    const updateTShirtInfo = (info: TShirtInfoData) => {
        setTShirtInfo({
            ...info,
        });
    };

    sizeSelect.addEventListener('change', () => {
        updateTShirtInfo({
            ...tShirtInfo,
            size: sizeSelect.value,
        });
    });

    designSelect.addEventListener('change', () => {
        updateTShirtInfo({
            ...tShirtInfo,
            design: designSelect.value,
        });
    });

    notesInput.addEventListener('input', () => {
        updateTShirtInfo({
            ...tShirtInfo,
            notes: notesInput.value,
        });
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const currentInfo: TShirtInfoData = {
            size: sizeSelect.value,
            design: designSelect.value,
            notes: notesInput.value,
        };

        if (!currentInfo.size) {
            alert('Please choose a shirt size before continuing.');
            return;
        }

        setTShirtInfo(currentInfo);
        onNext();
    });

    return container;
}
