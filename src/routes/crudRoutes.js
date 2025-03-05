import { addNewCore, getCoreLists, getCoretWithID, updateCore, deleteCore } from '../controllers/crudController';


const routes = (app) => {
    app.route('/core')
        //get all contacts
        .get((req, res, next) => {
            //middleware
            console.log(`Request from ${req.originalUrl}`)
            console.log(`Request type: ${req.method}`)
            next();
        }, getCoreLists)

        //post new contact
        .post(addNewCore);


    app.route('/core/:coreID')

        //get specific contact
        .get(getCoretWithID)

        //update a contact
        .put(updateCore)

        //delete a contact
        .delete(deleteCore)
}

export default routes;
