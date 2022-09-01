import { Router} from "express";
import { getMe, login, register } from "../controllers/auth.js";
import { checkAuth } from "../middleware/checkAuth.js";

const router = new Router()

//Register

router.post('/register',register)
router.post('/login',login)
router.get('/selfget',checkAuth,getMe)



export default router