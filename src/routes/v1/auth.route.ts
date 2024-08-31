
import { Hono } from 'hono';
import { validate } from '../../middleware/zod.middleware';
import { loginSchema, registerSchema } from '../../validator/v1/auth.validator';
import { login, register } from '../../controllers/v1/auth/auth.controller';

const app = new Hono();

app.post('/login', validate(loginSchema), login);
app.post('/register', validate(registerSchema), register);

export default app;
