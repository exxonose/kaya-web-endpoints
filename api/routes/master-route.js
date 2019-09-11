import { Router } from 'express';
import validator from '../middlewares/validator';
import  userController from '../controllers/userController';
import counterController from '../controllers/counterController';
import siteController from '../controllers/siteAppController';
import quoteController from '../controllers/quoteController';
import contactController from '../controllers/contactController';


const routes = Router();

routes.get('/', function(req, res){
     res.send({status:200, msg:'Welcome to Kaya Web App'});    
});



//Users
routes.post('/users',
validator.validateUser,
 userController.createUser);

 //routes.post('users/', userController.signin);
 routes.get('/users', userController.getUsers);
routes.get('/users/:id', userController.getUserById);

 routes.put('/users/:id',
  validator.validateUser, 
 userController.updateUser);

routes.delete('/users/:id', userController.deleteUser);

//Site Applications
routes.post('/siteApp',siteController.createSiteApp);
routes.get('/siteApp', siteController.getSiteApp);
routes.get('/siteApp/:id', siteController.getSiteAppById);
routes.put('/siteApp/:id', siteController.updateSiteApp);
routes.delete('/siteApp/:id', siteController.deleteSiteApp);

//Counters
routes.post('/counter',
validator.validateCounter,
counterController.createCounter);

routes.get('/counter', 
counterController.getCounter);

routes.get('/counter/:id', 
counterController.getCounterById);

routes.put('/counter/:id', 
validator.validateCounter,
counterController.updateCounter);

routes.delete('/counter/:id', 
counterController.deleteCounter);


//Quote
routes.post('/quote',
validator.validateQuote,
 quoteController.createQuote);

routes.get('/quote', quoteController.getQuote);

routes.get('/quote/:id', quoteController.getQuoteById);

routes.put('/quote/:id',
validator.validateQuote, 
quoteController.updateQuote);

routes.delete('/quote/:id', quoteController.deleteQuote);

//Contact
routes.post('/contact',
validator.validateContact, 
contactController.createContact);

routes.get('/contact', contactController.getContact);
routes.get('/contact/:id', contactController.getContactById);

routes.put('/contact/:id',
validator.validateContact, 
contactController.updateContact);

routes.delete('/contact/:id', contactController.deleteContact);





export default routes;