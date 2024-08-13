import {deleteTypeUser, getTypeModel, store, updateTypeUser} from '../controller/TypeUserController.js'
import { Router } from 'express'
import { verifyToken } from '../middleware/auth.js';
const router =Router();
router.get('/type',getTypeModel);
router.post('/type',verifyToken,store);
router.put('/type/:id',updateTypeUser);
router.delete("/eliminar/:id",verifyToken, deleteTypeUser)
export const routerTypes=router;