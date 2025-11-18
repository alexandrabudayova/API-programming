import express from 'express';
import { getUsers } from './db.js';

const router = express.Router();
router.use(express.json());

router.get('/', (req, res) => {
  const data = getUsers();
  res.status(200).json(data);
});


router.post('/', (req, res) => {
  if (req.headers['content-type'] !== 'application/json') {
    return res.status(415).send('Unsupported Media Type');
  }
  const data = getUsers();
  const newItem = req.body;
  const newId = data.length > 0 ? data[data.length - 1].id + 1 : 1;
  newItem.id = newId;

  data.push(newItem);

  res.status(201).json(newItem);
});



router.delete('/:id', (req, res) => {
  const data = getUsers();
  const id = Number(req.params.id);
  const index = data.findIndex(item => item.id === id);
  if (index === -1) {
    return res.status(404).send('Item not found');
  }
  data.splice(index, 1);
  res.status(200).send(`Item with ID ${id} deleted`);
});




router.put('/:id', (req, res) => {
  const data = getUsers();
  const id = Number(req.params.id);
  if (req.headers['content-type'] !== 'application/json') {
    return res.status(415).send('Unsupported Media Type');
  }
  const { forename, surname } = req.body;
  const index = data.findIndex(item => item.id === id);

  if (index !== -1) {
    data[index].forename = forename;
    data[index].surname = surname;
    return res.status(200).json(data[index]); 
  } else {
    const newItem = { id, forename, surname };
    data.push(newItem);
    return res.status(201).json(newItem); 
  }
});

router.post('/search', (req, res) => { 
  const data = getUsers();

  if (!req.is('application/json')) {
    return res.status(415).send('Unsupported Media Type');
  }

  const {forename} = req.body;

  const results = data.filter(user => 
    user.forename?.trim().toLowerCase() === forename.trim().toLowerCase()
  );

  if (results.length === 0) {
    return res.status(404).json({ error: 'User not found' });
  }

  const output = results.map(user => ({
    forename: user.forename,
    surname: user.surname
  }));

  return res.status(200).json(output);
});




export default router;
