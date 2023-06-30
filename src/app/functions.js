const mongodb = require("../config/mongodb.js");
const { ObjectId } = require("mongodb");
const runGeneration = require("./runGeneration.js");

async function createQuestions(args) {
  const level = args.level;
  const tag = args.tag;
  const number = args.number;

  let question_ids = "";

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
      const result = await mongodb.insertOne(question_data);
      console.log(result.insertedId.toString());
      question_ids = question_ids.concat(`${result.insertedId.toString()}, `);
    } catch (e) {
      console.log(e.toString());
    }
  }
  return (
    "The following question IDs have been added to the database: " +
    question_ids
  );
}

async function getQuestionsByTag(args) {
  const tag = args.tag;

  try {
    let questions = await mongodb.find({ tag }).toArray();

    // Format the answers into a string
    const formattedAnswers = questions
      .map((question) => {
        return `
Question ID: ${question._id}
Tag: ${question.tag}
Level: ${question.level}
Question: ${question.question}
Choices:
${question.choices.map((choice) => `- ${choice}`).join("\n")}
Answer: ${question.answer}
Status: ${question.status}
Revised: ${question.revised}
`;
      })
      .join("\n");

    return formattedAnswers;
  } catch (e) {
    console.error(e);
    return "Error retrieving questions.";
  }
}

async function getQuestionById(args) {
  const questionId = args.id;

  try {
    let question = await mongodb.findOne({ _id: new ObjectId(questionId) });

    if (!question) {
      return "Question not found.";
    }

    // Format the answer into a string
    const formattedAnswer = `
Question ID: ${question._id}
Tag: ${question.tag}
Level: ${question.level}
Question: ${question.question}
Choices:
${question.choices.map((choice) => `- ${choice}`).join("\n")}
Answer: ${question.answer}
Status: ${question.status}
Revised: ${question.revised}
`;

    return formattedAnswer;
  } catch (e) {
    console.error(e);
    return "Error retrieving question.";
  }
}

async function getAllQuestions() {
  try {
    let questions = await mongodb.find().toArray();

    // Format the answers into a string
    const formattedAnswers = questions
      .map((question) => {
        return `
Question ID: ${question._id}
Tag: ${question.tag}
Level: ${question.level}
Question: ${question.question}
Choices:
${question.choices.map((choice) => `- ${choice}`).join("\n")}
Answer: ${question.answer}
Status: ${question.status}
Revised: ${question.revised}
`;
      })
      .join("\n");

    return formattedAnswers;
  } catch (e) {
    console.error(e);
    return "Error retrieving questions.";
  }
}

async function deleteQuestion(args) {
  const id = args.id;
  try {
    await mongodb.deleteOne({ id });
    return "Deleted question!";
  } catch (e) {
    console.error(e);
    return "Error deleting question";
  }
}

async function deleteAllQuestions() {
  try {
    await mongodb.deleteMany({});
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
    await mongodb.updateMany({ tag }, { $set: { status } });
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
    await mongodb.updateOne({ id }, { $set: { status } });
    return "Set question!";
  } catch (e) {
    console.error(e);
    return "Error setting question";
  }
}

async function setAllQuestionsStatus(args) {
  const status = args.status;
  try {
    await mongodb.updateMany({}, { $set: { status } });
    return "Set questions!";
  } catch (e) {
    console.error(e);
    return "Error setting questions";
  }
}

function displayCommandDescriptions() {
  return "Feel free to create, get, set, or delete questions!";
}

module.exports = {
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
