const express = require('express');
const router = express.Router();

const TaskController = require('../controllers/taskController');

router.get('/', TaskController.Index );
router.get('/add', TaskController.AddGet );
router.post('/add', TaskController.AddPost );
router.get('/turn/:id', TaskController.Turn );
router.get('/storage/:id', TaskController.Storage );
router.get('/delete/:id', TaskController.DeleteGet );
router.get('/edit/:id', TaskController.EditGet );
router.post('/edit/:id', TaskController.EditPost );


module.exports = router;