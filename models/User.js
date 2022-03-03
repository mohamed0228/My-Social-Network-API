const { Schema, model } = require('mongoose');

const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema(
    {
        username: {
        type: String,
        unique:true,
        required: true,
        trim: true
      },
      email: {
        type: String,
        required: 'Email address is required',
        unique:true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
      },
      
     
      thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Thought'
        }
      ],
      freinds: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User'
        }
      ]
    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      },
      id: false
    }
  );

// // get total count of comments and replies on retrieval
// UserSchema.virtual('friendCount').get(function() {
//   return this.user.reduce((total, user) => total + comment.replies.length + 1, 0);
// });



 const User = model('User', UserSchema);
  module.exports = User;