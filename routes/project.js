import express from 'express';
import { getProjects, addProject  } from '../controllers/project.js';
import { upload } from '../util/upload.js'; 

const router = express.Router();

router.get('/', getProjects);

router.post('/', upload.single('image'), addProject);

export default router;
