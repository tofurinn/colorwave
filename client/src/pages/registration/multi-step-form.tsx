import './steps/steps.css';
import { createNavbar } from '../../components/navbar/navbar';
import type { NavigateCallback } from '../../components/navbar/navbar';
import createRaceInfoStep from './steps/step1';
import createPersonalInfoStep from './steps/step2';
import createAcademicInfoStep from './steps/step3';
import createTShirtStep from './steps/step4';
import createPaymentStep from './steps/step5';

interface RegistrationData {
    raceInfo: {
        raceName: string;
        shortDescription: string;
        contactDetails: string;
        termsAccepted: boolean;
    };
    personalInfo: {
        studentName: string;
        age: number;
        gender: string;
        idNumber: string;
        phoneNo: string;
        email: string;
        emergencyName: string;
        emergencyPhone: string;
        emergencyRelation: string;
    };
    academicInfo: {
        universityName: string;
        studyProgramme: string;
        studentCardFile: File | null;
    };
    tShirtInfo: {
        size: string;
        design: string;
        notes: string;
    };
    paymentInfo: {
        paymentReceiptFile: File | null;
        paymentNotes: string;
    };
}

interface MultiStepFormProps {
    initialData?: Partial<RegistrationData>;
}

export default function createMultiStepForm({ initialData }: MultiStepFormProps = {}): HTMLElement {
    const container = document.createElement('div');
    container.className = 'registration-page';

    const navbar = createNavbar('/registration', ((path: string) => {
        window.history.pushState({}, '', path);
        window.dispatchEvent(new PopStateEvent('popstate'));
    }) as NavigateCallback);

    const formCard = document.createElement('div');
    formCard.className = 'registration-form-card';

    const state: RegistrationData = {
        raceInfo: {
            raceName: initialData?.raceInfo?.raceName ?? '',
            shortDescription: initialData?.raceInfo?.shortDescription ?? '',
            contactDetails: initialData?.raceInfo?.contactDetails ?? '',
            termsAccepted: initialData?.raceInfo?.termsAccepted ?? false,
        },
        personalInfo: {
            studentName: initialData?.personalInfo?.studentName ?? '',
            age: initialData?.personalInfo?.age ?? 0,
            gender: initialData?.personalInfo?.gender ?? '',
            idNumber: initialData?.personalInfo?.idNumber ?? '',
            phoneNo: initialData?.personalInfo?.phoneNo ?? '',
            email: initialData?.personalInfo?.email ?? '',
            emergencyName: initialData?.personalInfo?.emergencyName ?? '',
            emergencyPhone: initialData?.personalInfo?.emergencyPhone ?? '',
            emergencyRelation: initialData?.personalInfo?.emergencyRelation ?? '',
        },
        academicInfo: {
            universityName: initialData?.academicInfo?.universityName ?? '',
            studyProgramme: initialData?.academicInfo?.studyProgramme ?? '',
            studentCardFile: initialData?.academicInfo?.studentCardFile ?? null,
        },
        tShirtInfo: {
            size: initialData?.tShirtInfo?.size ?? '',
            design: initialData?.tShirtInfo?.design ?? '',
            notes: initialData?.tShirtInfo?.notes ?? '',
        },
        paymentInfo: {
            paymentReceiptFile: initialData?.paymentInfo?.paymentReceiptFile ?? null,
            paymentNotes: initialData?.paymentInfo?.paymentNotes ?? '',
        },
    };

    const steps = [
        { id: 1, title: 'Race Info' },
        { id: 2, title: 'Personal Info' },
        { id: 3, title: 'Academic Info' },
        { id: 4, title: 'T-Shirt' },
        { id: 5, title: 'Payment' },
    ];

    let currentStep = 1;
    let completed = false;

    const header = document.createElement('div');
    header.className = 'registration-header';
    header.innerHTML = `
        <div>
            <p class="eyebrow">Student Registration</p>
            <h1>ColorWave 2026 Registration</h1>
            <p class="subtext">Fill in all the fields that apply to you</p>
        </div>
    `;

    const progress = document.createElement('div');
    progress.className = 'progress-bar';
    steps.forEach((step, index) => {
        const pill = document.createElement('div');
        pill.className = `progress-step ${currentStep >= step.id ? 'active' : ''}`;
        pill.innerHTML = `<span>${index + 1}</span><strong>${step.title}</strong>`;
        progress.appendChild(pill);
    });

    const content = document.createElement('div');
    content.className = 'step-content';

    const renderStep = () => {
        content.replaceChildren();
        progress.querySelectorAll('.progress-step').forEach((stepElement, index) => {
            const step = steps[index];
            stepElement.classList.toggle('active', currentStep >= step.id);
            stepElement.classList.toggle('completed', completed || currentStep > step.id);
        });

        if (completed) {
            currentStep = 1;
            completed = false;
        }

        switch (currentStep) {
            case 1:
                content.appendChild(createRaceInfoStep({
                    raceInfo: state.raceInfo,
                    setRaceInfo: (info) => {
                        state.raceInfo = info;
                    },
                    onNext: () => {
                        currentStep = 2;
                        renderStep();
                    },
                }));
                break;
            case 2:
                content.appendChild(createPersonalInfoStep({
                    personalInfo: state.personalInfo,
                    setPersonalInfo: (info) => {
                        state.personalInfo = info;
                    },
                    onBack: () => {
                        currentStep = 1;
                        renderStep();
                    },
                    onNext: () => {
                        currentStep = 3;
                        renderStep();
                    },
                }));
                break;
            case 3:
                content.appendChild(createAcademicInfoStep({
                    academicInfo: state.academicInfo,
                    setAcademicInfo: (info) => {
                        state.academicInfo = info;
                    },
                    onBack: () => {
                        currentStep = 2;
                        renderStep();
                    },
                    onNext: () => {
                        currentStep = 4;
                        renderStep();
                    },
                }));
                break;
            case 4:
                content.appendChild(createTShirtStep({
                    tShirtInfo: state.tShirtInfo,
                    setTShirtInfo: (info) => {
                        state.tShirtInfo = info;
                    },
                    onBack: () => {
                        currentStep = 3;
                        renderStep();
                    },
                    onNext: () => {
                        currentStep = 5;
                        renderStep();
                    },
                }));
                break;
            case 5:
                content.appendChild(createPaymentStep({
                    paymentInfo: state.paymentInfo,
                    setPaymentInfo: (info) => {
                        state.paymentInfo = info;
                    },
                    onBack: () => {
                        currentStep = 4;
                        renderStep();
                    },
                    onNext: () => {
                        completed = false;
                        currentStep = 1;
                        window.alert('Successfully submitted registration form.');
                        window.history.pushState({}, '', '/');
                        window.dispatchEvent(new PopStateEvent('popstate'));
                    },
                }));
                break;
            default:
                break;
        }
    };

    renderStep();

    formCard.append(header, progress, content);
    container.append(navbar, formCard);
    return container;
}
