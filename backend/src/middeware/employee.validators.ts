import { Request, Response, NextFunction } from 'express';

const NAME_REGEX = /^[a-zA-Z]+([ '.-][a-zA-Z]+)*$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ALLOWED_DEPARTMENTS = [
  'Engineering',
  'HR',
  'Finance',
  'Marketing',
  'Sales',
  'Operations'
];

export const validateEmployee = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, department, salary } = req.body;

  // Name
  if (!name || typeof name !== 'string' || name.length < 3 || !NAME_REGEX.test(name)) {
    return res.status(400).json({
      message: 'Invalid name. Only letters and spaces allowed (min 3 chars).'
    });
  }

  // Email
  if (!email || !EMAIL_REGEX.test(email)) {
    return res.status(400).json({
      message: 'Invalid email address.'
    });
  }

  // Department
  if (!department || !ALLOWED_DEPARTMENTS.includes(department)) {
    return res.status(400).json({
      message: 'Invalid department.'
    });
  }

  // Salary
  if (!salary || isNaN(salary) || Number(salary) <= 0) {
    return res.status(400).json({
      message: 'Salary must be a number greater than 0.'
    });
  }

  next(); 
};
