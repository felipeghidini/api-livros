import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://lipeghidini18:Mandyefe18@cluster0.wldmokg.mongodb.net/alura-livros');

let db = mongoose.connection;

export default db;