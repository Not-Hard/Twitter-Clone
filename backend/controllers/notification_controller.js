import Notification from '../models/notification_model.js';





export const getAllNotifications = async (req, res) => {
    try {
        const userId = req.user._id;
        const notifications = await Notification.find({ to: userId })
            .populate({ path: 'from', select: 'username profileImg' })

        await Notification.updateMany({ to: userId }, { read: true });
        res.status(200).json(notifications);
    } catch (error) {
        console.error("Error fetching notifications:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deleteNotifications = async (req, res) => {
    try {
        const userId = req.user._id;
        await Notification.deleteMany({ to: userId });
        res.status(204).json({ message: "Notifications deleted successfully" });
    } catch (error) {
        console.error("Error deleting notification:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

/*export const deleteNotification = async (req, res) => {
    try {
        const userId = req.user._id;
        const notificationId = req.params.id;
        const notification = await Notification.findOneAndDelete({ notificationId });

        if(!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }

        if(notification.to.toString() !== userId.toString()){
            return res.status(403).json({error: "You're not allowed to delete this notification"})
        }

        await Notification.findByIdAndDelete(notificationId);

        res.status(204).json({ message: "Notification deleted successfully" });
    } catch (error) {
        console.error("Error deleting notification:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};*/