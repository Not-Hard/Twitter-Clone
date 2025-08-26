import User from "../models/user_module.js";
import Notification from "../models/notification_model.js";


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

        if (id === req.user._id.toString()) {
            return res.status(400).json({ error: "You cannot follow/unfollow yourself" });
        }
        
        if (!userToModify || !currentUser) {
            return res.status(404).json({ error: "User not found" });
        }

        const isFollowing = currentUser.following.includes(id);

        if (isFollowing) {
            // Unfollow the user
            await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
            await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
            //TODO: Return the id of the user as a response
            res.status(200).json({ message: "User unfollowed successfully" });
        } else {
            // Follow the user 
            await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
            await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });

            // Create a follow notification
            const notification = new Notification({
                from: req.user._id,
                to: userToModify._id,
                type: "follow"
            });
            await notification.save();
            //TODO: Return the id of the user as a response
            res.status(200).json({ message: "User followed successfully" });
        }

        await userToModify.save();
        res.status(200).json({ message: "Follow/Unfollow successful", user: userToModify });
    } catch (error) {
        console.error("Error following/unfollowing user:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getSuggestedUsers = async (req, res) => {
    try {
        const userId = req.user._id;
        const usersFollowedByMe = await User.findById(userId).select("following");

        const users = await User.aggregate([
            { 
                $match: { 
                    _id: {
                        // Exclude the current user and users they follow
                        $ne: userId,
                        $nin: usersFollowedByMe.following
                    }
                }
            },
            { $sample: { size: 10 } }
        ]);

        const filterUsers = users.filter(user => !usersFollowedByMe.following.includes(user._id));
        const suggestedUsers = filterUsers.slice(0, 4);

        suggestedUsers.forEach(user => {
            user.password = null; // Exclude password field
        });

        res.status(200).json(suggestedUsers);
    } catch (error) {
        console.error("Error fetching suggested users:", error.message);
        res.status(500).json({ error: error.message });
    }
};