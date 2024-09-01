import { Hono } from 'hono';

// owners
import auth from './auth.route';

// pet
import pet from './pet.route';

// storage
import storage from './file.route';

const app = new Hono();

// owners
app.route('/auth', auth);
app.route('/pets', pet);
app.route('/storage', storage);

export default app;
