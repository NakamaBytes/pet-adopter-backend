
import { Hono } from 'hono';
import { create, find, get, remove, update } from '@controllers/v1/pet/pet.controller';
import { authentication, authenticationUser } from '@middleware/auth.middleware';
import { petCreateValidator } from '@validator/v1/pet.validator';
import { validate } from '@middleware/zod.middleware';

const app = new Hono();

app.use(authentication);
app.get('/', authenticationUser, get);
app.get('/:petId', find);
app.post('/', validate(petCreateValidator), create);
app.patch('/:petId', validate(petCreateValidator), update);
app.delete('/:petId', remove);

export default app;
