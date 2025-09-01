import express from "express";
import { createPost, deletePost, commentOnPost, likeUnLikePost, getAllPosts, getLikedPosts, getFollowingPosts, getUserPosts } from "../controllers/post_controller.js";
import { protectRoute } from "../middleware/protectRoute.js";


const router = express.Router();


router.get('/all', protectRoute, getAllPosts );
router.get('/likes/:id', protectRoute, getLikedPosts );
router.get('/following', protectRoute, getFollowingPosts );
router.get('/user/:username', protectRoute, getUserPosts );
router.post('/create', protectRoute, createPost );
router.post('/like/:id', protectRoute, likeUnLikePost );
router.post('/comment/:id', protectRoute, commentOnPost );
router.delete('/:id', protectRoute, deletePost );



export default router;