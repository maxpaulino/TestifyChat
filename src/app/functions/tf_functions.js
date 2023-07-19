const mongodb = require("../../config/mongodb.js");
const { ObjectId } = require("mongodb");
const runGeneration = require("../llm/runTFGeneration.js");

async function createTFQuestions(args) {
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
    let answer = prompt_list[1].toLowerCase() === 'true' ? true : false;

    if (answer.startsWith("wer: ")) {
      answer = prompt_list[2].substring(8);
    }

    const question_data = {
      tag: tag,
      level: level,
      question: question,
      
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

async function getTFTags() {
  try {
    let tags = await mongodb.distinct("tag");
    return tags.join(", ");
  } catch (e) {
    console.error(e);
    return "Error retrieving tags.";
  }
}

async function getTFQuestionsByTag(args) {
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
Answer: ${question.answer ? 'True' : 'False'}
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

async function getTFQuestionById(args) {
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
Answer: ${question.answer ? 'True' : 'False'}
Status: ${question.status}
Revised: ${question.revised}
`;

    return formattedAnswer;
  } catch (e) {
    console.error(e);
    return "Error retrieving question.";
  }
}

async function getAllTFQuestions() {
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
Answer: ${question.answer ? 'True' : 'False'}
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

async function deleteTFQuestion(args) {
  const id = new ObjectId(args.id);
  try {
    await mongodb.deleteOne({ _id: id });
    return "Deleted question!";
  } catch (e) {
    console.error(e);
    return "Error deleting question";
  }
}

async function deleteAllTFQuestions() {
  try {
    await mongodb.deleteMany({});
    return "Deleted questions!";
  } catch (e) {
    console.error(e);
    return "Error deleting questions";
  }
}

async function setTFQuestionsStatusByTag(args) {
  const tag = args.tag;
  const status = args.status;
  try {
    await mongodb.updateMany({ tag }, { $set: { status: status, revised: true } });
    return "Set questions!";
  } catch (e) {
    console.error(e);
    return "Error setting questions";
  }
}

async function setTFQuestionStatusById(args) {
  const id = args.id;
  const status = args.status;
  try {
    await mongodb.updateOne({ _id: new ObjectId(id) }, { $set: { status: status, revised: true } });
    return "Set question!";
  } catch (e) {
    console.error(e);
    return "Error setting question";
  }
}

async function setAllTFQuestionsStatus(args) {
  const status = args.status;
  try {
    await mongodb.updateMany({}, { $set: { status: status, revised: true } });
    return "Set questions!";
  } catch (e) {
    console.error(e);
    return "Error setting questions";
  }
}

module.exports = {
  createTFQuestions: createTFQuestions,
  getAllTFQuestions: getAllTFQuestions,
  getTFQuestionById: getTFQuestionById,
  getTFQuestionsByTag: getTFQuestionsByTag,
  setAllTFQuestionsStatus: setAllTFQuestionsStatus,
  setTFQuestionStatusById: setTFQuestionStatusById,
  setTFQuestionsStatusByTag: setTFQuestionsStatusByTag,
  deleteTFQuestion: deleteTFQuestion,
  deleteAllTFQuestions: deleteAllTFQuestions,
  getTFTags: getTFTags,
};
