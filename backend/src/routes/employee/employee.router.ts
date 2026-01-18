import { Router } from "express";

import * as employeeController  from "../../controller/employee/employee.controller"
import { validateEmployee } from '../../middeware/employee.validators';


const  employeeRouter = Router();
  
   employeeRouter.post('/',validateEmployee,employeeController.create);
   employeeRouter.get('/',employeeController.findAll);
   employeeRouter.get('/:id',employeeController.findOne)
   employeeRouter.put('/:id',validateEmployee,employeeController.update)
   employeeRouter.delete('/:id',employeeController.remove);
   employeeRouter.delete('/',employeeController.removeAll);

export default employeeRouter;




