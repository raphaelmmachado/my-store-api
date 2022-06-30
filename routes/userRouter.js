import UserModel from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { registerValidate, loginValidate } from "../controllers/validate.js";
import mongoose from "mongoose";
import { config } from "dotenv";

import express from "express";
//IMPORTAR DOTENV ANTES DE ATRIBUIR SECRET
config();
const secret = process.env.TOKEN_SECRET;
const userRouter = express.Router();

// REGISTER ROUTER
userRouter.post("/register", async (req, res) => {
  //validar com Joi
  const { error } = registerValidate(req.body);
  if (error) return res.status(400).send(error.message);
  //se passar na validação, buscar se email está em uso
  const selectedUser = await UserModel.findOne({ email: req.body.email });
  if (selectedUser) return res.status(400).send("Email em uso");
  // criar novo user
  const user = new UserModel({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    //cryptografar a senha do usuário para não ser exposta
    password: bcrypt.hashSync(req.body.password),
  });
  try {
    //salvar na db e retornar ao front
    const savedUser = await user.save();
    res.status(200).send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});
//LOGIN ROUTER
userRouter.post("/login", async (req, res) => {
  //validar com Joi
  const { error } = loginValidate(req.body);
  if (error) return res.status(400).send(error.message);
  // buscar por email
  const selectedUser = await UserModel.findOne({ email: req.body.email });
  if (!selectedUser) return res.status(400).send("Email não encontrado!");
  //checar se a senha bate
  const passWordMatch = bcrypt.compareSync(
    req.body.password,
    selectedUser.password
  );
  if (!passWordMatch) return res.status(400).send("Email ou senha incorreto!");
    //criar token com info do user
  const token = jwt.sign(
    {
      _id: selectedUser._id,
      name: selectedUser.name,
      email: selectedUser.email,
    },
    secret,
    { expiresIn: "1d" }
  );
  //criar header com token
  res.set("authorization-token", token);
  res.status(200).send({ message: "Usuário logado com sucesso", token: token, id:selectedUser._id });
});

export default userRouter;
