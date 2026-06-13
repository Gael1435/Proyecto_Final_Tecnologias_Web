import { useEffect, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';

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

    const updateStepValidity = (stepId, isValid) => {
        setValidSteps(prev => ({ ...prev, [stepId]: isValid }));
    };

    const canNavigate = (stepId) => {
        return visitedSteps.includes(stepId) || stepId === activeStep;
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
        resetAll,
        setMenuOpen,
        updateStepValidity,
        canNavigate
    };
};