import { useEffect, useState } from 'react';
import { validarEducacion } from '../utils/Editor/validarEducacion';
import { useLocalStorage } from './useLocalStorage';

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

    const cambiarEntrada = (e) => {
        const { name, value } = e.target;
        setDatos(prev => ({ ...prev, [name]: value }));
        if (errores[name]) {
            setErrores(prev => ({ ...prev, [name]: '' }));
        }
    };

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

    const eliminarEducacion = (id) => {
        setEducaciones(educaciones.filter(e => e.id !== id));
    };

    const editarEducacion = (educacion) => {
        setDatos(educacion);
        setEducaciones(educaciones.filter(e => e.id !== educacion.id));
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
