import { useEffect, useState } from 'react';
import { validarExperiencia } from '../utils/Editor/validarExperiencia';
import { useLocalStorage } from './useLocalStorage';

// Hook para gestionar experiencias laborales: lista, formulario y validación

export const useFormExperiencia = (onValidate) => {
    const [experiencias, setExperiencias] = useLocalStorage('cv_experiencias', []);
    
    const [datos, setDatos] = useLocalStorage('cv_experiencias_datos', {
        empresa: '',
        puesto: '',
        tipo: 'Tiempo completo',
        fechaInicio: '',
        fechaFin: '',
        presente: false,
        descripcion: '',
        ubicacion: ''
    });

    const [errores, setErrores] = useState({});

    useEffect(() => {
        if (onValidate) {
            onValidate(experiencias.length > 0);
        }
    }, [experiencias, onValidate]);

    // Actualiza campos del formulario (maneja checkboxes)
    const cambiarEntrada = (e) => {
        const { name, value, type, checked } = e.target;
        const valorFinal = type === 'checkbox' ? checked : value;
        setDatos(prev => ({ ...prev, [name]: valorFinal }));
        if (errores[name]) {
            setErrores(prev => ({ ...prev, [name]: '' }));
        }
    };

    // Valida y agrega una experiencia a la lista
    const agregarExperiencia = (e) => {
        e.preventDefault();
        const nuevosErrores = validarExperiencia(datos);
        if (Object.keys(nuevosErrores).length > 0) {
            setErrores(nuevosErrores);
            return;
        }

        const nuevaExperiencia = { id: Date.now(), ...datos };
        setExperiencias([...experiencias, nuevaExperiencia]);
        setDatos({
            empresa: '',
            puesto: '',
            tipo: 'Tiempo completo',
            fechaInicio: '',
            fechaFin: '',
            presente: false,
            descripcion: '',
            ubicacion: ''
        });
        setErrores({});
    };

    // Elimina una experiencia por id (data-id)
    const eliminarExperiencia = (e) => {
        const id = e.currentTarget?.dataset?.id;
        if (!id) return;
        setExperiencias(experiencias.filter(exp => String(exp.id) !== String(id)));
    };

    // Carga una experiencia en el formulario para editarla
    const editarExperiencia = (e) => {
        const id = e.currentTarget?.dataset?.id;
        if (!id) return;
        const experiencia = experiencias.find(exp => String(exp.id) === String(id));
        if (!experiencia) return;
        setDatos(experiencia);
        setExperiencias(experiencias.filter(exp => String(exp.id) !== String(id)));
    };

    return {
        experiencias, setExperiencias,
        datos, setDatos,
        errores, setErrores,
        cambiarEntrada,
        agregarExperiencia,
        eliminarExperiencia,
        editarExperiencia
    };
};
