export const validarProyecto = (data) => {
  const errors = {};

  if (!data.nombre || data.nombre.trim() === '') {
    errors.nombre = 'El nombre es obligatorio';
  }

  if (!data.descripcion || data.descripcion.trim() === '') {
    errors.descripcion = 'La descripción es obligatoria';
  }

  return errors;
};

export const esProyectoCompleto = (data) => {
  return (
    data.nombre &&
    data.descripcion &&
    !Object.keys(validarProyecto(data)).length
  );
};
