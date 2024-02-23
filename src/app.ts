import express from 'express';
import bodyParser from 'body-parser';
import personRoutes from './routes/personRoutes';
import { sequelize } from './database/dbConfig';
import cors from 'cors'; 

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use('/person', personRoutes);
app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  try {
    await sequelize.sync();
    console.log('Models synced with database successfully.');
  } catch (error) {
    console.error('Unable to sync models with database:', error);
  }
});


export default app; 

