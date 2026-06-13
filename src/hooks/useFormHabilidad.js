import { useEffect, useState } from 'react';
import { validarHabilidad } from '../utils/Editor/validarHabilidad';
import { useLocalStorage } from './useLocalStorage';

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

    const cambiarEntrada = (e) => {
        const { name, value } = e.target;
        setDatos(prev => ({ ...prev, [name]: value }));
        if (errores[name]) {
            setErrores(prev => ({ ...prev, [name]: '' }));
        }
    };

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

    const eliminarHabilidad = (id) => {
        setHabilidades(habilidades.filter(h => h.id !== id));
    };

    const editarHabilidad = (habilidad) => {
        setDatos(habilidad);
        setHabilidades(habilidades.filter(h => h.id !== habilidad.id));
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
