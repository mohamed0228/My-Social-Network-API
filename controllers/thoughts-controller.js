const express = require('express');

const { Thought, User } = require('../models')


const thoughtController = {
getAllThoughts(req, res) {
    Thought.find({})
        .populate({
            path: 'reactions',
            select: '-__v'
          })
         
         
        .select('-__v')
        
        .then(thoughtData => res.json(thoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
},



//////////////
createThought({ body }, res) {
    Thought.create(body)
    .then((thoughtData) =>{
        return User.findByIdAndUpdate(
            {_id: body.userId},
            {$push: { thoughts: thoughtData._id }},
            {new :true}
        );
    })
    .then((userData) => {
            if (!userData){
                res.json(404).json({message: 'no user with this partuculiar id'});
                return;
            }
            res.json(userData)
        })
        .catch(err => res.status(400).json(err));
},
/////////GET THOUGHT BY ID
getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
        .populate({
            path: 'reactions',
            select: '-__v'
          })
         .select('-__v')
        .then(thoughtData => {
            if (!thoughtData) {
                res.json(404).json({ message: 'no THought found with this id!' })
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => {
            console.log(err);
            response.status(400).json(err);
        });
},
///////////////////update thoughts
updateThoughtById({params, body}, res) {
    Thought.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
    .populate({
        path: 'reactions', 
        select: '-__v'
    })
    .select('-___v')
    .then(thoughtData => {
        if (!thoughtData) {
            res.status(404).json({message: 'No thoughts with this particular ID!'});
            return;
        }
            res.json(thoughtData);
    })
    .catch(err => res.json(err));
},
/////////////////////////////delet thoughts
deleteThoughtById({params}, res) {
    Thought.findOneAndDelete({_id: params.id})
    .then(thoughtData => {
        if (!thoughtData) {
            res.status(404).json({message: 'No thoughts with this particular ID!'});
            return;
        }
        res.json(thoughtData);
        })
        .catch(err => res.status(400).json(err));
},
/////////////////////////// add reactions
addReaction({params,body}, res) {
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
         {$push: {reactions: body}},
        { new: true }
    )
   
    .select('-__v')
    .then(thoughtData => {
        if (!thoughtData) {
            res.status(404).json({message: 'No thoughts with this particular ID!'});
            return;
        }
    res.json(thoughtData);
    })
    .catch(err => res.json(err));
} ,

/////// delete reactions
deleteReaction({params}, res) {
    Thought.findOneAndUpdate({_id: params.thoughtId}, {$pull: {reactions: {reactionId: params.reactionId}}},)
    .then(thoughtData => {
        if (!thoughtData) {
            res.status(404).json({message: 'No thoughts with this particular ID!'});
            return;
        }
        res.json(thoughtData);
    })
    .catch(err => res.status(400).json(err));
}



}
module.exports = thoughtController;