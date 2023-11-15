import mongoose from "mongoose";

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

const connectToDatabase = () => {
  mongoose
    .connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.25oy7u0.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => console.log('Conectou ao banco.'))
    .catch((error) => console.log(error));
};

export default connectToDatabase;
