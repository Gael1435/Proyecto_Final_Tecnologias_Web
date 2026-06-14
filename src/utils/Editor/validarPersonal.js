// Valida campos personales y formatos (email, teléfono) usados en el Editor
import { required } from './validationHelpers';

export const validarPersonal = (data) => {
  const errors = required([
    { name: 'nombre', message: 'El nombre es obligatorio' },
    { name: 'carrera', message: 'La carrera es obligatoria' },
    { name: 'ciudad', message: 'La ciudad es obligatoria' },
    { name: 'email', message: 'El email es obligatorio' },
    { name: 'descripcion', message: 'La descripción es obligatoria' }
  ], data);

  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Email inválido';
  }

  if (data.telefono && !/^[\d\s\-\+\(\)]{7,}$/.test(data.telefono)) {
    errors.telefono = 'Teléfono inválido';
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
