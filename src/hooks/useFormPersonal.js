import { useEffect, useState } from 'react';
import { validarPersonal } from '../utils/Editor/validarPersonal';
import { useLocalStorage } from './useLocalStorage';

export const useFormPersonal = (onValidate) => {
    const [prevImagen, setPrevImagen] = useLocalStorage('cv_personal_imagen', null);
    const [datos, setDatos] = useLocalStorage('cv_personal', {
        nombre: '',
        apellidoP: '',
        apellidoM: '',
        carrera: '',
        ciudad: '',
        email: '',
        telefono: '',
        descripcion: '',
        github: '',
        linkedin: '',
        portafolio: '',
        repositorio: '',
        enlacePersonal: ''
    });
    const [errores, setErrores] = useState({});

    useEffect(() => {
        if (onValidate) {
            onValidate(Object.keys(validarPersonal(datos)).length === 0);
        }
    }, [datos, onValidate]);

    const cambiarImagen = (e) => {
        const archivo = e.target.files[0];
        if (archivo) {
            const lector = new FileReader();
            lector.onloadend = () => setPrevImagen(lector.result);
            lector.readAsDataURL(archivo);
        }
    };

    const cambiarEntrada = (e) => {
        const { name, value } = e.target;
        setDatos(prev => ({ ...prev, [name]: value }));
        if (errores[name]) {
            setErrores(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validarAlDesenfoque = (campo) => {
        const nuevosErrores = validarPersonal(datos);
        setErrores(prev => ({
            ...prev,
            [campo]: nuevosErrores[campo] || ''
        }));
    };

    return {
        prevImagen, setPrevImagen,
        datos, setDatos,
        errores, setErrores,
        cambiarImagen,
        cambiarEntrada,
        validarAlDesenfoque
    };
};
