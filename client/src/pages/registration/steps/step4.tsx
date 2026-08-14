import './steps.css';

interface TShirtInfoData {
    size: string;
    design: string;
    notes: string;
}

interface TShirtInfoProps {
    tShirtInfo: TShirtInfoData;
    setTShirtInfo: (info: TShirtInfoData) => void;
    onBack?: () => void;
    onNext: () => void;
}

export default function createTShirtStep({
    tShirtInfo,
    setTShirtInfo,
    onBack,
    onNext,
}: TShirtInfoProps): HTMLElement {
    const container = document.createElement('div');
    container.className = 'step-container';
    container.innerHTML = `
        <div class="step-header">
            <h2>Step 4: T-Shirt Selection</h2>
            <p>Choose your preferred shirt size.</p>
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
                <div class="button-group">
                    ${onBack ? '<button type="button" class="back-button">Back</button>' : ''}
                    <button type="submit" class="next-button">Next</button>
                </div>
            </div>
        </form>
    `;

    const form = container.querySelector<HTMLFormElement>('form')!;
    const backButton = container.querySelector<HTMLButtonElement>('.back-button');
    const sizeSelect = container.querySelector<HTMLSelectElement>('#size')!;

    backButton?.addEventListener('click', () => {
        onBack?.();
    });

    const normalizedDesign = tShirtInfo.design || 'wave';
    sizeSelect.value = tShirtInfo.size;

    const updateTShirtInfo = (info: TShirtInfoData) => {
        setTShirtInfo({
            ...info,
            design: normalizedDesign,
        });
    };

    sizeSelect.addEventListener('change', () => {
        updateTShirtInfo({
            ...tShirtInfo,
            size: sizeSelect.value,
            design: normalizedDesign,
        });
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const currentInfo: TShirtInfoData = {
            size: sizeSelect.value,
            design: normalizedDesign,
            notes: '',
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
