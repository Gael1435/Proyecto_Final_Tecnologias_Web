// Valida campos obligatorios para una experiencia laboral (Editor)
import { required } from './validationHelpers';

export const validarExperiencia = (data) => {
  return required([
    { name: 'empresa', message: 'La empresa es obligatoria' },
    { name: 'puesto', message: 'El puesto es obligatorio' }
  ], data);
};

export const esExperienciaCompleta = (data) => {
  return (
    data.empresa &&
    data.puesto &&
    !Object.keys(validarExperiencia(data)).length
  );
};
