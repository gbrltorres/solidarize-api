const mongoose = require('mongoose');

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

const connectToDatabase = () => {
  mongoose
    .connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.qbin0wg.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => console.log('Conectou ao banco.'))
    .catch((error) => console.log(error));
};

module.exports = connectToDatabase
