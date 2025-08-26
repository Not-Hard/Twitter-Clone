import User from "../models/user_module.js";


export const getUserProfile = async (req, res) => {
    const { username } = req.params;

    try {
        const user = await User.findOne({ username }).select("-password"); 
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user profile:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const followUnfollowUser = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const userToModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id);
        
        if (id === req.user._id) {
            return res.status(400).json({ error: "You cannot follow/unfollow yourself" });
        }
        
        if (!userToModify || !currentUser) {
            return res.status(404).json({ error: "User not found" });
        }

        const isFollowing = currentUser.following.includes(id);

        if (isFollowing) {
            // Unfollow the user
        } else {
            // Follow the user 
        }

        await userToModify.save();
        res.status(200).json({ message: "Follow/Unfollow successful", user: userToModify });
    } catch (error) {
        console.error("Error following/unfollowing user:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};