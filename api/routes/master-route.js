import { Router } from 'express';
import validator from '../middlewares/validator';
import token from '../middlewares/checker';
import  userController from '../controllers/userController';
import counterController from '../controllers/counterController';
import siteController from '../controllers/siteAppController';
import quoteController from '../controllers/quoteController';
import contactController from '../controllers/contactController';
import serviceController from '../controllers/serviceController';
import templateController from '../controllers/templateController';


const routes = Router();

routes.get('/', function(req, res){
     res.send({status:200, msg:'Welcome to Kaya Web App'});    
});

// //Add Users
// routes.post('/users',
// validator.validateUser,
//  userController.createUser);

 // Register Users
routes.post('/register',
validator.validateUser,
 userController.createUser);


// Login
 routes.post('/login', 
 //validator.validateUserSignIn,
 userController.login);


 routes.get('/users', userController.getUsers);
routes.get('/users/:id', userController.getUserById);

 routes.put('/users/:id',
 token.checker,
  validator.validateUser, 
 userController.updateUser);

routes.delete('/users/:id', 
token.checker,
userController.deleteUser);

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
//validator.validateQuote,
 quoteController.createQuote);

routes.get('/quote', quoteController.getQuote);

routes.get('/quote/:id', quoteController.getQuoteById);

routes.put('/quote/:id',
validator.validateQuote, 
quoteController.updateQuote);

routes.delete('/quote/:id', quoteController.deleteQuote);

//Contact
routes.post('/contact',
//validator.validateContact, 
contactController.createContact);

routes.get('/contact', contactController.getContact);
routes.get('/contact/:id', contactController.getContactById);

routes.put('/contact/:id',
validator.validateContact, 
contactController.updateContact);

routes.delete('/contact/:id', contactController.deleteContact);

//Service

routes.post('/service',
serviceController.createService);

routes.get('/service',
 serviceController.getService);

routes.get('/service/:id', 
serviceController.getServiceById);

routes.put('/service/:id',
serviceController.updateService);

routes.delete('/service/:id',
 serviceController.deleteService);

//Template

routes.post('/template',
templateController.createTemplate);

routes.get('/template', templateController.getTemplate);
routes.get('/template/:id', templateController.getTemplateById);

routes.put('/template/:id',
templateController.updateTemplate);

routes.delete('/template/:id', templateController.deleteTemplate);

export default routes;