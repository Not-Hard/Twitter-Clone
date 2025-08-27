import express from "express";
import { createPost, deletePost, commentOnPost, likeUnLikePost } from "../controllers/post_controller.js";
import { protectRoute } from "../middleware/protectRoute.js";


const router = express.Router();


router.post('/create', protectRoute, createPost );
router.delete('/:id', protectRoute, deletePost );
router.post('/like/:id', protectRoute, likeUnLikePost );
router.post('/comment/:id', protectRoute, commentOnPost );



export default router;