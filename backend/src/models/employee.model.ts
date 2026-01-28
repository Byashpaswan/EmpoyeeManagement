export interface Employee {
  id?: number;
  name: string;
  email: string;
  department: string;
  salary: number;
  created_at?: Date;
  dob:Date
}

export enum UserRole{
 EMPLOYEE ="EMPLOYEE",
 MANAGER = "MANAGER",
 ADMIN = 'ADMIN'
}

export interface User {
  id?: number;

  firstName: string;
  lastName: string;

  email: string;
  password?: string;          // optional (never returned)

  department: string;

  role: UserRole;

  joiningDate?: string;       // ISO string from API

  phoneNumber?: string;       // string, not number

  isActive?: boolean;

  createdAt?: string;
  updatedAt?: string;
}