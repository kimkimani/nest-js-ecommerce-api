import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: {
        type: String,
        select: false,
        required:true
    },
    createdAt: {
        type:Date,
        default:Date.now
    }
});

userSchema.pre('save', async function(next:any){
    try{
        if(!this.isModified('password')){
            return next();
        }
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        return next();
    }catch(error){
        return next(error);
    }
})