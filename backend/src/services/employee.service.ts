import { db } from "../config/db";
import { Employee } from "../models/employee.model";


export const createEmployee = async (employee: Employee) => {
  const [result] = await db.execute(
    'INSERT INTO employees (name, email, department, salary) VALUES (?, ?, ?, ?)',
    [employee.name, employee.email, employee.department, employee.salary]
  );
  return result;
};


export const getAllEmployees = async (keyword?: string) => {
  let query = 'SELECT * FROM employees';
  let params: any[] = [];

  if (keyword) {
    query += ' WHERE name LIKE ?';
    params.push(`%${keyword}%`);
  }

  const [rows] = await db.execute(query, params);
  return rows;
};

export const getEmployeeById = async (id: number) => {
  const [rows] = await db.execute(
    'SELECT * FROM employees WHERE id = ?',
    [id]
  );
  return rows;
};

export const updateEmployee = async (id: number, employee: Employee) => {
  const [result] = await db.execute(
    'UPDATE employees SET name=?, email=?, department=?, salary=? WHERE id=?',
    [employee.name, employee.email, employee.department, employee.salary, id]
  );
  return result;
};

export const deleteEmployee = async (id: number) => {
  const [result] = await db.execute(
    'DELETE FROM employees WHERE id=?',
    [id]
  );
  return result;
};


export const deleteAllEmployees = async () => {
  const [result] = await db.execute('DELETE FROM employees');
  return result;
};