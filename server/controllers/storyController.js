// story routes controlling
const storyHelper = require('../helpers/user/storyHelper')

// add user story route controlling
const addStory = (req, res) => {
  const { userId } = req.body;
  storyHelper
    .addingStory(userId, req.file)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

// get stories route controlling
const fetchStories = (req, res) => {
  storyHelper
    .getAllStories()
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = {
  addStory,
  fetchStories
};
