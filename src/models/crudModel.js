import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const CoresListSchema = new Schema({
    coresID: {
        type: String,
        required: 'Enter coresID',
    },
    clientID: {
        type: String,
        required: 'Enter clientID',
    },
    fullName: {
        type: String,
        required: 'Enter fullName',
    },
    shortName: {
        type: String,
        required: 'Enter shortName',
    },
    productIndex: {
        type: String,
        required: 'Enter productIndex',
    },
    manufacturer: {
        type: String,
        required: 'Enter manufacturer',
    },
    quantityProductsSent: {
        type: String,
        required: 'quantityProductsSent',
    },
    documentID: {
        type: String,
        required: 'Enter documentID',
    },
    created_date: {
        type: Date,
        default: Date.now,
        get: (currentDate) => new Date(currentDate).toLocaleDateString("pl-PL")
    },
    numberOfProductsInvoice: {
        type: String,
    },
}, { toJSON: { getters: true } });