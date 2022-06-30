import express from "express"
import authMiddleware from "../controllers/authController.js"
const authRouter = express.Router()

//TODO FIX
authRouter.get("/admin", authMiddleware, (req,res)=>{
   if (req.user.admin) {res.status(200).send("Usuário é admin! Acesso permitido") }
   else{
    res.status(401).send("Acesso negado! Usuário não é permitido")
   }
});

authRouter.get("/", authMiddleware, (req,res)=>{
    res.send("Usuário autorizado")
})

export default authRouter