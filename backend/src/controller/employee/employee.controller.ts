import { Request,Response,NextFunction } from "express";
 import * as employeeService  from "../../services/employee.service"

 export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await employeeService.createEmployee(req.body);
    res.status(201).json({ message: 'Employee created successfully', result });
  } catch (err) {
    next(err);
  }
};

export const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const name = req.query.name as string;
    const data = await employeeService.getAllEmployees(name);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const findOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await employeeService.getEmployeeById(Number(req.params.id));
    res.json(data);
  } catch (err) {
    next(err);
  }
};


export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("req.body--",req.body)
    const result = await employeeService.updateEmployee(Number(req.params.id), req.body);
    res.json({ message: 'Employee updated successfully', result });
  } catch (err) {
    next(err);
  }
};


export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await employeeService.deleteEmployee(Number(req.params.id));
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    next(err);
  }
};


export const removeAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    await employeeService.deleteAllEmployees();
    res.json({ message: 'All employees deleted successfully' });
  } catch (err) {
    next(err);
  }
};