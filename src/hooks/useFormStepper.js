import { useState } from 'react';

export const useFormStepper = (totalSteps) => {
  const [actual, actualizar] = useState(1);

  const siguiente = () => {
    if (actual < totalSteps) {
      actualizar(actual + 1);
    }
  };

  const anterior = () => {
    if (actual > 1) {
      actualizar(actual - 1);
    }
  };

  return { actual, siguiente, anterior };
};
