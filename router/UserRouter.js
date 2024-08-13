import {getUserModel, login, register} from '../controller/UserController.js'
import { Router } from 'express'

export const router =Router();
router.get('/user',getUserModel);
router.post('/user',register);
router.post('/login',login);

export const  routerUser=router;