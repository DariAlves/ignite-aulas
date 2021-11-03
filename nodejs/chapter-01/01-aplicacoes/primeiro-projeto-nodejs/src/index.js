const express = require('express');
const { v4: uuidV4 } = require('uuid');

const app = express();
app.use(express.json());

const port = process.env.PORT || 3333;

// Array de clientes
const customers = []

// Middleware
function verifyIfExistsAccountCPF(request, response, next) {
    const { cpf } = request.headers;

    const customer = customers.find(customer => customer.cpf === cpf);

    if (!customer) {
        return response.status(400).json({ error: "Customer not found!" });
    }

    request.customer = customer;

    return next();
}

function getBalance(statement) {
    const balance = statement.reduce((acc, operation) => {
        if (operation.type === 'credit') {
            return acc + operation.amount;
        } else {
            return acc - operation.amount;
        }
    }, 0);

    return balance
}

// Deve ser possível criar uma conta
app.post('/account', (request, response) => {
    const { cpf, name } = request.body;

    // Não deve ser possível cadastrar uma conta com CPF já existente
    const customerAlreadyExists = customers.some(customer => customer.cpf === cpf);

    if (customerAlreadyExists) {
        return response.status(400).json({ error: "Customer already exists!" });
    }

    // const newCustomer = {
    //     cpf,
    //     name,
    //     id: uuidV4(),
    //     statement: []
    // }

    customers.push({
        cpf,
        name,
        id: uuidV4(),
        statement: []
    });

    return response.status(201).send();
});

// Deve ser possível buscar o extrato bancário do cliente
app.get('/statement', verifyIfExistsAccountCPF, (request, response) => {
    // Não deve ser possível buscar extrato em uma conta não existente
    const { customer } = request;

    return response.json(customer.statement);
});

// Deve ser possível realizar um depósito
app.post('/deposit', verifyIfExistsAccountCPF, (request, response) => {
    const { description, amount } = request.body;

    // Não deve ser possível fazer depósito em uma conta não existente

    const { customer } = request;

    const statementOperation = {
        description,
        amount,
        created_at: new Date(),
        type: 'credit'
    }

    customer.statement.push(statementOperation)

    return response.status(201).send();
});

// Deve ser possível realizar um saque
app.post('/withdraw', verifyIfExistsAccountCPF, (request, response) => {
    const { amount } = request.body;
    const { customer } = request;

    const balance = getBalance(customer.statement);

    // Não deve ser possível fazer saque quando o saldo for insuficiente
    if (balance < amount) {
        return response.status(400).json({ error: "Insufficient funds!" });
    }

    const statementOperation = {
        amount,
        created_at: new Date(),
        type: 'debit'
    };

    customer.statement.push(statementOperation);

    return response.status(201).send();
});

// Deve ser possível buscar o extrato bancário do cliente por data
app.get('/statement/date', verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request;
    const { date } = request.query;

    const dateFormat = new Date(date + " 00:00");

    const statement = customer.statement.filter(statement => statement.created_at.toDateString() === new Date(dateFormat).toDateString());

    return response.json(statement);
});

// Deve ser possível atualizar dados da conta do cliente
app.put('/account', verifyIfExistsAccountCPF, (request, response) => {
    const { name }= request.body;
    const { customer } = request;

    customer.name = name;

    return response.status(201).send();
});

// Deve ser possível obter dados da conta do cliente
app.get('/account', verifyIfExistsAccountCPF, (request, response) => {
    const { customer }= request;

    return response.json(customer);
});

// Deve ser possível deletar uma conta
app.delete('/account', verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request;

    // splice
    customers.splice(customers.indexOf(customer), 1);

    return response.status(200).json(customers);
});

// Deve ser possível retornar o balance
app.get('/balance', verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request;

    const balance = getBalance(customer.statement);

    return response.json(balance);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
