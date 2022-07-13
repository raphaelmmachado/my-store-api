import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import { ServerApiVersion } from "mongodb";
import cors from "cors";
// .JS NO FINAL PARA ARQUIVOS LOCAIS
import userRouter from "./routes/userRouter.js";
import authRouter from "./routes/authRouter.js";
import postRouter from "./routes/postRouter.js";
const app = express();
config();
const uri = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3000;
mongoose.connect(
  uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  },
  (err) => {
    err
      ? console.log("falha ao conectar ao mongodb!", err)
      : console.log("connectado ao mongo");
  }
);
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use("/posts", postRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.listen(PORT, () => console.log(`server rodando na porta: ${PORT}`));