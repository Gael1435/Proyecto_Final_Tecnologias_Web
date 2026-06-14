import { useEffect, useState } from 'react';
import { validarProyecto } from '../utils/Editor/validarProyecto';
import { useLocalStorage } from './useLocalStorage';

// Hook para gestionar proyectos: lista, formulario y validaciones

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

    // Actualiza campos del formulario (incluye checkbox)
    const cambiarEntrada = (e) => {
        const { name, value, type, checked } = e.target;
        const valorFinal = type === 'checkbox' ? checked : value;
        setDatos(prev => ({ ...prev, [name]: valorFinal }));
        if (errores[name]) {
            setErrores(prev => ({ ...prev, [name]: '' }));
        }
    };

    // Valida y agrega un proyecto a la lista
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

    // Elimina un proyecto por id (data-id)
    const eliminarProyecto = (e) => {
        const id = e.currentTarget?.dataset?.id;
        if (!id) return;
        setProyectos(proyectos.filter(p => String(p.id) !== String(id)));
    };

    // Carga un proyecto en el formulario para editar
    const editarProyecto = (e) => {
        const id = e.currentTarget?.dataset?.id;
        if (!id) return;
        const proyecto = proyectos.find(p => String(p.id) === String(id));
        if (!proyecto) return;
        setDatos(proyecto);
        setProyectos(proyectos.filter(p => String(p.id) !== String(id)));
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
