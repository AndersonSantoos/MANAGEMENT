import express, { Request, Response } from 'express';
import { createPersonController, getAllPersonController, getPersonByIdController, updatePersonController, deletePersonController } from '../controllers/personController';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    try {
      await createPersonController(req, res);
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  });
  
  router.get('/', async (req: Request, res: Response) => {
    try {
      await getAllPersonController(req, res);
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  });
  
  router.get('/:id', async (req: Request, res: Response) => {
    try {
      await getPersonByIdController(req, res);
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  });
  
  router.put('/:id', async (req: Request, res: Response) => {
    try {
      await updatePersonController(req, res);
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  });
  
  router.delete('/:id', async (req: Request, res: Response) => {
    try {
      await deletePersonController(req, res);
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  });
  
  export default router;
  