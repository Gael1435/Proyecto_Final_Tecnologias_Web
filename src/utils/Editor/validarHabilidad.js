// Valida nombre, categoría y nivel para una habilidad (Editor)
import { required } from './validationHelpers';

export const validarHabilidad = (data) => {
  const base = required([
    { name: 'nombre', message: 'El nombre es obligatorio' },
    { name: 'categoria', message: 'La categoría es obligatoria' }
  ], data);

  if (!data.nivel) {
    base.nivel = 'El nivel es obligatorio';
  }

  return base;
};

export const esHabilidadCompleta = (data) => {
  return (
    data.nombre &&
    data.categoria &&
    data.nivel &&
    !Object.keys(validarHabilidad(data)).length
  );
};
