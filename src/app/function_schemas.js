const {
  createQuestions,
  deleteQuestion,
  deleteAllQuestions,
  setAllQuestionsStatus,
  setQuestionStatusById,
  setQuestionsStatusByTag,
  getAllQuestions,
  getQuestionById,
  getQuestionsByTag,
  displayCommandDescriptions,
} = require("./functions.js");

const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];

const availableFunctions = [
  {
    function: createQuestions,
    schema: {
      name: "createQuestions",
      descriptions: "Creates questions given a tag and a level",
      parameters: {
        type: "object",
        properties: {
          tag: {
            type: "string",
            description: "Tag of the questions",
          },
          level: {
            type: "string",
            enum: levels,
            description: "Level of the questions",
          },
          number: {
            type: "integer",
            description: "Number of questions to be created",
          },
        },
      },
      required: ["tag", "level", "number"],
    },
  },
  {
    function: getQuestionsByTag,
    schema: {
      name: "getQuestionsByTag",
      description: "Gets all of the questions given a specific tag",
      parameters: {
        type: "object",
        properties: {
          tag: {
            type: "string",
            description: "Tag of the questions you want to get",
          },
        },
      },
      required: ["tag"],
    },
  },
  {
    function: getQuestionById,
    schema: {
      name: "getQuestionById",
      description: "Gets a question of a particular ID",
      parameters: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "ID of the question",
          },
        },
      },
      required: ["id"],
    },
  },
  {
    function: getAllQuestions,
    schema: {
      name: "getAllQuestions",
      description: "Gets all questions",
      parameters: { type: "object", properties: {} },
    },
  },
  {
    function: deleteQuestion,
    schema: {
      name: "deleteQuestion",
      description: "Deletes a question of a particular ID",
      parameters: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "ID of the question",
          },
        },
      },
      required: ["id"],
    },
  },
  {
    function: deleteAllQuestions,
    schema: {
      name: "deleteAllQuestions",
      description: "Deletes all of the questions",
      parameters: { type: "object", properties: {} },
    },
  },
  {
    function: setQuestionsStatusByTag,
    schema: {
      name: "setQuestionsStatusByTag",
      description:
        "Sets all questions with a specific tag to either 'approved' or 'denied'.",
      parameters: {
        type: "object",
        properties: {
          tag: {
            type: "string",
            description: "Tag of the questions",
          },
          status: {
            type: "string",
            enum: ["approved", "denied"],
            description: "Status of the questions",
          },
        },
      },
      required: ["status", "tag"],
    },
  },
  {
    function: setQuestionStatusById,
    schema: {
      name: "setQuestionStatusById",
      description:
        "Sets question with a specific ID to either 'approved' or 'denied'.",
      parameters: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "ID of the question",
          },
          status: {
            type: "string",
            enum: ["approved", "denied"],
            description: "Status of the questions",
          },
        },
      },
      required: ["status", "id"],
    },
  },
  {
    function: setAllQuestionsStatus,
    schema: {
      name: "setAllQuestionsStatus",
      description: "Sets all questions to either 'approved' or 'denied'.",
      parameters: {
        type: "object",
        properties: {
          status: {
            type: "string",
            enum: ["approved", "denied"],
            description: "Status of the questions",
          },
        },
      },
      required: ["status"],
    },
  },
  {
    function: displayCommandDescriptions,
    schema: {
      name: "displayCommandDescriptions",
      description: "Display all of the command descriptions",
      parameters: { type: "object", properties: {} },
    },
  },
];

module.exports = availableFunctions;

// Solid
