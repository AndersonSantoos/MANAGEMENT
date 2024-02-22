import Person from '../models/Person';

async function createPerson(name: string, age: number, email: string): Promise<Person> {
   try {
    if (!name || !age || !email) {
      throw new Error('Todos os campos devem ser preenchidos.');
   } 
 const person = await Person.create({ name, age, email});
 console.log('Pessoa criada com sucesso.');
 return person;
} catch (error: any) {
    console.error('Erro ao criar pessoa:', error.message);
    throw error;
    }
}

async function getAllPerson(): Promise<Person[]> {
    try {
        const persons = await Person.findAll();
        console.log('Lista de pessoas obtida com sucesso.');
        return persons;
    } catch (error: any) {
        console.error('Erro ao obter lista de pessoas:', error.message);
        throw error;
    }
}

async function getPersonById(id: number): Promise<Person | null> {
    try {
        const person = await Person.findByPk(id);
        console.log('Pessoa obtida com sucesso.');
        return person;
    } catch (error: any) {
        console.error('Erro ao obter pessoa por ID:', error.message);
        throw error;
    }
}

async function updatePerson(registration: number, name: string, age: number, email: string): Promise<Person> {
   try {
    const person = await Person.findByPk(registration);
    if(!person) {
        throw new Error('Pessoa não encontrada.');
    }
    const updatedPerson = await person.update({ name, age, email});
    console.log('Pessoa atualiza com sucesso.');
    return updatedPerson;
   } catch (error: any) {
    console.error('Erro ao atualizar pessoa:', error.message);
    throw error;
   }
}

async function deletePerson(id: number): Promise<boolean> {
    try {
        const person = await Person.findByPk(id);
        if(!person) {
            throw new Error('Pessoa não encontrada');
        }
        await person.destroy();
        console.log('Pessoa excluída com sucesso.');
        return true;
    } catch (error: any) {
        console.error('Erro ao excluir pessoa', error.message);
        throw error;
    }
}

export { createPerson, getAllPerson, getPersonById, updatePerson, deletePerson}