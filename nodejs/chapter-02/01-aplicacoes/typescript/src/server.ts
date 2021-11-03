import express from 'express';

const app = express();

const port = process.env.PORT || 3333;

app.get('/', (request, response) => {
    return response.json({ message: 'Hello, world!' });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});