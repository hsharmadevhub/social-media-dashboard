import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: [
            {
                validator: (v: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
                message: "Email must be valid"
            }
        ]
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        validate: [
            {
                validator: (v: string): boolean => /[a-z]/.test(v),
                message: "Password must contain at least one lowercase letter"
            },
            {
                validator: (v: string): boolean => /[A-Z]/.test(v),
                message: "Password must contain at least one uppercase letter"
            },
            {
                validator: (v: string): boolean => /\d/.test(v),
                message: "Password must contain at least one number"
            },
            {
                validator: (v: string): boolean => /[!@#$%^&*]/.test(v),
                message: "Password must contain at least one special character"
            },
            {
                validator: (v: string): boolean => !/\s/.test(v),
                message: "Password cannot contain spaces"
            }
        ]
    }
});

export default mongoose.model('User', userSchema);