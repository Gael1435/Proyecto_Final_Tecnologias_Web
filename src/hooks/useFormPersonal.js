import { useEffect, useState } from 'react';
import { validarPersonal } from '../utils/Editor/validarPersonal';
import { useLocalStorage } from './useLocalStorage';

// Hook para gestionar datos personales, imagen de perfil y validaciones

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
    // Inicializar errores a partir de los datos cargados (por ejemplo tras
    // recargar la página) para que los campos inválidos muestren el borde rojo
    // sin necesidad de que el usuario vuelva a interactuar con cada campo.
    useEffect(() => {
        const initial = validarPersonal(datos);
        setErrores(initial);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (onValidate) {
            onValidate(Object.keys(validarPersonal(datos)).length === 0);
        }
    }, [datos, onValidate]);

    // Convierte archivo seleccionado a dataURL y lo guarda como preview
    const cambiarImagen = (e) => {
        const archivo = e.target.files[0];
        if (archivo) {
            const lector = new FileReader();
            lector.onloadend = () => setPrevImagen(lector.result);
            lector.readAsDataURL(archivo);
        }
    };

    // Actualiza campo del formulario y limpia error si existe
    const cambiarEntrada = (e) => {
        const { name, value } = e.target;
        setDatos(prev => ({ ...prev, [name]: value }));
        if (errores[name]) {
            setErrores(prev => ({ ...prev, [name]: '' }));
        }
    };

    // Valida un solo campo al perder el foco
    const validarAlDesenfoque = (e) => {
        const campo = e?.target?.name;
        if (!campo) return;
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
