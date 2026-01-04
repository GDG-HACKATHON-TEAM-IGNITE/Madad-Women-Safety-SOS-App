import express from 'express'
import { userCreate,addFriends,scoreCalculator,report } from '../controllers/user';
const router=express.Router()
 
router.post("/user",userCreate)
router.patch("/user/addfriends", decodeToken, addFriends)
router.get("/safeScore", decodeToken, scoreCalculator)
router.post("/report", decodeToken, report)
export default router;
