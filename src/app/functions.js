const mongo = require("./src/config/mongodb");
const responses = require("./src/app/response");

async function createQuestion(tag, level) {
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
    await mongo.database.collection("questions").insertOne(question_data);
    return "Question created!";
    // Consider adding description of the question
  } catch (e) {
    return e.toString();
  }
}

async function createQuestions(tag, level, number) {
  for (let i = 0; i < number; i++) {
    let prompt_list = [];
    let ready = false;

    while (!ready) {
      let result = await responses.runQuestionGeneration(tag, level);
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
      revised: false,
    };

    try {
      await mongo.database.collection("questions").insertOne(question_data);
    } catch (e) {
      console.log(e.toString());
    }
  }
  return "Questions created!";
}

async function getQuestionsByTag(tag) {
  try {
    let questions = await mongo.database
      .collection("questions")
      .find({ tag })
      .toArray();

    let questionsString = JSON.stringify(questions);
    return questionsString;
  } catch (e) {
    console.error(e);
    return "Error retrieving questions.";
  }
}

async function getQuestionById(id) {
  try {
    let question = await mongo.database
      .collection("questions")
      .findOne({ id })
      .toArray();

    let questionString = JSON.stringify(question);
    return questionString;
  } catch (e) {
    console.error(e);
    return "Error retrieving questions.";
  }
}

async function getAllQuestions() {
  try {
    let questions = await mongo.database
      .collection("questions")
      .find({})
      .toArray();

    let questionsString = JSON.stringify(questions);
    return questionsString;
  } catch (e) {
    console.error(e);
    return "Error retrieving questions.";
  }
}

async function deleteQuestion(id) {
  try {
    await mongo.database.collection("questions").deleteOne({ id });
    return "Deleted question!";
  } catch (e) {
    console.error(e);
    return "Error deleting question";
  }
}

async function deleteAllQuestions() {
  try {
    await mongo.database.collection("questions").deleteMany({});
    return "Deleted questions!";
  } catch (e) {
    console.error(e);
    return "Error deleting questions";
  }
}

async function setQuestionsStatusByTag(tag, status) {
  try {
    await mongo.database
      .collection("questions")
      .updateMany({ tag }, { $set: { status } });
    return "Set questions!";
  } catch (e) {
    console.error(e);
    return "Error setting questions";
  }
}

async function setQuestionStatusById(id, status) {
  try {
    await mongo.database
      .collection("questions")
      .updateOne({ id }, { $set: { status } });
    return "Set question!";
  } catch (e) {
    console.error(e);
    return "Error setting question";
  }
}

async function setAllQuestionsStatus(status) {
  try {
    await mongo.database
      .collection("questions")
      .updateMany({}, { $set: { status } });
    return "Set questions!";
  } catch (e) {
    console.error(e);
    return "Error setting questions";
  }
}

function displayCommandDescriptions() {
  return "Descriptions!";
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
