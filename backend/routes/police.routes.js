import express from 'express'
const router=express.Router()
 import { registerPoliceDevice,verifyPoliceDevice, } from '../controllers/station';
router.post("/policeDeviceReg",registerPoliceDevice)
router.post("/verifyDevice",verifyPoliceDevice)
export default router;
