import { useEffect, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';

// Controla el stepper del editor: paso activo, navegación secuencial y validez por paso

const initialValidSteps = {
    0: false,
    1: false,
    2: false,
    3: false,
    4: false
};

export const useFormStepper = () => {
    const [activeStep, setActiveStep] = useLocalStorage('cv_stepper_active', 0);
    const [visitedSteps, setVisitedSteps] = useLocalStorage('cv_stepper_visited', [0]);
    const [validSteps, setValidSteps] = useLocalStorage('cv_stepper_valid', initialValidSteps);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        if (!visitedSteps.includes(activeStep)) {
            setVisitedSteps([...visitedSteps, activeStep]);
        }
    }, [activeStep, visitedSteps, setVisitedSteps]);

    // Marca un paso como válido o inválido
    const updateStepValidity = (stepId, isValid) => {
        setValidSteps(prev => ({ ...prev, [stepId]: isValid }));
    };

    // Decide si se puede navegar a un paso (avanzar requiere pasos previos válidos)
    const canNavigate = (stepId) => {
        if (stepId === activeStep) return true; // permanecer
        if (stepId < activeStep) return true; // retroceder

        // avanzar solo si todos los anteriores están validados
        for (let i = 0; i < stepId; i++) {
            if (!validSteps[i]) return false;
        }
        return true;
    };

    const handleNext = () => {
        if (activeStep < Object.keys(initialValidSteps).length - 1 && validSteps[activeStep]) {
            setActiveStep(activeStep + 1);
        }
    };

    const handlePrev = () => {
        if (activeStep > 0) {
            setActiveStep(activeStep - 1);
        }
    };

    const handleStepClick = (stepId) => {
        if (canNavigate(stepId)) {
            setActiveStep(stepId);
            if (menuOpen) setMenuOpen(false);
        }
    };

    const handleStepClickEvent = (e) => {
        const stepId = Number(e.currentTarget?.dataset?.step);
        if (Number.isNaN(stepId)) return;
        handleStepClick(stepId);
    };

    const closeMenu = () => setMenuOpen(false);

    const toggleMenu = () => setMenuOpen(prev => !prev);

    const resetAll = () => {
        const keys = [
            'cv_personal', 'cv_personal_imagen',
            'cv_habilidades', 'cv_habilidad',
            'cv_educacion', 'cv_educacion_datos',
            'cv_proyectos', 'cv_proyectos_datos',
            'cv_experiencias', 'cv_experiencias_datos',
            'cv_stepper_active', 'cv_stepper_visited', 'cv_stepper_valid'
        ];

        keys.forEach((key) => {
            if (typeof globalThis.localStorage !== 'undefined') {
                globalThis.localStorage.removeItem(key);
            }
        });

        setActiveStep(0);
        setVisitedSteps([0]);
        setValidSteps(initialValidSteps);
        setMenuOpen(false);

        if (typeof globalThis.location !== 'undefined') {
            globalThis.location.reload();
        }
    };

    return {
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
    };
};