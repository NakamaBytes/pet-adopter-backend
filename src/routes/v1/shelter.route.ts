
import { Hono } from 'hono';
import { create, find, get, remove, update } from '@controllers/v1/shelter/shelter.controller';
import { create as petShelterCreate, remove as petShelterRemove, update as petShelterUpdate } from '@controllers/v1/petShelter/pet.shelter.controller';
import { authentication, authenticationUser } from '@middleware/auth.middleware';
import { validate } from '@middleware/zod.middleware';
import { shelterCreateValidator } from '@validator/v1/shelter.validator';
import { petShelterCreateValidator } from '@validator/v1/pet.shelter.validator';

const app = new Hono();

app.use(authentication);
app.get('/', authenticationUser, get);
app.get('/:shelterId', find);
app.post('/', validate(shelterCreateValidator), create);
app.patch('/:shelterId', validate(shelterCreateValidator), update);
app.delete('/:shelterId', remove);

// pet
app.post('/:shelterId/pet/:petId', validate(petShelterCreateValidator), petShelterCreate);
app.patch('/:shelterId/pet/:petId', validate(petShelterCreateValidator), petShelterUpdate);
app.delete('/:shelterId/pet/:petId', petShelterRemove);


export default app;
