const express = require('express');
const bodyParser = require('body-parser');

// Helpers
const {
    synchronizeTable
} = require('./helpers/synchronize-table');




const app = express();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);



const PORT = process.env.PORT || 8081;

// Synchronize tables before starting an server
synchronizeTable();

app.listen(PORT, () => {
    console.log(`Node Express server listening on http://localhost:${PORT}`);
})