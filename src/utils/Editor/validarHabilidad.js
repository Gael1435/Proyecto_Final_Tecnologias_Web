// Valida nombre, categoría y nivel para una habilidad (Editor)
// Utiliza reglas globales para comprobar que el `nivel` esté entre
// los valores permitidos y reuse el helper `required`.
import { required } from './validationHelpers';
import { within, nivelesPermitidos } from './validationRules';

export const validarHabilidad = (data) => {
  const base = required([
    { name: 'nombre', message: 'El nombre es obligatorio' },
    { name: 'categoria', message: 'La categoría es obligatoria' }
  ], data);

  if (!data.nivel) {
    base.nivel = 'El nivel es obligatorio';
  } else if (!within(data.nivel, nivelesPermitidos)) {
    base.nivel = 'Nivel inválido';
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
