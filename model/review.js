import mongoose from "mongoose";

const reviewScheme =new mongoose.Schema({

    email : {
        type : String,
        required : true,
        unique : true
      },

      
    name :{
        type :String,
        required : true
    },
    rating : {
        type :Number,
        required : true
    },
    Comment : {
        type :String,
        required : true
    },
    date : {
        type :Date,
        required : true,
        default :Date.now()
    },
    profilePicture : {
        type : String,
        required : true,
        default : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Fvector-art%2F20765399-default-profile-account-unknown-icon-black-silhouette&psig=AOvVaw30NM2stIzrLNTLt-QhpFrX&ust=1736060142165000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMCFs42-24oDFQAAAAAdAAAAABAI"
      },
    isApproved : {
        type : Boolean,
        required : true,
        default : false
    }
   
})
const Review= mongoose.model("Review",reviewScheme);

export default Review;