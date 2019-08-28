import { Router } from 'express';
import  userController from '../controllers/userController';


const routes = Router();

routes.get('/', function(req, res){
     res.send({status:200, msg:'Welcome to Kaya Web App'});    
});



//Users
routes.post('/users/', userController.createUser);
 //routes.post('users/', userController.signin);
 routes.get('users/', userController.getUsers);
routes.get('users/:id', userController.getUserById);
 routes.put('users/:id', userController.updateUser);
routes.delete('users/:id', userController.deleteUser);


export default routes;