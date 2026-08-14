import './steps.css';

interface PersonalInfoData {
    studentName: string;
    age: number;
    gender: string;
    idNumber: string;
    phoneNo: string;
    email: string;
    emergencyName: string;
    emergencyPhone: string;
    emergencyRelation: string;
}

interface PersonalInfoProps {
    personalInfo: PersonalInfoData;
    setPersonalInfo: (info: PersonalInfoData) => void;
    onBack?: () => void;
    onNext: () => void;
}

export default function createPersonalInfoStep({
    personalInfo,
    setPersonalInfo,
    onBack,
    onNext,
}: PersonalInfoProps): HTMLElement {
    const container = document.createElement('div');
    container.className = 'step-container';
    container.innerHTML = `
        <div class="step-header">
            <h2>Step 1: Personal Information</h2>
        </div>

        <form class="personal-info-form">
            <div class="form-grid">
                <div class="form-group">
                    <label for="studentName">Name *</label>
                    <input id="studentName" type="text" placeholder="e.g., Freddy Fazbear" required />
                </div>

                <div class="form-group">
                    <label for="age">Age *</label>
                    <input id="age" type="number" min="1" placeholder="e.g., 18" required />
                </div>

                <div class="form-group">
                    <label for="gender">Gender *</label>
                    <select id="gender" required>
                        <option value="">Select gender</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                        <option value="non-binary">Non-binary</option>
                        <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="idNumber">ID Number *</label>
                    <input id="idNumber" type="text" placeholder="e.g., 123456789" required />
                </div>

                <div class="form-group">
                    <label for="phoneNo">Phone Number *</label>
                    <input id="phoneNo" type="tel" placeholder="123-456-7890" required />
                </div>

                <div class="form-group">
                    <label for="email">Email *</label>
                    <input id="email" type="email" placeholder="sixseven@example.com" required />
                </div>

                <div class="form-group">
                    <label for="emergencyName">Emergency Contact Name *</label>
                    <input id="emergencyName" type="text" placeholder="e.g., Bad Bunny" required />
                </div>

                <div class="form-group">
                    <label for="emergencyPhone">Emergency Contact Phone *</label>
                    <input id="emergencyPhone" type="tel" placeholder="123-456-7890" required />
                </div>

                <div class="form-group">
                    <label for="emergencyRelation">Emergency Contact Relation *</label>
                    <select id="emergencyRelation" required>
                        <option value="">Select relationship</option>
                        <option value="family">Family</option>
                        <option value="partner">Partner</option>
                        <option value="friend">Friend</option>
                        <option value="co-worker">Co-worker</option>
                        <option value="other">Other</option>
                    </select>
                </div>
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
    const studentNameInput = container.querySelector<HTMLInputElement>('#studentName')!;
    const ageInput = container.querySelector<HTMLInputElement>('#age')!;
    const genderSelect = container.querySelector<HTMLSelectElement>('#gender')!;
    const idNumberInput = container.querySelector<HTMLInputElement>('#idNumber')!;
    const phoneNoInput = container.querySelector<HTMLInputElement>('#phoneNo')!;
    const emailInput = container.querySelector<HTMLInputElement>('#email')!;
    const emergencyNameInput = container.querySelector<HTMLInputElement>('#emergencyName')!;
    const emergencyPhoneInput = container.querySelector<HTMLInputElement>('#emergencyPhone')!;
    const emergencyRelationInput = container.querySelector<HTMLSelectElement>('#emergencyRelation')!;

    backButton?.addEventListener('click', () => {
        onBack?.();
    });

    studentNameInput.value = personalInfo.studentName;
    ageInput.value = personalInfo.age ? String(personalInfo.age) : '';
    genderSelect.value = personalInfo.gender;
    idNumberInput.value = personalInfo.idNumber;
    phoneNoInput.value = personalInfo.phoneNo;
    emailInput.value = personalInfo.email;
    emergencyNameInput.value = personalInfo.emergencyName;
    emergencyPhoneInput.value = personalInfo.emergencyPhone;
    emergencyRelationInput.value = personalInfo.emergencyRelation;

    const updatePersonalInfo = (field: keyof PersonalInfoData, value: string | number) => {
        setPersonalInfo({
            ...personalInfo,
            [field]: value,
        });
    };

    studentNameInput.addEventListener('input', (event) => {
        updatePersonalInfo('studentName', (event.target as HTMLInputElement).value);
    });

    ageInput.addEventListener('input', (event) => {
        updatePersonalInfo('age', Number((event.target as HTMLInputElement).value));
    });

    genderSelect.addEventListener('change', (event) => {
        updatePersonalInfo('gender', (event.target as HTMLSelectElement).value);
    });

    idNumberInput.addEventListener('input', (event) => {
        updatePersonalInfo('idNumber', (event.target as HTMLInputElement).value);
    });

    phoneNoInput.addEventListener('input', (event) => {
        updatePersonalInfo('phoneNo', (event.target as HTMLInputElement).value);
    });

    emailInput.addEventListener('input', (event) => {
        updatePersonalInfo('email', (event.target as HTMLInputElement).value);
    });

    emergencyNameInput.addEventListener('input', (event) => {
        updatePersonalInfo('emergencyName', (event.target as HTMLInputElement).value);
    });

    emergencyPhoneInput.addEventListener('input', (event) => {
        updatePersonalInfo('emergencyPhone', (event.target as HTMLInputElement).value);
    });

    emergencyRelationInput.addEventListener('change', (event) => {
        updatePersonalInfo('emergencyRelation', (event.target as HTMLSelectElement).value);
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const currentInfo: PersonalInfoData = {
            studentName: studentNameInput.value,
            age: Number(ageInput.value),
            gender: genderSelect.value,
            idNumber: idNumberInput.value,
            phoneNo: phoneNoInput.value,
            email: emailInput.value,
            emergencyName: emergencyNameInput.value,
            emergencyPhone: emergencyPhoneInput.value,
            emergencyRelation: emergencyRelationInput.value,
        };

        if (
            !currentInfo.studentName ||
            !currentInfo.age ||
            !currentInfo.gender ||
            !currentInfo.idNumber ||
            !currentInfo.phoneNo ||
            !currentInfo.email ||
            !currentInfo.emergencyName ||
            !currentInfo.emergencyPhone ||
            !currentInfo.emergencyRelation
        ) {
            alert('Please fill in all fields.');
            return;
        }

        const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
        if (!phoneRegex.test(currentInfo.phoneNo)) {
            alert('Phone number must be in the format xxx-xxx-xxxx.');
            return;
        }

        if (!phoneRegex.test(currentInfo.emergencyPhone)) {
            alert('Emergency phone number must be in the format xxx-xxx-xxxx.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(currentInfo.email)) {
            alert('Please enter a valid email address.');
            return;
        }

        setPersonalInfo(currentInfo);
        onNext();
    });

    return container;
}
