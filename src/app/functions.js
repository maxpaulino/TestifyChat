const mongodb = require("../config/mongodb.js");
const runGeneration = require("./runGeneration.js");

async function createQuestion(args) {
  const level = args.level;
  const tag = args.tag;
  let prompt_list = [];
  let ready = false;

  while (!ready) {
    let result = await runGeneration(tag, level);
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
  console.log(question_data);

  try {
    await mongodb.insertOne(question_data);
    return "Question created!";
    // Consider adding description of the question
  } catch (e) {
    console.log(e.toString());
  }
}

async function createQuestions(args) {
  const level = args.level;
  const tag = args.tag;
  const number = args.number;

  for (let i = 0; i < number; i++) {
    let prompt_list = [];
    let ready = false;

    while (!ready) {
      let result = await runGeneration(tag, level);
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
      await mongodb.insertOne(question_data);
      return "Question added!";
    } catch (e) {
      console.log(e.toString());
    }
  }
  return "Questions created!";
}

async function getQuestionsByTag(args) {
  const tag = args.tag;
  try {
    let questions = await mongodb.database
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

async function getQuestionById(args) {
  const id = args.id;
  try {
    let question = await mongodb.database
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
    let questions = await mongodb.database
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

async function deleteQuestion(args) {
  const id = args.id;
  try {
    await mongodb.database.collection("questions").deleteOne({ id });
    return "Deleted question!";
  } catch (e) {
    console.error(e);
    return "Error deleting question";
  }
}

async function deleteAllQuestions() {
  try {
    await mongodb.database.collection("questions").deleteMany({});
    return "Deleted questions!";
  } catch (e) {
    console.error(e);
    return "Error deleting questions";
  }
}

async function setQuestionsStatusByTag(args) {
  const tag = args.tag;
  const status = args.status;
  try {
    await mongodb.database
      .collection("questions")
      .updateMany({ tag }, { $set: { status } });
    return "Set questions!";
  } catch (e) {
    console.error(e);
    return "Error setting questions";
  }
}

async function setQuestionStatusById(args) {
  const id = args.id;
  const status = args.status;
  try {
    await mongodb.database
      .collection("questions")
      .updateOne({ id }, { $set: { status } });
    return "Set question!";
  } catch (e) {
    console.error(e);
    return "Error setting question";
  }
}

async function setAllQuestionsStatus(args) {
  const status = args.status;
  try {
    await mongodb.database
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
  getAllQuestions: getAllQuestions,
  getQuestionById: getQuestionById,
  getQuestionsByTag: getQuestionsByTag,
  setAllQuestionsStatus: setAllQuestionsStatus,
  setQuestionStatusById: setQuestionStatusById,
  setQuestionsStatusByTag: setQuestionsStatusByTag,
  deleteQuestion: deleteQuestion,
  deleteAllQuestions: deleteAllQuestions,
  displayCommandDescriptions: displayCommandDescriptions,
};
