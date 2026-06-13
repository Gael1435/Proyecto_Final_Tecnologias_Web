import { useEffect, useState } from 'react';
import { validarProyecto } from '../utils/Editor/validarProyecto';
import { useLocalStorage } from './useLocalStorage';

export const useFormProyecto = (onValidate) => {
    const [proyectos, setProyectos] = useLocalStorage('cv_proyectos', []);
    const [datos, setDatos] = useLocalStorage('cv_proyectos_datos', {
        nombre: '',
        descripcion: '',
        tecnologias: '',
        enlace: '',
        github: '',
        fechaInicio: '',
        fechaFin: '',
        destacado: false
    });
    const [errores, setErrores] = useState({});

    useEffect(() => {
        if (onValidate) {
            onValidate(proyectos.length > 0);
        }
    }, [proyectos, onValidate]);

    const cambiarEntrada = (e) => {
        const { name, value, type, checked } = e.target;
        const valorFinal = type === 'checkbox' ? checked : value;
        setDatos(prev => ({ ...prev, [name]: valorFinal }));
        if (errores[name]) {
            setErrores(prev => ({ ...prev, [name]: '' }));
        }
    };

    const agregarProyecto = (e) => {
        e.preventDefault();
        const nuevosErrores = validarProyecto(datos);
        if (Object.keys(nuevosErrores).length > 0) {
            setErrores(nuevosErrores);
            return;
        }

        const nuevoProyecto = { id: Date.now(), ...datos };
        setProyectos([...proyectos, nuevoProyecto]);
        setDatos({
            nombre: '',
            descripcion: '',
            tecnologias: '',
            enlace: '',
            github: '',
            fechaInicio: '',
            fechaFin: '',
            destacado: false
        });
        setErrores({});
    };

    const eliminarProyecto = (id) => {
        setProyectos(proyectos.filter(p => p.id !== id));
    };

    const editarProyecto = (proyecto) => {
        setDatos(proyecto);
        setProyectos(proyectos.filter(p => p.id !== proyecto.id));
    };

    return {
        proyectos, setProyectos,
        datos, setDatos,
        errores, setErrores,
        cambiarEntrada,
        agregarProyecto,
        eliminarProyecto,
        editarProyecto
    };
};
