const express = require('express');

const { db, RootModel, WorkModel} = require('./sequelize');

const app = express();

// ----- MIDDLEWARE

/**
 * Parses incoming requests with JSON payloads; Injects into `req.body` based on `body-parser`
 * */
app.use(express.json());

db.sequelize.sync({ force: false }).then(() => {
    console.log("Database synced");
});

// ----- Root route

/**
 * Returns metadata pertaining to the API based on the METADATA model, such as health and analytics.
 * */
app.get('/', (req, res) => {
    res.send('Returns metadata pertaining to API, such as health.');
})

/**
 * Tells the api to update the root route metadata.
 * */
app.patch('/', (req, res) => {
    res.send(`Updates API's metadata.`);
})

// ----- Works list route

/**
 * Returns a list of works based on the LIST model from the database in JSON.
 * */
app.get('/works?-list', (req, res) => {
    getWorksList().then((works) => {
        res.send(works);
    })
})

/**
 * Returns a list of works filtered by the TYPE attribute based on the LIST model from the database in JSON.
 * */
app.get('/works?-list/:type', (req, res) => {
    getWorksList(req.params.type).then((works) => {
        res.send(works);
    })
})

// ----- Works item routes

/**
 * Returns a work item based on the ITEM model
 * */
app.get('/works?/:id', (req, res) => {
    getWork(req.params.id).then((work) => {
        res.send(work);
    })
})

/**
 * Add new work item; retrieves JSON
 * */
app.post('/works?/', (req, res) => {
    addWork(req.body).then((id) => {
        res.send(`Add new work item based on the ID parameter. ID passed ${ id }`);
    });

    console.log( req.body );
})

/**
 * Update work item; retrieves JSON
 * */
app.patch('/works?/:id', (req, res) => {
    res.send(`Add new work item based on the ID parameter. ID passed: ${ req.params.id }`);

    console.log(req.body);
})

/**
 * Sets work item to hidden; Paranoid removes from table if parameter set
 * */
app.delete('/works?/:id', (req, res) => {
    removeWork(req.params.id).then(() => {
        res.send(`Add new work item based on the ID parameter. ID passed: ${ req.params.id }`);
    })

    console.log(req.body);
})

/**
 * Listen for connections
 * */
app.listen(3000, () => {
    console.log(`Application listening at http://localhost:3000/`);
})

async function getWork(id) {
    return await WorkModel.findOne({
        where: {
            id: id
        }
    });
}

async function getWorksList(type) {
    if(type)
        return await WorkModel.findAll({
            where: {
                type: type
            }
        });
    else
        return await WorkModel.findAll();
}

async function addWork(params) {
    const newWork = await WorkModel.create({...params});

    return newWork.id;
}

async function updateWorkItem(params) {
    const newWork = await WorkModel.create({...params});

    return newWork.id;
}

async function removeWork(id) {
    await WorkModel.destroy({
        where: {
            id: id
        },
        force: true
    });
}
