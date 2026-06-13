export const validarExperiencia = (data) => {
  const errors = {};

  if (!data.empresa || data.empresa.trim() === '') {
    errors.empresa = 'La empresa es obligatoria';
  }

  if (!data.puesto || data.puesto.trim() === '') {
    errors.puesto = 'El puesto es obligatorio';
  }

  return errors;
};

export const esExperienciaCompleta = (data) => {
  return (
    data.empresa &&
    data.puesto &&
    !Object.keys(validarExperiencia(data)).length
  );
};
