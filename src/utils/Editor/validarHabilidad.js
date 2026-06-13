export const validarHabilidad = (data) => {
  const errors = {};

  if (!data.nombre || data.nombre.trim() === '') {
    errors.nombre = 'El nombre es obligatorio';
  }

  if (!data.categoria || data.categoria === '') {
    errors.categoria = 'La categoría es obligatoria';
  }

  if (!data.nivel) {
    errors.nivel = 'El nivel es obligatorio';
  }

  return errors;
};

export const esHabilidadCompleta = (data) => {
  return (
    data.nombre &&
    data.categoria &&
    data.nivel &&
    !Object.keys(validarHabilidad(data)).length
  );
};
