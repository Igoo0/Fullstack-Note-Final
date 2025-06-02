import express from 'express';
import { getNote, 
         getNoteById,
         createNote,
         updateNote,
         deleteNote 
} from '../controller/NoteController.js';


const router = express.Router();

router.get('/notes', getNote);
router.get('/notes/:id', getNoteById);
router.post('/notes', createNote);
router.patch('/notes/:id', updateNote);
router.delete('/notes/:id', deleteNote);

export default router;