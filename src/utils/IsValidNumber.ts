import { z } from 'zod';
export const isValidNumber = z.union([
  z.number().min(0),
  z.string().refine(value => {
    console.log(value);

    const parsed = Number(value);
    return !isNaN(parsed) && parsed >= 0;
  }, {
    message: 'must be a positive number or zero',
  })
]);