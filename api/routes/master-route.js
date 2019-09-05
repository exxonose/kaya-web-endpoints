import { Router } from 'express';
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
routes.post('/users', userController.createUser);
 //routes.post('users/', userController.signin);
 routes.get('/users', userController.getUsers);
routes.get('/users/:id', userController.getUserById);
 routes.put('/users/:id', userController.updateUser);
routes.delete('/users/:id', userController.deleteUser);

//Site Applications
routes.post('/siteApp',siteController.createSiteApp);
routes.get('/siteApp', siteController.getSiteApp);
routes.get('/siteApp/:userId', siteController.getSiteAppById);
routes.put('/siteApp/:userId', siteController.updateSiteApp);
routes.delete('/siteApp/:userId', siteController.deleteSiteApp);

//Counters
routes.post('/counter', counterController.createCounter);
routes.get('/counter', counterController.getCounter);
routes.get('/counter/:userId', counterController.getCounterById);
routes.put('/counter/:userId', counterController.updateCounter);
routes.delete('/counter/:userId', counterController.deleteCounter);


//Quote
routes.post('/quote', quoteController.createQuote);
routes.get('/quote', quoteController.getQuote);
routes.get('/quote/:userId', quoteController.getQuoteById);
routes.put('/quote/:userId', quoteController.updateQuote);
routes.delete('/quote/:userId', quoteController.deleteQuote);

//Contact
routes.post('/contact', contactController.createContact);
routes.get('/contact', contactController.getContact);
routes.get('/contact/:userId', contactController.getContactById);
routes.put('/contact/:userId', contactController.updateContact);
routes.delete('/contact/:userId', contactController.deleteContact);






export default routes;