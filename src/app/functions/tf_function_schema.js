const {
  createTFQuestions,
  getTFTags,
  deleteTFQuestion,
  deleteAllTFQuestions,
  setAllTFQuestionsStatus,
  setTFQuestionStatusById,
  setTFQuestionsStatusByTag,
  getAllTFQuestions,
  getTFQuestionById,
  getTFQuestionsByTag,
} = require("./tf_functions.js");

const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];

const availableTFFunctions = [
  {
    function: createTFQuestions,
    schema: {
      name: "createTFQuestions",
      descriptions: "Create a true or false question given a tag, level, and a number",
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
    function: getTFQuestionsByTag,
    schema: {
      name: "getTFQuestionsByTag",
      description: "Get the true or false questions given a specific tag",
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
    function: getTFQuestionById,
    schema: {
      name: "getTFQuestionById",
      description: "Get a true or false question of a particular ID",
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
    function: getAllTFQuestions,
    schema: {
      name: "getAllTFQuestions",
      description: "Get all true or false questions",
      parameters: { type: "object", properties: {} },
    },
  },
  {
    function: getTFTags,
    schema: {
      name: "getTFTags",
      description: "Get all true or false question tags",
      parameters: { type: "object", properties: {} },
    },
  },

  {
    function: deleteTFQuestion,
    schema: {
      name: "deleteTFQuestion",
      description: "Delete a true or false question of a particular ID",
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
    function: deleteAllTFQuestions,
    schema: {
      name: "deleteAllTFQuestions",
      description: "Delete all of the true or false questions",
      parameters: { type: "object", properties: {} },
    },
  },
  {
    function: setTFQuestionsStatusByTag,
    schema: {
      name: "setTFQuestionsStatusByTag",
      description:
        "Set all true or false questions with a specific tag to either 'approved' or 'denied'.",
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
    function: setTFQuestionStatusById,
    schema: {
      name: "setTFQuestionStatusById",
      description:
        "Set a true or false question with a specific ID to either 'approved' or 'denied'.",
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
    function: setAllTFQuestionsStatus,
    schema: {
      name: "setAllTFQuestionsStatus",
      description: "Set all true or false questions to either 'approved' or 'denied'.",
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

module.exports = availableTFFunctions;

// Solid
