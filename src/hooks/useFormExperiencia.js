import { useEffect, useState } from 'react';
import { validarExperiencia } from '../utils/Editor/validarExperiencia';
import { useLocalStorage } from './useLocalStorage';

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

    const cambiarEntrada = (e) => {
        const { name, value, type, checked } = e.target;
        const valorFinal = type === 'checkbox' ? checked : value;
        setDatos(prev => ({ ...prev, [name]: valorFinal }));
        if (errores[name]) {
            setErrores(prev => ({ ...prev, [name]: '' }));
        }
    };

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

    const eliminarExperiencia = (id) => {
        setExperiencias(experiencias.filter(e => e.id !== id));
    };

    const editarExperiencia = (experiencia) => {
        setDatos(experiencia);
        setExperiencias(experiencias.filter(e => e.id !== experiencia.id));
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
