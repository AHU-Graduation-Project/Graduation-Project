import express from 'express';
import authRoute from './src/routes/authRoute.mjs';
import coursesRoute from './src/routes/coursesRoute.mjs';
import { config } from './src/config/config.mjs';

const app = express();
const port = 4000;

app.use(express.json());


app.use('/auth', authRoute);
app.use('/courses', coursesRoute);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
