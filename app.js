import express  from 'express'
import {sequelize} from './db/conexion.js'
import {routerTypes} from './router/TypesRouter.js'
import {routerUser} from './router/UserRouter.js'
import bodyParser from 'body-parser';
import cors from "cors";

const app = express()
const port = 3000
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.use('/api',routerTypes);
app.use('/api', routerUser);
app.use('/api/v0', routerUser);



const conexion= async () =>{
    try {
      await sequelize.authenticate();
      await sequelize.sync({ force: false });
      console.log('Connection has been established successfully.');
      app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
      })
  } catch (error) {
      console.error(`Error ${error}`);
  }
}
conexion();


