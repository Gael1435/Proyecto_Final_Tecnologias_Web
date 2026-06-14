import { useEffect, useState } from 'react';
import { validarEducacion } from '../utils/Editor/validarEducacion';
import { useLocalStorage } from './useLocalStorage';

// Hook para gestionar el formulario de educación (lista, datos y validación)

export const useFormEducacion = (onValidate) => {
    const [educaciones, setEducaciones] = useLocalStorage('cv_educacion', []);
    const [datos, setDatos] = useLocalStorage('cv_educacion_datos', {
        institucion: '',
        titulo: '',
        carrera: '',
        estado: 'En progreso',
        fechaInicio: '',
        fechaFin: '',
        descripcion: ''
    });
    const [errores, setErrores] = useState({});

    useEffect(() => {
        if (onValidate) {
            onValidate(educaciones.length > 0);
        }
    }, [educaciones, onValidate]);

    // Actualiza un campo del formulario y borra error existente
    const cambiarEntrada = (e) => {
        const { name, value } = e.target;
        setDatos(prev => ({ ...prev, [name]: value }));
        if (errores[name]) {
            setErrores(prev => ({ ...prev, [name]: '' }));
        }
    };

    // Valida y añade una nueva educación a la lista
    const agregarEducacion = (e) => {
        e.preventDefault();
        const nuevosErrores = validarEducacion(datos);
        if (Object.keys(nuevosErrores).length > 0) {
            setErrores(nuevosErrores);
            return;
        }

        const nuevaEducacion = { id: Date.now(), ...datos };
        setEducaciones([...educaciones, nuevaEducacion]);
        setDatos({
            institucion: '',
            titulo: '',
            carrera: '',
            estado: 'En progreso',
            fechaInicio: '',
            fechaFin: '',
            descripcion: ''
        });
        setErrores({});
    };

    // Elimina una educación por id (data-id)
    const eliminarEducacion = (e) => {
        const id = e.currentTarget?.dataset?.id;
        if (!id) return;
        setEducaciones(educaciones.filter(ed => String(ed.id) !== String(id)));
    };

    // Carga una educación en el formulario para editarla
    const editarEducacion = (e) => {
        const id = e.currentTarget?.dataset?.id;
        if (!id) return;
        const educacion = educaciones.find(ed => String(ed.id) === String(id));
        if (!educacion) return;
        setDatos(educacion);
        setEducaciones(educaciones.filter(ed => String(ed.id) !== String(id)));
    };

    return {
        educaciones, setEducaciones,
        datos, setDatos,
        errores, setErrores,
        cambiarEntrada,
        agregarEducacion,
        eliminarEducacion,
        editarEducacion
    };
};
