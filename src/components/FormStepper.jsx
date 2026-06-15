// Controlador del stepper: estado y lógica de navegación (Editor)
import { useCallback, useState, useEffect } from 'react';
import { useFormStepper } from '../hooks/useFormStepper';
// Hook de router para navegación programática a /preview
import { useNavigate } from 'react-router-dom';
import PersonalForm from './PersonalForm';
import SkillForm from './SkillForm';
import EducationForm from './EducationForm';
import ProjectForm from './ProjectForm';
import ExtraInfoForm from './ExtraInfoForm';

function FormStepper() {
    const {
        activeStep,
        menuOpen,
        validSteps,
        handleNext,
        handlePrev,
        handleStepClick,
        handleStepClickEvent,
        resetAll,
        setMenuOpen,
        closeMenu,
        toggleMenu,
        updateStepValidity,
        canNavigate
    } = useFormStepper();

    const navigate = useNavigate();

    // Definición de pasos mostrados en la barra lateral
    const steps = [
        { id: 0, label: 'Personal', component: PersonalForm },
        { id: 1, label: 'Habilidades', component: SkillForm },
        { id: 2, label: 'Educación', component: EducationForm },
        { id: 3, label: 'Proyectos', component: ProjectForm },
        { id: 4, label: 'Experiencia', component: ExtraInfoForm }
    ];

    const CurrentComponent = steps[activeStep].component;
    
        const allValid = Object.values(validSteps).every(Boolean);

    const handleValidate = useCallback(
        (isValid) => updateStepValidity(activeStep, isValid),
        [activeStep, updateStepValidity]
    );

    // Mensaje global de retroalimentación cuando el usuario intenta acciones
    // inválidas (ej. avanzar sin validar o intentar abrir paso bloqueado)
    const [formMessage, setFormMessage] = useState('');

    useEffect(() => {
        if (!formMessage) return;
        const t = setTimeout(() => setFormMessage(''), 4000);
        return () => clearTimeout(t);
    }, [formMessage]);

    return (
        <div className="editor-root flex flex-col lg:flex-row overflow-hidden h-full min-h-0">
            {/* Barra lateral con navegación de pasos */}
            <aside className={`${menuOpen ? 'block' : 'hidden'} lg:block w-full lg:w-64 flex-shrink-0 flex flex-col overflow-hidden h-full min-h-0`}>
                <div className="p-4 sticky top-0 z-10 flex items-center justify-between">
                    <h2 className="text-lg font-bold">DevProfile</h2>
                    <button type="button" className="lg:hidden px-2 py-1 text-sm rounded" onClick={closeMenu}>Cerrar</button>
                </div>

                {/* Lista de navegación de pasos */}
                <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto max-h-[38vh] lg:max-h-none">
                    {steps.map((step) => {
                        const isCurrent = activeStep === step.id;
                        const isDisabled = !canNavigate(step.id) && !isCurrent;

                        // find first invalid previous step to show a simple reason
                        let firstInvalid = null;
                        for (let i = 0; i < step.id; i++) {
                            if (!validSteps[i]) {
                                firstInvalid = i;
                                break;
                            }
                        }

                        const title = isDisabled && firstInvalid !== null ? `Completa: ${steps[firstInvalid].label}` : '';

                        return (
                            <button
                                key={step.id}
                                data-step={step.id}
                                onClick={(e) => {
                                    handleStepClickEvent(e);
                                    if (isDisabled) {
                                        if (firstInvalid !== null) setFormMessage(`Completa: ${steps[firstInvalid].label} antes de acceder a este paso`);
                                        else setFormMessage('No puedes ir a este paso todavía');
                                    }
                                }}
                                aria-disabled={isDisabled}
                                title={title}
                                className={`w-full px-4 py-3 text-left text-sm font-medium rounded transition ${isDisabled ? 'opacity-60 cursor-not-allowed' : ''}`}>
                                {step.label}
                            </button>
                        );
                    })}
                </nav>

                {/* Acciones en el pie de la barra lateral */}
                <div className="p-4 text-xs border-t border-slate-200 dark:border-slate-800 lg:sticky lg:bottom-0">
                    <button
                        type="button"
                        onClick={() => allValid && navigate('/preview')}
                        disabled={!allValid}
                        className={`w-full mb-3 px-3 py-2 rounded text-sm font-medium ${allValid ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white opacity-50 cursor-not-allowed'}`}>
                        Ir a Preview
                    </button>
                    <button type="button" onClick={resetAll} className="w-full mb-3 px-3 py-2 rounded text-sm font-medium border border-red-500 text-red-500 hover:bg-red-500 hover:text-white">Limpiar todo</button>
                    Paso {activeStep + 1} de {steps.length}
                </div>
            </aside>

            {/* Área principal para el paso activo */}
            <div className="flex-1 flex flex-col overflow-hidden h-full min-h-0">
                <header className="px-6 py-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">
                        {steps[activeStep].label}
                    </h1>
                    <button type="button" className="lg:hidden px-3 py-2 rounded text-sm" onClick={toggleMenu}>{menuOpen ? 'Ocultar menú' : 'Abrir menú'}</button>
                </header>
                {/* Mensaje global de retroalimentación (visible temporalmente) */}
                {formMessage && (
                    <div role="alert" className="px-6">
                        <div className="mb-4 p-3 rounded bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 text-sm">
                            {formMessage}
                        </div>
                    </div>
                )}

                {/* Renderiza el componente del paso activo */}
                <main className="flex-1 overflow-y-auto px-8 py-6 min-h-0">
                    <div className="w-full h-full min-h-0 flex justify-center">
                        <div className="w-full max-w-screen-xl px-4">
                            <CurrentComponent onValidate={handleValidate} />
                        </div>
                    </div>
                </main>

                {/* Pie con botones de navegación */}
                <footer className="px-6 py-4 flex gap-3 justify-end">
                    <button onClick={handlePrev} disabled={activeStep === 0} className="px-4 py-2 rounded text-sm transition duration-200 ease-in-out bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed">Anterior</button>
                    <button
                        onClick={() => {
                            if (activeStep === steps.length - 1) {
                                navigate('/preview');
                                return;
                            }
                            if (validSteps[activeStep]) {
                                handleNext();
                            } else {
                                setFormMessage('Revisa los campos del paso antes de continuar');
                            }
                        }}
                        aria-disabled={!validSteps[activeStep]}
                        className={`px-4 py-2 rounded text-sm transition duration-200 ease-in-out bg-blue-600 text-white ${validSteps[activeStep] ? '' : 'opacity-50 cursor-not-allowed'}`}>
                        Siguiente
                    </button>
                </footer>
            </div>
        </div>
    );
}

export default FormStepper;
