import * as express from 'express';

const router = express.Router();

router.post('/api/users/signout', (req, res) => {
  res.send('hello!');
});

export { router as signoutRouter };

