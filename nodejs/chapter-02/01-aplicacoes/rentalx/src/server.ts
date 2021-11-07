import express from 'express';

const app = express();

app.use(express.json());

const port = process.env.PORT || 3333;

app.get('', (request, response) => {
  return response.json({ message: 'Hello, World!' });
});

app.post('/courses', (request, response) => {
  const { name } = request.body;
  return response.json({ name });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});
