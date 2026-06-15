// Valida campos personales y formatos (email, teléfono) usados en el Editor
// Contiene validaciones específicas del formulario personal; usa
// funciones genéricas de `validationRules` para reglas comunes.
import { required } from './validationHelpers';
import { isValidURL, minLength, maxLength, isValidEmail, isValidPhone } from './validationRules';

export const validarPersonal = (data) => {
  const errors = required([
    { name: 'nombre', message: 'El nombre es obligatorio' },
    { name: 'carrera', message: 'La carrera es obligatoria' },
    { name: 'ciudad', message: 'La ciudad es obligatoria' },
    { name: 'email', message: 'El email es obligatorio' },
    { name: 'descripcion', message: 'La descripción es obligatoria' }
  ], data);

  // Validación de formatos básicos
  if (data.email && !isValidEmail(data.email)) {
    errors.email = 'Email inválido';
  }

  if (data.telefono && !isValidPhone(data.telefono)) {
    errors.telefono = 'Teléfono inválido';
  }

  // URLs de enlaces profesionales (si están rellenadas)
  ['github', 'linkedin', 'portafolio', 'repositorio', 'enlacePersonal'].forEach((f) => {
    if (data[f] && String(data[f]).trim() !== '' && !isValidURL(data[f])) {
      errors[f] = 'URL inválida';
    }
  });

  // Longitud mínima/máxima para descripción
  if (data.descripcion) {
    if (!minLength(data.descripcion, 10)) {
      errors.descripcion = 'La descripción es muy corta (mínimo 10 caracteres)';
    } else if (!maxLength(data.descripcion, 1000)) {
      errors.descripcion = 'La descripción es demasiado larga (máximo 1000 caracteres)';
    }
  }

  return errors;
};

export const esPersonalCompleto = (data) => {
  return (
    data.nombre &&
    data.carrera &&
    data.ciudad &&
    data.email &&
    data.descripcion &&
    !Object.keys(validarPersonal(data)).length
  );
};
