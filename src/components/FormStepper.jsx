import { useFormStepper } from '../hooks/useFormStepper';
import PersonalForm from './PersonalForm';
import SkillForm from './SkillForm';
import EducationForm from './EducationForm';
import ProjectForm from './ProjectForm';
import ExtraInfoForm from './ExtraInfoForm';

const initialValidSteps = {
    0: false,
    1: false,
    2: false,
    3: false,
    4: false
};

function FormStepper() {
    const {
        activeStep,
        menuOpen,
        validSteps,
        handleNext,
        handlePrev,
        handleStepClick,
        resetAll,
        setMenuOpen,
        updateStepValidity,
        canNavigate
    } = useFormStepper();

    const steps = [
        { id: 0, label: 'Personal', component: PersonalForm },
        { id: 1, label: 'Habilidades', component: SkillForm },
        { id: 2, label: 'Educación', component: EducationForm },
        { id: 3, label: 'Proyectos', component: ProjectForm },
        { id: 4, label: 'Experiencia', component: ExtraInfoForm }
    ];

    const CurrentComponent = steps[activeStep].component;

    return (
        <div className="flex flex-col lg:flex-row overflow-hidden h-full min-h-0">
            <aside className={`${menuOpen ? 'block' : 'hidden'} lg:block w-full lg:w-64 flex-shrink-0 flex flex-col overflow-hidden h-auto lg:h-full min-h-0 bg-slate-10 dark:bg-slate-600 dark:text-black`}>
                <div className="p-4 sticky top-0 z-10 bg-slate-10 dark:bg-slate-600 flex items-center justify-between">
                    <h2 className="text-lg font-bold">DevProfile</h2>
                    <button
                        type="button"
                        className="lg:hidden px-2 py-1 text-sm rounded bg-slate-200 dark:bg-slate-800"
                        onClick={() => setMenuOpen(false)}
                    >Cerrar</button>
                </div>

                <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto max-h-[38vh] lg:max-h-none">
                    {steps.map((step) => {
                        const isCurrent = activeStep === step.id;
                        const isDisabled = !canNavigate(step.id) && !isCurrent;
                        const isValid = validSteps[step.id];

                        return (
                            <button
                                key={step.id}
                                onClick={() => handleStepClick(step.id)}
                                disabled={isDisabled}
                                className={`w-full px-4 py-3 text-left text-sm font-medium rounded transition ${isCurrent ? 'bg-gray-50 dark:bg-gray-100' : isValid ? 'bg-slate-100 dark:bg-slate-900' : 'bg-transparent'} ${isDisabled ? 'opacity-60 cursor-not-allowed' : 'hover:bg-slate-200 dark:hover:bg-slate-800'}`}
                            >
                                {step.label}
                            </button>
                        );
                    })}
                </nav>

                <div className="p-4 text-xs bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 lg:sticky lg:bottom-0">
                    <button
                        type="button"
                        onClick={resetAll}
                        className="w-full mb-3 px-3 py-2 rounded bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition"
                    >
                        Limpiar todo
                    </button>
                    Paso {activeStep + 1} de {steps.length}
                </div>
            </aside>

            <div className="flex-1 flex flex-col overflow-hidden h-full min-h-0">
                <header className="px-6 py-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">
                        {steps[activeStep].label}
                    </h1>
                    <button
                        type="button"
                        className="lg:hidden px-3 py-2 rounded bg-slate-200 dark:bg-slate-800 text-sm"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? 'Ocultar menú' : 'Abrir menú'}
                    </button>
                </header>

                <main className="flex-1 overflow-y-auto px-6 py-6 min-h-0">
                    <div className="max-w-2xl mx-auto w-full h-full min-h-0">
                        <CurrentComponent onValidate={(isValid) => updateStepValidity(activeStep, isValid)} />
                    </div>
                </main>

                <footer className="px-6 py-4 flex gap-3 justify-end">
                    <button
                        onClick={handlePrev}
                        disabled={activeStep === 0}
                        className="px-4 py-2 rounded text-sm transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-200 dark:hover:bg-slate-800"
                    >
                        Anterior
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={activeStep === steps.length - 1 || !validSteps[activeStep]}
                        className="px-4 py-2 rounded text-sm transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-200 dark:hover:bg-slate-800"
                    >
                        Siguiente
                    </button>
                </footer>
            </div>
        </div>
    );
}

export default FormStepper;
