
import Post from "../models/post_model.js";
import User from "../models/user_module.js";
import {v2 as cloudinary} from 'cloudinary';


export const createPost = async (req, res) => {
    try {
        const {text} = req.body;
        let {img} = req.body;
        const userId = req.user.id.toString();

        const user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            });
        }
        if(!text && !img) {
            return res.status(400).json({
                status: 'fail',
                message: 'Post must have a text or image'
            });
        }

        if(img) {
            const uploadedResponse = await cloudinary.uploader.upload(img);
            img = uploadedResponse.secure_url;
        }

        const newPost  = new Post({
            text,
            img,
            user: userId
        });

        await newPost.save();
        res.status(201).json(newPost);

    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
        console.error("Error creating post:", error);
    }

}

export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post) {
            return res.status(404).json({message: 'Post not found'});
        }
        if(post.user.toString() !== req.user.id.toString()) {
            return res.status(403).json({message: 'You are not authorized to delete this post'});
        }
        if(post.img) {
            const imgId = post.img.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(imgId);
        }

        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Post deleted successfully"});

    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
        console.error("Error deleting post:", error);
    }
}

export const commentOnPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const {text} = req.body;
        const userId = req.user._id;

        if(!text) {
            return res.status(400).json({message: 'Comment text cannot be empty'});
        }

        const post = await Post.findById(postId);

        if(!post){
            return res.status(404).json({message: 'Post not found'});
        }

        const comment = {user: userId, text};

        post.comments.push(comment);

        await post.save();
        res.status(200).json(post);

    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
        console.error("Error commenting on post:", error);
    }
}

export const likeUnLikePost = async(req, res) => {
    try {
        const {id: postId} = req.params;
        const userId = req.user._id;

        const post = await Post.findById(postId);

        if(!post) {
            return res.status(404).json({message: "Post not found"});
        }

        const isLiked = post.likes.includes(userId);

        if(isLiked) {
            //Unliked post
            await Post.updateOne({_id: postId},{$pull: {likes: userId}});
        } else {
            //Like
            await Post.updateOne({_id: postId},{$addToSet: {likes: userId}});
        }

        await post.save();
        res.status(200).json({message: isLiked ? "Post unliked" : "Post liked"});

    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
        console.log("Error liking/unliking post:", error.message);

    }
}