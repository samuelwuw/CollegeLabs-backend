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
const FollowController = require('./controllers/FollowController');

const routes = express.Router();

routes.post('/sessions', celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.required(),
        password: Joi.required(),
    })
}) ,SessionController.create);

//----------------------------------------------------------------profile routes
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.index);

routes.get('/profileResearchers', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.getResearcher);

routes.get('/profilePublications', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.getPublication);

//------------------------------------------------------------researchers routes
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

//------------------------------------------------------------------posts routes
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

routes.patch('/postsUnlikes/:id', PostController.updateUnlikes);

routes.delete('/posts/:id',celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), PostController.delete);

//---------------------------------------------------------------citizens routes
routes.get('/citizens', CitizenController.index);

routes.post('/citizens', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        password: Joi.string().required(),
        identity: Joi.string().required(),
        birthdate: Joi.string().required(),
        graduation: Joi.string().required(), 
        email: Joi.string().required().email()

    })
}), CitizenController.create);

routes.put('/citizens/:id', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        password: Joi.string().required(),
        identity: Joi.string().required(),
        birthdate: Joi.string().required(),
        graduation: Joi.string().required(), 
        email: Joi.string().required().email()
    })
}), CitizenController.update);

//-----------------------------------------------------------publications routes
routes.get('/publications', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), PublicationController.index)

routes.post('/publications', celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        local: Joi.string().required(),
        year: Joi.number().required(),
        abstract: Joi.string().required(),
        tags: Joi.string(),
        url: Joi.string(),
    }),
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(), 
}), PublicationController.create);


routes.put('/publications/:id', celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        local: Joi.string().required(),
        year: Joi.number().required(),
        abstract: Joi.string().required(),
        tags: Joi.string(),
        url: Joi.string(),
        upload: Joi.boolean(),
    }),
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),    
}),  PublicationController.update);

routes.patch('/publications/:id', PublicationController.updateLikes);

routes.patch('/publicationsUnlikes/:id', PublicationController.updateUnlikes);

routes.patch('/publicationsFileName/:id',celebrate({
    [Segments.BODY]: Joi.object().keys({
        filename: Joi.string().required(),
    })
}), PublicationController.updateFileName);

routes.delete('/publications/:id',celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), PublicationController.delete);

routes.post('/publicationsFile', multer(multerConfig).single("file"), PublicationController.upload);


//----------------------------------------------------------------follows routes
routes.get('/follows', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required(), 
    })
}),FollowController.index);

routes.post('/follows', celebrate({
    [Segments.BODY]: Joi.object().keys({
        follows: Joi.string().required(), 
        follows_type: Joi.string().required(),
        followed: Joi.string().required(), 
        followed_type: Joi.string().required(),
    })
}), FollowController.create);

routes.delete('/follows/:id',celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(), 
    })
}), FollowController.delete);

module.exports = routes;

