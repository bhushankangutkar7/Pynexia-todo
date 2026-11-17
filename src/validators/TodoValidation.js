import * as yup from 'yup';

export const addTodoSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required()
    .min(3, `Name must be at least 3 characters`)
    .max(200, `Name must be at least 3 characters`),  
  description: yup
    .string()
    .trim()
    .required()
    .max(500, 'Description cannot exceed 500 characters'),
  status: yup
    .string()
    .oneOf(
      ["Pending", "In-process", "Completed"],
      'Invalid Todo status'
    )
});

export const updateTodoSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(3, `Name must be at least 3 characters`)
    .max(200, `Name must be at least 3 characters`),  
  description: yup
    .string()
    .trim()
    .max(500, 'Description cannot exceed 500 characters'),
  status: yup
    .string()
    .oneOf(
      ["Pending", "In-process", "Completed"],
      'Invalid Todo status'
    )
}).test(
  'at-least-one-field',
  'At least one field is required to update',
  (value) => Object.keys(value || {}).length > 0
);