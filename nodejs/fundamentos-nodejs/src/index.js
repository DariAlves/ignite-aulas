const express = require('express');

const app = express();
const port = 3333;

app.get('/', (request, response) => {
    return response.json({ message: "Hello world!" });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})