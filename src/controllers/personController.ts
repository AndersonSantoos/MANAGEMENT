import { Request, Response } from 'express';
import { createPerson, getAllPerson, getPersonById, updatePerson, deletePerson } from '../repositories/personRepository';

async function createPersonController(req: Request, res: Response): Promise<void> {
   const { name, age, email } = req.body;
   try {
    const person = await createPerson(name, age, email);
    res.status(201).json(person);
   } catch (error: any) {
    res.status(400).send(error.message);
    }
}

async function getAllPersonController(req: Request, res: Response): Promise<void> {
    try {
        const persons = await getAllPerson();
        res.status(200).json(persons);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
}

async function getPersonByIdController(req: Request, res: Response): Promise<void> {
   const id = Number(req.params.id);
   try {
    const person = await getPersonById(id);
    if (!person) {
        res.status(404).send('Pessoa não encontrada');
    } else {
        res.status(200).json(person);
    }
   } catch (error: any) {
    res.status(500).send(error.message);
   }
}

async function updatePersonController(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const { name, age, email } = req.body;
    try {
        const updatedPerson = await updatePerson(id, name, age, email);
        res.status(200).json(updatedPerson);
    } catch (error: any) {
        res.status(400).send(error.message);
    }
}

async function deletePersonController(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    try {
        await deletePerson(id);
        res.status(200).send(`Pessoa com o id ${id} foi excluído com sucesso!`);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
}

export { createPersonController, getAllPersonController, getPersonByIdController, updatePersonController, deletePersonController}