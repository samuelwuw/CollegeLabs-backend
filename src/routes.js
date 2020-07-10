const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

//validação
const { celebrate, Segments, Joi } = require('celebrate');

const ResearcherController = require('./controllers/ResearcherController');
const CitizenController = require('./controllers/CitizenController');
const PostController = require('./controllers/PostController');
const PublicationController = require('./controllers/PublicationController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.required(),
        password: Joi.required(),
    })
}) ,SessionController.create);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.index);

routes.get('/researchers', ResearcherController.index);

routes.post('/researchers', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string().required().email(),
        birthdate: Joi.string().required(),
        workdate: Joi.string().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
        institution: Joi.string().required(),
        graduationlvl: Joi.string().required(),
        graduationinstitution: Joi.string().required(),
        latteslink: Joi.string().required()
    })
}), ResearcherController.create);

routes.put('/researchers/:id', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string().required().email(),
        birthdate: Joi.string().required(),
        workdate: Joi.string().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
        institution: Joi.string().required(),
        graduationlvl: Joi.string().required(),
        graduationinstitution: Joi.string().required(),
        latteslink: Joi.string().required()
    })
}), ResearcherController.update);

routes.patch('/researchers/:id', celebrate({
    [Segments.BODY]: Joi.object().keys({
        theme1: Joi.string().required(),
        theme2: Joi.string().required(),
        theme3: Joi.string().required(),
    })
}), ResearcherController.updateThemes);

routes.get('/posts', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}) ,PostController.index);


routes.post('/posts',celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
    }),
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}) ,PostController.create);


routes.put('/posts/:id', celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
    }),
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),    
}), PostController.update);

routes.patch('/posts/:id', PostController.updateLikes);


routes.delete('/posts/:id',celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), PostController.delete);


routes.get('/citizens', CitizenController.index);

routes.post('/citizens', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string().required().email()
    })
}), CitizenController.create);

routes.put('/citizens/:id', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string().required().email()
    })
}), CitizenController.update);

routes.get('/publications', PublicationController.index)

routes.post('/publications', multer(multerConfig).single("file"), celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), PublicationController.create);

module.exports = routes;

