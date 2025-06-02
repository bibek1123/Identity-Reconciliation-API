import './src/config/env.js';
import express from 'express';
import cors from 'cors';
import * as util from "./src/utils/messages.js";
import indexRoutes from './src/routes/index.js';
import {PORT} from './src/config/config.js'
import sequelize from './src/config/db/connection.js';
import { MESSAGE } from './src/config/constants/message.js';

const app = express();

globalThis.util = util;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1', indexRoutes);

// Health Check
app.get("/", (req, res) => {
  res.json({ message: "Identity Reconciliation App Running" });
});

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log(MESSAGE.DB.CONNECTED);

    if (process.env.NODE_ENV !== 'production') {
      await sequelize.sync();
      console.log(MESSAGE.DB.SYNCED);
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(MESSAGE.DB.FAILED, error);
    process.exit(1); // Exit on failure
  }
};


// Start the server
startServer();