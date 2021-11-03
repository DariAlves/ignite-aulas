import express from 'express';
import { createCourse } from './routes';

const app = express();

const port = process.env.PORT || 3333;

app.get('/', createCourse);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});