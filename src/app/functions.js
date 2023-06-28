const mongo_db = require("./src/config/mongodb");
const responses = require("./src/app/response");

async function createQuestion(tag, level, callback) {
  let prompt_list = [];
  let ready = false;

  while (!ready) {
    let result = responses.runQuestionGeneration(tag, level);
    prompt_list = result.split("\n\n");
    if (prompt_list.length === 3) {
      if (prompt_list[2].length !== 4) {
        ready = true;
      }
    }
  }

  let question = prompt_list[0].substring(3);
  let choices = prompt_list[1].split("\n");
  let answer = prompt_list[2].substring(3);

  if (answer.startsWith("wer: ")) {
    answer = prompt_list[2].substring(8);
  }

  const question_data = {
    tag: tag,
    level: level,
    question: question,
    choices: choices,
    answer: answer,
    status: "pending",
    revised: False,
  };

  try {
    await mongo_db.collection("questions").insertOne(question_data, callback);
    return "Question created!";
    // Consider adding description of the question
  } catch (e) {
    return e.toString();
  }
}

function createQuestions(tag, level, number, callback) {
  mongo_db.collection("questions").insertMany(questions, callback);
  return "Questions created!";
}

function getQuestionsByTag(tag, callback) {
  let questions = mongo_db
    .collection("questions")
    .find({ tag })
    .toArray(callback);
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
