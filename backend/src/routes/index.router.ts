import { Router } from "express";
import employeeRoute from './employee/employee.router';

const indexRouter = Router()

 indexRouter.use("/employee",employeeRoute)
 
export default indexRouter