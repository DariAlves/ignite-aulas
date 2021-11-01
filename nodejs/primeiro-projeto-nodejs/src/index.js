const express = require('express');
const { v4: uuidV4 } = require('uuid');

const app = express();
app.use(express.json());

const port = process.env.PORT || 3333;

// Array de clientes
const customers = []



// Deve ser possível criar uma conta
/*
    * cpf - string
    * name - string
    * id - uuid
    * statement - []
*/
app.post('/account', (request, response) => {
    const { cpf, name } = request.body;
    const id = uuidV4();

    const newCustomer = {
        cpf,
        name,
        id,
        statement: []
    }

    customers.push(newCustomer);

    console.log(customers);
    return response.status(201).send();
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
