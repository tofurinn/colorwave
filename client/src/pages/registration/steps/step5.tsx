import './steps.css';

interface PaymentInfoData {
    paymentReceiptFile: File | null;
    paymentNotes: string;
}

interface PaymentInfoProps {
    paymentInfo: PaymentInfoData;
    setPaymentInfo: (info: PaymentInfoData) => void;
    onBack?: () => void;
    onNext: () => void;
}

export default function createPaymentStep({
    paymentInfo,
    setPaymentInfo,
    onBack,
    onNext,
}: PaymentInfoProps): HTMLElement {
    const container = document.createElement('div');
    container.className = 'step-container';
    container.innerHTML = `
        <div class="step-header">
            <h2>Step 5: Payment</h2>
            <p>Upload your registration payment receipt so the team can verify your booking.</p>
        </div>

        <form class="registration-form">
            <div class="form-grid">
                <div class="form-group full-width">
                    <label for="paymentReceipt">Payment Receipt (PDF) *</label>
                    <input id="paymentReceipt" type="file" accept="application/pdf" required />
                </div>
                <div class="form-group full-width">
                    <label for="paymentNotes">Payment Notes</label>
                    <textarea id="paymentNotes" rows="3" placeholder="Optional note about your payment"></textarea>
                </div>
            </div>

            <div class="form-actions">
                <div class="button-group">
                    ${onBack ? '<button type="button" class="back-button">Back</button>' : ''}
                    <button type="submit" class="next-button">Submit Registration</button>
                </div>
            </div>
        </form>
    `;

    const form = container.querySelector<HTMLFormElement>('form')!;
    const backButton = container.querySelector<HTMLButtonElement>('.back-button');
    const paymentReceiptInput = container.querySelector<HTMLInputElement>('#paymentReceipt')!;
    const paymentNotesInput = container.querySelector<HTMLTextAreaElement>('#paymentNotes')!;

    backButton?.addEventListener('click', () => {
        onBack?.();
    });

    const updatePaymentReceiptFile = (file: File | null) => {
        setPaymentInfo({
            ...paymentInfo,
            paymentReceiptFile: file,
        });
    };

    const updatePaymentNotes = (notes: string) => {
        setPaymentInfo({
            ...paymentInfo,
            paymentNotes: notes,
        });
    };

    paymentReceiptInput.addEventListener('change', (event) => {
        const file = (event.target as HTMLInputElement).files?.[0] ?? null;
        updatePaymentReceiptFile(file);
    });

    paymentNotesInput.addEventListener('input', () => {
        updatePaymentNotes(paymentNotesInput.value);
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const currentInfo: PaymentInfoData = {
            paymentReceiptFile: paymentReceiptInput.files?.[0] ?? paymentInfo.paymentReceiptFile,
            paymentNotes: paymentNotesInput.value,
        };

        if (!currentInfo.paymentReceiptFile) {
            alert('Please upload your payment receipt before submitting.');
            return;
        }

        if (currentInfo.paymentReceiptFile.type !== 'application/pdf') {
            alert('The payment receipt must be a PDF file.');
            return;
        }

        setPaymentInfo(currentInfo);
        onNext();
    });

    return container;
}
