import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.shutterstock.com%2Fimage-vector%2Fdefault-avatar-profile-icon-social-600nw-1677509740.jpg&f=1&nofb=1&ipt=12df000669e2ee261b9ea4db5b5010c27abe45a234d8d469ee3798ebb9e33249&ipo=images',
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);

export default User;
