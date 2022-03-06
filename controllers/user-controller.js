const { response } = require('express');
const res = require('express/lib/response');
const { User } = require('../models')
const userController = {
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
              })
              .populate({
                  path: 'friends', 
                  select: '-__v'
                })
                .sort({ _id: -1 })
            .select('-__v')
            //   //.sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    /////////////////////
    //create a user

    createUser({ body }, res) {
        User.create(body)
            .then(userData => res.json(userData))
            .catch(err => res.status(400).json(err));
    },
    /////////////////////
    //GET a single user by its _id and populated thought and friend data
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
              })
             .select('-__v')
            .then(userData => {
                if (!userData) {
                    res.json(404).json({ message: 'no user found with this id!' })
                    return;
                }
                res.json(userData);
            })
            .catch(err => {
                console.log(err);
                response.status(400).json(err);
            });
    },
    /////////////////////////////
    //update a user by its _id
    updateUserById({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .select('-__v')
            .then(userData => {
                if (!userData) {
                    res.json(404).json({ message: 'no user found with this id!' })
                    return;
                }
                res.json(userData);
            })
            .catch(err => {
                console.log(err);
                response.status(400).json(err);
            });
    },
   deleteUserById({ params}, res) {
        User.findOneAndDelete({ _id: params.id })
            .select('-__v')
            .then(userData => {
                if (!userData) {
                    res.json(404).json({ message: 'no user found with this id!' })
                    return;
                }
                res.json(userData);
            })
            .catch(err => {
                console.log(err);
                response.status(400).json(err);
            });
    },
    /////////////////////////////
//////////////////////////////////////////
//addfreind 
addFriend({params}, res) {
    User.findOneAndUpdate(
        {_id: params.id}, 
        {$push: { friends: params.friendId}},
         {new: true})
   
    .select('-__v')
    .then(userData => {
        if (!userData) {
            res.status(404).json({message: 'No User with this particular ID!'});
            return;
        }
    res.json(userData);
    })
    .catch((err) => res.status(400).json(err));
} ,
//delete friend by id
deleteFriend({params}, res) {
    User.findOneAndUpdate(
        {_id: params.id}, 
        {$pull: { friends: params.friendId}},
        {new: true}
        )
    
    .select('-__v')
    .then(userData => {
        if (!userData) {
            res.status(404).json({message: 'No User with this particular ID!'});
            return;
        }
    res.json(userData);
    })
    .catch((err) => res.status(400).json(err));
} 
}
module.exports = userController;
