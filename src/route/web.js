import express from "express"; 
import homeController from "../controller/homeController";

let router = express.Router(); 

let initWebRoutes = (app) => {
    router.get('/', (req, res) => {
      return res.send('Phan Hùng Anh');
    });

    router.get('/home', homeController.getHomePage); 
    router.get('/crud', homeController.getCRUD); 
    router.post('/post-crud', homeController.postCRUD); 
    router.get('/get-crud', homeController.getFindAllCrud) 
    router.get('/edit-crud', homeController.getEditCRUD); 
    router.post('/put-crud', homeController.putCRUD); 
    router.get('/delete-crud', homeController.deleteCRUD); 

  return app.use("/", router); //url mặc định
}

module.exports = initWebRoutes;