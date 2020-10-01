import express from "express";
import transfer from "../domains/transfer/ApiRoute";

const router = express.Router();

router.use('/transfer', transfer);

export default router;
