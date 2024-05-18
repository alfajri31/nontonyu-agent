import mongoose, {Document, Schema} from 'mongoose';


export interface ICatalogType extends Document {
    type: string;
}

const CatalogTypeSchema: Schema = new Schema({
    type: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
},{collection:"catalog_type"});


export default mongoose.model<ICatalogType>('catalogType', CatalogTypeSchema);
