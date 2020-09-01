const express = require('express');
const cors = require('cors');
const { db, RootModel, WorkModel, Op} = require('./sequelize');
const app = express();

let sessionHits = 0;

app.use(express.json());

app.use(cors());

db.sequelize.sync({ force: false }).then(() => {
    console.log("Database synced");
});

app.get('/works?-list', (req, res) => {
    getWorksList().then((works) => {
        res.send(works);
    })

    console.log(++sessionHits)
})

app.get('/works?-list/:type', (req, res) => {
    getWorksList(req.params.type.split(',')).then((works) => {
        res.send(works);
    })

    console.log(++sessionHits)
})

app.get('/works?-list_by-ids/:id', (req, res) => {
    getWorksListByIDs(req.params.id.split(',')).then((works) => {
        res.send(works);
    })

    console.log(++sessionHits)
})

app.get('/works?/:id', ( req, res ) => {
    getWork(req.params.id).then((work) => {
        res.send(work);
    })

    console.log(++sessionHits)
})

app.post('/works?/', ( req, res ) => {
    addWork(req.body).then((id) => {
        res.send(`Add new work item based on the ID parameter. ID passed ${ id }`);
    });

    console.log( req.body );

    console.log(++sessionHits)
})

app.patch('/works?/:id', ( req, res ) => {
    res.send(`Add new work item based on the ID parameter. ID passed: ${ req.params.id }`);

    console.log(req.body);

    console.log(++sessionHits)
})

app.delete('/works?/:id', ( req, res ) => {
    removeWork(req.params.id).then(() => {
        res.send(`Add new work item based on the ID parameter. ID passed: ${ req.params.id }`);
    })

    console.log(req.body);

    console.log(++sessionHits)
})

app.get('/', ( req, res ) => {
    res.send('Returns metadata pertaining to API, such as health.');

    console.log(++sessionHits)
})

app.patch('/', ( req, res ) => {
    res.send(`Updates API's metadata.`);

    console.log(++sessionHits)
})

const getWork = async ( id ) => {
    return await WorkModel.findOne({
        where: {
            id: id
        }
    });
}

async function getWorksList( type ) {
    // Tree-shake attributes
    const _attributes = [
        'id',
        'hidden',
        'name',
        'category',
        'tags',
        'github',
        'behance',
        'website',
        'thumbnail'
    ];

    // Return filtered list by type
    if(type)
        return await WorkModel.findAll({
            attributes: _attributes,
            where: { category: type }
        });

    // Return full list
    else
        return await WorkModel.findAll({
            attributes: _attributes
        });
}

async function getWorksListByIDs( ids ) {
    // Tree-shake attributes
    const _attributes = [
        'id',
        'hidden',
        'name',
        'category',
        'tags',
        'github',
        'behance',
        'website',
        'thumbnail'
    ];

    // Return filtered list by ids
    if(ids)
        return await WorkModel.findAll({
            attributes: _attributes,
            where: { id: ids }
        });

    // Return full list
    else
        return await WorkModel.findAll({attributes: _attributes});
}

async function addWork( params ) {
    //const newWork = await WorkModel.create({...params});

    return newWork.id;
}

async function updateWorkItem( params ) {
    const newWork = await WorkModel.create({...params});

    return newWork.id;
}

async function removeWork( id ) {
    // await WorkModel.destroy({
    //     where: {
    //         id: id
    //     },
    //     force: true
    // });
}

const transposeURIs = ( uriCodes ) => {

}

app.listen(3000, () => {
    console.log(`Application listening at http://localhost:3000/`);
})
