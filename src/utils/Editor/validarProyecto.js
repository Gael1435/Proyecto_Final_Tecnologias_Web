// Valida campos obligatorios para proyectos (Editor)
import { required } from './validationHelpers';

export const validarProyecto = (data) => {
  return required([
    { name: 'nombre', message: 'El nombre es obligatorio' },
    { name: 'descripcion', message: 'La descripción es obligatoria' }
  ], data);
};

export const esProyectoCompleto = (data) => {
  return (
    data.nombre &&
    data.descripcion &&
    !Object.keys(validarProyecto(data)).length
  );
};
