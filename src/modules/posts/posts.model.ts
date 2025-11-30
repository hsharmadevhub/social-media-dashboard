import mongoose, {Types} from "mongoose";

const postSchema = new mongoose.Schema({
    post: {
        type: String,
        required: true
    },
    author: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    }
})

export default mongoose.model("Post", postSchema);