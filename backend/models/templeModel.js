import mongoose from 'mongoose';

const templeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Temple name is required'],
            trim: true,
        },
        location: {
            type: String,
            required: [true, 'Temple location is required'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Temple description is required'],
        },
        image: {
            type: String,
            required: [true, 'Temple image URL is required'],
        },
    },
    {
        timestamps: true,
    }
);

const Temple = mongoose.model('Temple', templeSchema);

export default Temple;
