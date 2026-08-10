import './steps.css';

interface AcademicInfoData {
    universityName: string;
    studyProgramme: string;
    studentCardFile: File | null;
}

interface AcademicInfoProps {
    academicInfo: AcademicInfoData;
    setAcademicInfo: (info: AcademicInfoData) => void;
    onNext: () => void;
}

export default function createAcademicInfoStep({
    academicInfo,
    setAcademicInfo,
    onNext,
}: AcademicInfoProps): HTMLElement {
    const container = document.createElement('div');
    container.className = 'step-container';
    container.innerHTML = `
        <div class="step-header">
            <h2>Step 3: Academic Information</h2>
        </div>

        <form class="academic-info-form">
            <div class="form-grid">
                <div class="form-group">
                    <label for="universityName">University Name *</label>
                    <input id="universityName" type="text" placeholder="e.g., State University" required />
                </div>

                <div class="form-group">
                    <label for="studyProgramme">Study Programme *</label>
                    <input id="studyProgramme" type="text" placeholder="e.g., Computer Science" required />
                </div>

                <div class="form-group">
                    <label for="studentCardFile">Student Card / Metrics Card (JPG) *</label>
                    <input id="studentCardFile" type="file" accept="image/jpeg" required />
                </div>
            </div>

            <div class="form-actions">
                <button type="submit" class="next-button">Next</button>
            </div>
        </form>
    `;

    const form = container.querySelector<HTMLFormElement>('form')!;
    const universityNameInput = container.querySelector<HTMLInputElement>('#universityName')!;
    const studyProgrammeInput = container.querySelector<HTMLInputElement>('#studyProgramme')!;
    const studentCardFileInput = container.querySelector<HTMLInputElement>('#studentCardFile')!;

    universityNameInput.value = academicInfo.universityName;
    studyProgrammeInput.value = academicInfo.studyProgramme;

    const updateAcademicInfo = (field: keyof AcademicInfoData, value: string | File | null) => {
        setAcademicInfo({
            ...academicInfo,
            [field]: value,
        });
    };

    universityNameInput.addEventListener('input', (event) => {
        updateAcademicInfo('universityName', (event.target as HTMLInputElement).value);
    });

    studyProgrammeInput.addEventListener('input', (event) => {
        updateAcademicInfo('studyProgramme', (event.target as HTMLInputElement).value);
    });

    studentCardFileInput.addEventListener('change', (event) => {
        const file = (event.target as HTMLInputElement).files?.[0] ?? null;
        updateAcademicInfo('studentCardFile', file);
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const currentInfo: AcademicInfoData = {
            universityName: universityNameInput.value.trim(),
            studyProgramme: studyProgrammeInput.value.trim(),
            studentCardFile: studentCardFileInput.files?.[0] ?? academicInfo.studentCardFile,
        };

        if (!currentInfo.universityName || !currentInfo.studyProgramme || !currentInfo.studentCardFile) {
            alert('Please fill in all fields and upload a JPG student card.');
            return;
        }

        const file = currentInfo.studentCardFile;
        if (file.type !== 'image/jpeg' && file.type !== 'image/jpg') {
            alert('Student card must be a JPG image.');
            return;
        }

        setAcademicInfo(currentInfo);
        onNext();
    });

    return container;
}
