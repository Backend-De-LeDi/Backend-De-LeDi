import mongoose, { Connection } from "mongoose";
import ENV from "../../shader/config/configEnv";
import chalk from "chalk";

const connections = async (): Promise<Connection> => {
  if (!ENV.DB_URL) {
    throw new Error("Database URL is not defined in the environment variables.");
  }

  try {
    await mongoose.connect(ENV.DB_URL, { serverSelectionTimeoutMS: 30000, connectTimeoutMS: 30000 });

    console.log();
    console.log(chalk.magenta("database successfully connected"));
    console.log();

    return mongoose.connection;
  } catch (error) {
    console.log();
    console.error(chalk.red("Error en la conexión de la base de datos"));
    console.log();
    console.log(error);
    console.log();

    throw error;
  }
};

export default connections;
