import { Request, Response } from "express";
import { createPerson, deletePerson, getAllPerson, getPersonById, updatePerson } from "../repositories/personRepository";

export const createPersonController = async (req: Request, res: Response): Promise<void> => {
  const { name, age, email } = req.body;
  try {
    const createdPerson = await createPerson(name, age, email);
    res.status(201).json(createdPerson);
  } catch (error: any) {
    console.error("Error creating person:", error.message);
    res.status(500).send("Error creating person");
  }
};

export const getAllPersonController = async (req: Request, res: Response): Promise<void> => {
  try {
    const persons = await getAllPerson();
    res.status(200).json(persons);
  } catch (error: any) {
    console.error("Error getting all persons:", error.message);
    res.status(500).send("Error getting all persons");
  }
};

export const getPersonByIdController = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id);
  try {
    const person = await getPersonById(id);
    if (!person) {
      res.status(404).send("Person not found");
      return;
    }
    res.status(200).json(person);
  } catch (error: any) {
    console.error("Error getting person by ID:", error.message);
    res.status(500).send("Error getting person by ID");
  }
};

export const updatePersonController = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id);
  const { name, age, email } = req.body;
  try {
    const updatedPerson = await updatePerson(id, name, age, email);
    if (!updatedPerson) {
      res.status(404).send("Person not found");
      return;
    }
    res.status(200).json(updatedPerson);
  } catch (error: any) {
    console.error("Error updating person:", error.message);
    res.status(500).send("Error updating person");
  }
};

export const deletePersonController = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id);
  try {
    await deletePerson(id);
    res.status(200).send(`Person with ID ${id} has been deleted successfully`);
  } catch (error: any) {
    console.error("Error deleting person:", error.message);
    res.status(500).send("Error deleting person");
  }
};
