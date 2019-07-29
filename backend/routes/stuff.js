const express = require('express');
const router = express.Router();
//const auth = require('../middlewares/auth');

const stuffCtrl = require('../controllers/stuff');

router.get('/', stuffCtrl.getAllThing);
router.post('/', stuffCtrl.createNewThing);
router.get('/:id', stuffCtrl.getOneThing);
router.put('/:id',  stuffCtrl.updateThing);
router.delete('/:id',  stuffCtrl.deleteThing);

module.exports = router;