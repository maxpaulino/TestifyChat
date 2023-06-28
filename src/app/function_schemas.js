const functions = require("./src/app/functions");

const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];

const availableFunctions = [
  {
    function: functions.createQuestion,
    schema: {
      name: "createQuestion",
      description: "Creates one question given a tag and a level",
      parameters: {
        type: "object",
        properties: {
          tag: {
            type: "string",
            description: "Tag of the question",
          },
          level: {
            type: "string",
            enum: levels,
            description: "Level of the question",
          },
        },
      },
      required: ["tag", "level"],
    },
  },
  {
    function: functions.createQuestions,
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
    function: functions.getQuestionByTag,
    schema: {
      name: "getQuestionByTag",
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
    function: functions.getQuestionById,
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
    function: functions.getAllQuestions,
    schema: {
      name: "getAllQuestions",
      description: "Gets all questions",
      parameters: { type: "object", properties: {} },
    },
  },
  {
    function: functions.deleteQuestion,
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
    function: functions.deleteAllQuestions,
    schema: {
      name: "deleteAllQuestions",
      description: "Deletes all of the questions",
      parameters: { type: "object", properties: {} },
    },
  },
  {
    function: functions.setQuestionsStatusByTag,
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
    function: functions.setQuestionStatusById,
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
    function: functions.setAllQuestionsStatus,
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
    function: functions.displayCommandDescriptions,
    schema: {
      name: "displayCommandDescriptions",
      description: "Display all of the command descriptions",
      parameters: { type: "object", properties: {} },
    },
  },
];

export default availableFunctions;

// Solid
