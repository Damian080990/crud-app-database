import mongoose from "mongoose";
import { CoresListSchema } from '../models/crudModel';

const Contact = mongoose.model('CoresList', CoresListSchema);
//tworzymy nowy wpis w bazie
export const addNewCore = async (req, res) => {
    try {
        let newCore = new Contact(req.body)
        await newCore.save(); // Zapis do bazy danych
        res.json(newCore);
    } catch (err) {
        res.status(500).send(err); //Obsługa błędów
    }
};


export const getCoreLists = async (req, res) => {
    try {
        const listOfCore = await Contact.find(); // Pobieramy wszystkie kontakty
        res.json(listOfCore); // Zwracamy je jako JSON
    } catch (err) {
        res.status(500).send(err); // Obsługa błędów
    }
};

export const getCoretWithID = async (req, res) => {
    try {
        const core = await Contact.findById(req.params.coreID);
        res.json(core);
    } catch (err) {
        res.status(500).send(err);
    }
};

export const updateCore = async (req, res) => {
    try {
        //new:true - to co przekaze json na nowo zostanie uaktualnione i wyswietlone zostaną nowe dane a nie stare (new: false)
        const coreUpdated = await Contact.findOneAndUpdate({ _id: req.params.coreID }, req.body, { new: true })
        res.json(coreUpdated);
    } catch (err) {
        res.status(500).send(err);
    }
};

export const deleteCore = async (req, res) => {
    try {
        await Contact.deleteOne({ _id: req.params.coreID })
        res.json({ message: 'Successfully deleted contact' })
    } catch (err) {
        res.status(500).send(err);
    }
};



