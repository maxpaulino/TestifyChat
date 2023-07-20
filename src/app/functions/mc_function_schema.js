const {
  createMCQuestions,
  getMCTags,
  deleteMCQuestion,
  deleteAllMCQuestions,
  setAllMCQuestionsStatus,
  setMCQuestionStatusById,
  setMCQuestionsStatusByTag,
  getAllMCQuestions,
  getMCQuestionById,
  getMCQuestionsByTag,
} = require("./mc_functions.js");

const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];

const availableMCFunctions = [
  {
    function: createMCQuestions,
    schema: {
      name: "createQuestions",
      descriptions: "Create a multiple choice question given a tag, level, and a number",
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
    function: getMCQuestionsByTag,
    schema: {
      name: "getQuestionsByTag",
      description: "Get the multiple choice questions given a specific tag",
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
    function: getMCQuestionById,
    schema: {
      name: "getQuestionById",
      description: "Get a multiple choice question of a particular ID",
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
    function: getAllMCQuestions,
    schema: {
      name: "getAllQuestions",
      description: "Get all multiple choice questions",
      parameters: { type: "object", properties: {} },
    },
  },
  {
    function: getMCTags,
    schema: {
      name: "getTags",
      description: "Get all multiple choice question tags",
      parameters: { type: "object", properties: {} },
    },
  },

  {
    function: deleteMCQuestion,
    schema: {
      name: "deleteQuestion",
      description: "Delete a multiple choice question of a particular ID",
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
    function: deleteAllMCQuestions,
    schema: {
      name: "deleteAllQuestions",
      description: "Delete all of the multiple choice questions",
      parameters: { type: "object", properties: {} },
    },
  },
  {
    function: setMCQuestionsStatusByTag,
    schema: {
      name: "setQuestionsStatusByTag",
      description:
        "Set all multiple choice questions with a specific tag to either 'approved' or 'denied'.",
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
    function: setMCQuestionStatusById,
    schema: {
      name: "setQuestionStatusById",
      description:
        "Set a multiple choie question with a specific ID to either 'approved' or 'denied'.",
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
    function: setAllMCQuestionsStatus,
    schema: {
      name: "setAllQuestionsStatus",
      description: "Set all multiple choice questions to either 'approved' or 'denied'.",
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

module.exports = availableMCFunctions;

// Solid
