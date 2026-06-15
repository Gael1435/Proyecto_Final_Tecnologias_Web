import { useEffect, useState } from 'react';
import { validarProyecto, validarProyectoExtras } from '../utils/Editor/validarProyecto';
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
        // Combina validación base y validaciones extra (longitudes, URLs)
        const nuevosErrores = { ...validarProyecto(datos), ...validarProyectoExtras(datos) };
        if (Object.keys(nuevosErrores).length > 0) {
            setErrores(nuevosErrores);
            return;
        }
        // Evitar proyectos duplicados por nombre o enlace
        // Comprobación por nombre (case-insensitive)
        const nombreNorm = (datos.nombre || '').trim().toLowerCase();
        if (proyectos.some(p => String(p.nombre || '').trim().toLowerCase() === nombreNorm)) {
            setErrores({ nombre: 'Ya existe un proyecto con ese nombre' });
            return;
        }
        // Comprobación por enlace exacto si se ha proporcionado
        if (datos.enlace && proyectos.some(p => p.enlace && p.enlace === datos.enlace)) {
            setErrores({ enlace: 'Ya existe un proyecto con ese enlace' });
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
