const express = require("express");
const app = express();

app.use(express.json());

let persons = [
    {
        id: "1",
        name: "Arto Hellas",
        number: "040-123456",
    },
    {
        id: "2",
        name: "Ada Lovelace",
        number: "39-44-5323523",
    },
    {
        id: "3",
        name: "Dan Abramov",
        number: "12-43-234345",
    },
    {
        id: "4",
        name: "Mary Poppendiekc",
        number: "39-24-6423122",
    },
];

app.get("/", (request, response) => {
    response.send("<h1>Hello World!</h1>");
});

// returns all person
app.get("/api/persons", (request, response) => {
    response.json(persons);
});

// returns how many persons are in the app
app.get("/info", (request, response) => {
    const people_amount = persons.length;
    const date = new Date();
    response.send(`
        <p>Phone book has info for ${people_amount} people <p/>
        <p>${date}</p>
        `);
});

// return a single person based on id
app.get("/api/persons/:id", (request, response) => {
    const id = request.params.id;
    const person = persons.find((person) => person.id === id);

    // checking if there is a person
    if (person) {
        response.json(person);
    } else {
        response.status(404).end();
    }
});

// delete a person based on id
app.delete("/api/persons/:id", (request, response) => {
    const id = request.params.id;
    persons = persons.filter((person) => person.id !== id);

    response.status(204).end();
});

// post a person into the app
app.post("/api/persons", (request, response) => {
    const body = request.body;

    // if no name is provided
    if (!body.name) {
        return response.status(400).json({
            error: "name missing",
        });
    } else if (!body.number) {
        return response.status(400).json({
            error: "number missing",
        });
    }

    if (persons.some((person) => person.name === body.name)) {
        return response.status(400).json({
            error: "name must be unique",
        });
    }

    const person = {
        id: Math.trunc(Math.random() * 999999999999999),
        name: body.name,
        number: body.number,
    };

    persons = persons.concat(person);

    response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
