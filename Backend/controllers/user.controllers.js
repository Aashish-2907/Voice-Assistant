import User from '../models/user.model.js';

 const getCurrentUser=async (req, res) => {
    try {
        const userId = req.userId; // Assuming userID is set by the isAuth middleware
        const user = await User.findById(userId).select('-password');
        console.log("User fetched:", user);
        console.log("Token userId:", req.userId);
        // const user = await User.findById(req.userId);
        console.log("User fetched:", user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: `Error fetching user: ${error.message}` });
    }
}

export default getCurrentUser;