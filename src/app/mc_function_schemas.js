const {
  createQuestions,
  getTags,
  deleteQuestion,
  deleteAllQuestions,
  setAllQuestionsStatus,
  setQuestionStatusById,
  setQuestionsStatusByTag,
  getAllQuestions,
  getQuestionById,
  getQuestionsByTag,
} = require("./functions.js");

const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];

const availableFunctions = [
  {
    function: createQuestions,
    schema: {
      name: "createQuestions",
      descriptions: "Create a question given a tag, level, and a number",
      parameters: {
        type: "object",
        properties: {
          tag: {
            type: "string",
            description: "The tag of the questions, e.g. Cars",
          },
          level: {
            type: "string",
            enum: levels,
            description: "The level of the questions",
          },
          number: {
            type: "integer",
            description: "The number of questions to be created",
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
      description: "Get the questions given a specific tag",
      parameters: {
        type: "object",
        properties: {
          tag: {
            type: "string",
            description: "The tag of the questions you want to get, e.g. Cars",
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
      description: "Get a question of a particular ID",
      parameters: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description:
              "The ID of the question, e.g. 649e4077b7795297e8c82972",
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
      description: "Get all questions",
      parameters: { type: "object", properties: {} },
    },
  },
  {
    function: getTags,
    schema: {
      name: "getTags",
      description: "Get all tags",
      parameters: { type: "object", properties: {} },
    },
  },

  {
    function: deleteQuestion,
    schema: {
      name: "deleteQuestion",
      description: "Delete a question of a particular ID",
      parameters: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description:
              "The ID of the question, e.g. 649e4077b7795297e8c82972",
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
      description: "Delete all of the questions",
      parameters: { type: "object", properties: {} },
    },
  },
  {
    function: setQuestionsStatusByTag,
    schema: {
      name: "setQuestionsStatusByTag",
      description:
        "Set all questions with a specific tag to either 'approved' or 'denied'.",
      parameters: {
        type: "object",
        properties: {
          tag: {
            type: "string",
            description: "The tag of the questions, e.g. Cars",
          },
          status: {
            type: "string",
            enum: ["approved", "denied"],
            description:
              "The status of the questions, either 'approved' or 'denied'.",
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
        "Set question with a specific ID to either 'approved' or 'denied'.",
      parameters: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description:
              "The ID of the question, e.g. 649e4077b7795297e8c82972",
          },
          status: {
            type: "string",
            enum: ["approved", "denied"],
            description:
              "The status of the questions, either 'approved' or 'denied'.",
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
      description: "Set all questions to either 'approved' or 'denied'.",
      parameters: {
        type: "object",
        properties: {
          status: {
            type: "string",
            enum: ["approved", "denied"],
            description:
              "The status of the questions, either 'approved' or 'denied'.",
          },
        },
      },
      required: ["status"],
    },
  },
];

module.exports = availableFunctions;

// Solid
