const express = require('express');
const artRouter = express.Router();

const ArtController = require('../controllers/art_ctrl.js');

artRouter.get('/:id', ArtController.show);
artRouter.get('/', ArtController.index);
artRouter.get('/city/:city', ArtController.index);
artRouter.post('/:id', ArtController.create);
artRouter.put('/:id', ArtController.update_art_info);
artRouter.get('/created/:id', ArtController.index_user);
artRouter.get('/found', ArtController.index_found);
artRouter.get('/delete/:id', ArtController.delete_art);
artRouter.post('/mark-complete/:id', ArtController.mark_art_found);

module.exports = artRouter;