import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

  email : {
    type : String,
    required : true,
    unique : true
  },
  password : {
    type : String,
    required : true
  },
  role : {
    type : String,
    required : true,
    default : "customer"  
  },
  firstName : {
    type : String,
    required : true
  },
  lastName : {
    type : String,
    required : true
  },
  address : {
    type : String,
    required : true
  },
  phone : {
    type : String,
    required : true
  },
  profilePicture : {
    type : String,
    required : true,
    default : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Fvector-art%2F20765399-default-profile-account-unknown-icon-black-silhouette&psig=AOvVaw30NM2stIzrLNTLt-QhpFrX&ust=1736060142165000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMCFs42-24oDFQAAAAAdAAAAABAI"
  }
});

const User= mongoose.model("User",userSchema);

export default User;

// {
//   "email": "chamidu@example.com",
//   "password": "1234"
// }


// "email": "chamindu5@example.com",
//   "password": "123"   //admin