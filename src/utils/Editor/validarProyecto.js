// Valida campos obligatorios para proyectos (Editor)
// Usa reglas genéricas para URL y longitudes cuando corresponda.
import { required } from './validationHelpers';
import { isValidURL, minLength, maxLength } from './validationRules';

export const validarProyecto = (data) => {
  return required([
    { name: 'nombre', message: 'El nombre es obligatorio' },
    { name: 'descripcion', message: 'La descripción es obligatoria' }
  ], data);
};

// Extensiones: validar longitud y URLs
export const validarProyectoExtras = (data) => {
  const errors = {};
  // Nombre: longitud mínima y máxima
  if (data.nombre && !minLength(data.nombre, 3)) {
    errors.nombre = 'El nombre debe tener al menos 3 caracteres';
  } else if (data.nombre && !maxLength(data.nombre, 100)) {
    errors.nombre = 'El nombre es demasiado largo (máx 100 caracteres)';
  }

  // Descripción: longitudes
  if (data.descripcion) {
    if (!minLength(data.descripcion, 10)) {
      errors.descripcion = 'La descripción es muy corta (mínimo 10 caracteres)';
    } else if (!maxLength(data.descripcion, 2000)) {
      errors.descripcion = 'La descripción es demasiado larga (máximo 2000 caracteres)';
    }
  }

  // URLs del proyecto
  ['enlace', 'github'].forEach((f) => {
    if (data[f] && String(data[f]).trim() !== '' && !isValidURL(data[f])) {
      errors[f] = 'URL inválida';
    }
  });

  return errors;
};

export const esProyectoCompleto = (data) => {
  return (
    data.nombre &&
    data.descripcion &&
    !Object.keys(validarProyecto(data)).length
  );
};
