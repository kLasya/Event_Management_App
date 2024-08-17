const express = require('express');
const app = express();
const router = express.Router();
const Event = require('../models/event');

// Define routes on the router object...
router.get('/', async (req, res) => {
  // ...
});

router.post('/', async (req, res) => {
  // ...
});

router.delete('/:id', async (req, res) => {
  // ...
});

router.put('/:id', async (req, res) => {
  // ...
});

app.use('/', router); 
app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
  
  module.exports = router;
  
  