const User =  require('../models/user');

function usersIndex(req, res) {
  User.find((err, users) => {
    if (err) res.status(500).json({ message: 'Something went wrong finding all users on the server side.'});
    console.log('USERS INDEX HIT', users);
    return res.status(200).json(users);
  });
}
function usersShow(req, res) {
  User.findById(req.params.id, (err, user) => {
    if (err) res.status(500).json({ message: 'Something went wrong finding that specific user on the server side.'});
    if (!user) res.status(404).json({ message: 'No user found by that ID'});
    return res.status(200).json(user);
  });
}
function usersUpdate(req, res) {
  User.findByIdAndUpdate(req.params.id, req.body.user, {new: true}, (err, user) => {
    if (err) res.status(500).json({ message: 'Something went wrong updating that specific user on the server side.'});
    if (!user) res.status(404).json({ message: 'No user found by that ID'});
    return res.status(200).json(user);
  });
}
function usersDelete(req, res) {
  User.findByIdAndRemove(req.params.id, (err, user) => {
    if (err) res.status(500).json({ message: 'Something went wrong deleting that specific user on the server side.'});
    if (!user) res.status(404).json({ message: 'No user found by that ID'});
    return res.sendStatus(204);
  });
}

module.exports = {
  index: usersIndex,
  show: usersShow,
  update: usersUpdate,
  delete: usersDelete
};
