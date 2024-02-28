import mongoose from 'mongoose'
import { nanoid } from 'nanoid'

const URL = mongoose.Schema({
    full_url : {
        type:String,
        required : true,
    },
    short_url:{
        type:String,
        required:true,
        default:nanoid(9)
    }
    // user:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref: 'Users'
    // }
})

export default mongoose.model('URLs',URL)