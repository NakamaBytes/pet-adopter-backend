
import { Hono } from 'hono';
import { create, find, get, remove, update } from '@controllers/v1/shelter/shelter.controller';
import { authentication, authenticationUser } from '@middleware/auth.middleware';
import { validate } from '@middleware/zod.middleware';
import { shelterCreateValidator } from '@validator/v1/shelter.validator';

const app = new Hono();

app.use(authentication);
app.get('/', authenticationUser, get);
app.get('/:shelterId', find);
app.post('/', validate(shelterCreateValidator), create);
app.patch('/:shelterId', validate(shelterCreateValidator), update);
app.delete('/:shelterId', remove);

export default app;
