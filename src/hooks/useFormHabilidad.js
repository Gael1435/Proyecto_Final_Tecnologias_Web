import { useEffect, useState } from 'react';
import { validarHabilidad } from '../utils/Editor/validarHabilidad';
import { useLocalStorage } from './useLocalStorage';

// Hook para gestionar el estado del formulario de habilidades (lista, formulario y validaciones)

export const useFormHabilidad = (onValidate) => {
    const [habilidades, setHabilidades] = useLocalStorage('cv_habilidades', []);
    const [datos, setDatos] = useLocalStorage('cv_habilidad', {
        nombre: '',
        categoria: '',
        nivel: 'Intermedio',
        descripcion: ''
    });
    const [errores, setErrores] = useState({});

    useEffect(() => {
        if (onValidate) {
            onValidate(habilidades.length > 0);
        }
    }, [habilidades, onValidate]);

    // Actualiza un campo del formulario y limpia error si existe
    const cambiarEntrada = (e) => {
        const { name, value } = e.target;
        setDatos(prev => ({ ...prev, [name]: value }));
        if (errores[name]) {
            setErrores(prev => ({ ...prev, [name]: '' }));
        }
    };

    // Valida y añade una habilidad a la lista
    const agregarHabilidad = (e) => {
        e.preventDefault();
        const nuevosErrores = validarHabilidad(datos);
        if (Object.keys(nuevosErrores).length > 0) {
            setErrores(nuevosErrores);
            return;
        }

        const nuevaHabilidad = { id: Date.now(), ...datos };
        setHabilidades([...habilidades, nuevaHabilidad]);
        setDatos({
            nombre: '',
            categoria: '',
            nivel: 'Intermedio',
            descripcion: ''
        });
        setErrores({});
    };

    // Elimina una habilidad por id (obtenido desde data-id)
    const eliminarHabilidad = (e) => {
        const id = e.currentTarget?.dataset?.id;
        if (!id) return;
        setHabilidades(habilidades.filter(h => String(h.id) !== String(id)));
    };

    // Carga una habilidad en el formulario para editarla
    const editarHabilidad = (e) => {
        const id = e.currentTarget?.dataset?.id;
        if (!id) return;
        const habilidad = habilidades.find(h => String(h.id) === String(id));
        if (!habilidad) return;
        setDatos(habilidad);
        setHabilidades(habilidades.filter(h => String(h.id) !== String(id)));
    };

    return {
        habilidades, setHabilidades,
        datos, setDatos,
        errores, setErrores,
        cambiarEntrada,
        agregarHabilidad,
        eliminarHabilidad,
        editarHabilidad
    };
};
