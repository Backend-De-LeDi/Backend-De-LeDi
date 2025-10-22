import { Schema, model, Types } from 'mongoose';

const EmbeddingSchema = new Schema({
     bookId: {
          type: Types.ObjectId, ref: "Books",
          required: true,
          index: true
     },
     embedding: {
          type: [Number],
          required: true,
          validate: {
               validator: (arr: number[]) => Array.isArray(arr) && arr.length > 0,
               message: 'El vector de embedding debe ser un array no vacío de números.'
          }
     }
}, {
     versionKey: false,
     timestamps: false,
     strict: true
});

export const EmbeddingModel = model('Embedding', EmbeddingSchema);