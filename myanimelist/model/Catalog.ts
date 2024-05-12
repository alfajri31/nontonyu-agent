import {
    Document, Model, Schema, model
} from 'mongoose';
export interface ICatalog extends Document {
    title: string;
}

interface ICatalogModel extends Model<ICatalog> { }

const schema = new Schema({
    title: { type: String, required: true },
});

export const Catalog: ICatalogModel = model<ICatalog, ICatalogModel>('Catalog', schema);
