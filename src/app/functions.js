const mongo_client = require("./src/config/mongodb");

function createQuestion(id, tag, level, dbo, callback) {
  const question = { id, tag, level, status: "pending" };
  dbo.collection("questions").insertOne(question, callback);
  return "Question created!";
}

function createQuestions(questions, dbo, callback) {
  dbo.collection("questions").insertMany(questions, callback);
  return "Questions created!";
}

function getQuestionsByTag(tag, dbo, callback) {
  dbo.collection("questions").find({ tag }).toArray(callback);
  return "Got them!";
}

function getQuestionById(id, dbo, callback) {
  dbo.collection("questions").findOne({ id }, callback);
  return "Got it!";
}

function getAllQuestions(dbo, callback) {
  dbo.collection("questions").find({}).toArray(callback);
  return "Got them!";
}

function deleteQuestion(id, dbo, callback) {
  dbo.collection("questions").deleteOne({ id }, callback);
  return "Deleted question!";
}

function deleteAllQuestions(dbo, callback) {
  dbo.collection("questions").deleteMany({}, callback);
  return "Deleted questions!";
}

function setQuestionsStatusByTag(tag, status, dbo, callback) {
  dbo
    .collection("questions")
    .updateMany({ tag }, { $set: { status } }, callback);
  return "Set questions!";
}

function setQuestionStatusById(id, status, dbo, callback) {
  dbo.collection("questions").updateOne({ id }, { $set: { status } }, callback);
  return "Set question!";
}

function setAllQuestionsStatus(status, dbo, callback) {
  dbo.collection("questions").updateMany({}, { $set: { status } }, callback);
  return "Set questions!";
}

function displayCommandDescriptions() {
  return "Descriptions!";
  // Implement your own descriptions of the above commands here.
}

module.exports = {
  createQuestion: createQuestion,
  createQuestions: createQuestions,
  getQuestionsByTag: getQuestionsByTag,
  getQuestionById: getQuestionById,
  getAllQuestions: getAllQuestions,
  deleteQuestion: deleteQuestion,
  deleteAllQuestions: deleteAllQuestions,
  setQuestionsStatusByTag: setQuestionsStatusByTag,
  setQuestionStatusById: setQuestionStatusById,
  setAllQuestionsStatus: setAllQuestionsStatus,
  displayCommandDescriptions: displayCommandDescriptions,
};
