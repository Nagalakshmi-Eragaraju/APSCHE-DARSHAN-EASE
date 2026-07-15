import Temple from '../models/templeModel.js';

// @desc    Add a new temple
// @route   POST /api/temples
// @access  Private/Authenticated (We can protect it using protectRouter)
export const addTemple = async (req, res) => {
    try {
        const { name, location, description, image } = req.body;

        if (!name || !location || !description || !image) {
            return res.status(400).json({ success: false, message: 'Please provide name, location, description, and an image URL' });
        }

        const temple = await Temple.create({
            name,
            location,
            description,
            image,
        });

        res.status(201).json({
            success: true,
            message: 'Temple added successfully',
            data: temple,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get all temples
// @route   GET /api/temples
// @access  Public
export const getAllTemples = async (req, res) => {
    try {
        const temples = await Temple.find({}).sort({ createdAt: -1 });
        res.json({
            success: true,
            count: temples.length,
            data: temples,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get a single temple by ID
// @route   GET /api/temples/:id
// @access  Public
export const getTempleById = async (req, res) => {
    try {
        const temple = await Temple.findById(req.params.id);

        if (temple) {
            res.json({
                success: true,
                data: temple,
            });
        } else {
            res.status(404).json({ success: false, message: 'Temple not found' });
        }
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ success: false, message: 'Invalid Temple ID format' });
        }
        res.status(500).json({ success: false, message: error.message });
    }
};
