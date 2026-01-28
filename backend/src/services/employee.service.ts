// import { RowDataPacket } from "mysql2";
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import { db } from "../config/db";
import { Employee ,User,UserRole} from "../models/employee.model";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {ENV} from "../config/env"


export const createEmployee = async (employee: Employee) => {
  const [result] = await db.execute(
    'INSERT INTO employees (name, email, department, salary,dob) VALUES (?, ?, ?, ?,?)',
    [employee.name, employee.email, employee.department, employee.salary,employee.dob]
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

export const loginUser = async (
  email: string,
  password: string
): Promise<{ token: string; user: Omit<User, 'password'> }> => {

  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  const [rows] = await db.execute( 'SELECT * FROM users WHERE email = ? AND is_active = 1',[email]);

  if (rows.length === 0) {
    throw new Error('Invalid credentials');
  }

  const user = rows[0] as User & { password: string };

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ id: user.id, role: user.role }, ENV.JWT_SECRET as string, { expiresIn: '1h' });

  return {
    token,
    user:<User> {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      department: user.department,
      role: user.role,
      phoneNumber: user.phoneNumber,
      joiningDate: user.joiningDate
    }
  };
};

export const registerUser = async (
  userData: User
): Promise<Omit<User, 'password'>> => {

  const {
    firstName,
    lastName,
    email,
    password,
    department,
    role = UserRole.EMPLOYEE,
    phoneNumber,
    joiningDate
  } = userData;

  if (!firstName || !lastName || !email || !password) {
    throw new Error('Required fields missing');
  }

  const [existing] = await db.execute('SELECT id FROM users WHERE email = ?', [email]);

  if (existing.length > 0) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const [result] = await db.execute(`INSERT INTO users (first_name, last_name, email, password, department, role, phone_number, joining_date)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      firstName,
      lastName,
      email,
      hashedPassword,
      department,
      role,
      phoneNumber,
      joiningDate
    ]
  );

  return<User> {
    id: result.insertId,
    firstName,
    lastName,
    email,
    department,
    role,
    phoneNumber,
    joiningDate
  };
};