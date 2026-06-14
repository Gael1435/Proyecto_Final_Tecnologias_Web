// Valida campos obligatorios para una entrada de educación (Editor)
import { required } from './validationHelpers';

export const validarEducacion = (data) => {
  return required([
    { name: 'institucion', message: 'La institución es obligatoria' },
    { name: 'titulo', message: 'El título es obligatorio' }
  ], data);
};

export const esEducacionCompleta = (data) => {
  return (
    data.institucion &&
    data.titulo &&
    !Object.keys(validarEducacion(data)).length
  );
};
