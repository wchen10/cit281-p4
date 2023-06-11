const fastify = require("fastify")();

const {data} = require('./p4-data.js');

function getQuestions() {
    return data.map(obj => obj.question);
  }
  
function getAnswers() {
    return data.map(obj => obj.answer);
  }
  
function getQuestionsAnswers() {
    return JSON.parse(JSON.stringify(data)); 
  }
  
function getQuestion(number = "") {
    const index = number - 1; 
    const questionObj = data[index];
    const errorMessage = questionObj ? '' : `Question ${number} not found`;
  
    return {
      question: questionObj?.question || '',
      number: questionObj ? number : '',
      error: errorMessage
    };
  }
  
function getAnswer(number = "") {
    const index = number - 1; 
    const answerObj = data[index];
    const errorMessage = answerObj ? '' : `Answer ${number} not found`;
  
    return {
      answer: answerObj?.answer || '',
      number: answerObj ? number : '',
      error: errorMessage
    };
  }
  
function getQuestionAnswer(number = "") {
    const index = number - 1; 
    const qaObj = data[index];
    const errorMessage = qaObj ? '' : `Question and answer ${number} not found`;
  
    return {
      question: qaObj?.question || '',
      answer: qaObj?.answer || '',
      number: qaObj ? number : '',
      error: errorMessage
    };
  }

// Get route and JSON/object reply
fastify.get("/cit/question", (request, reply) => {
reply
.code(200)
.header("Content-Type", "application/json; charset=utf-8")
.send(getQuestions);
});

fastify.get("/cit/answer", (request, reply) => {
    console.log(request.params);
    const {id} = request.params
    reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(getAnswer);
});

fastify.post("/cit/questionanswer", (request, reply) => {
    const {first, last} = request.body
    reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(getQuestionsAnswers);
});

fastify.post("/cit/question/:number", (request, reply) => {
    const {first, last} = request.body
    reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(getQuestion(number = ""));
});

fastify.post("/cit/answer/:number", (request, reply) => {
    const {first, last} = request.body
    reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(getAnswer(number = ""));
});

fastify.post("/cit/questionanswer/:number", (request, reply) => {
    const {first, last} = request.body
    reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(getQuestionAnswer(number = ""));
});

fastify.get("*", (request, reply) => {
    reply
    .code(404)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(
    {error: "Route not found" ,"statusCode": 404}
    );
});
// Start server and listen to requests using Fastify
const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
if (err) {
console.log(err);
process.exit(1);
}
console.log(`Server listening on ${address}`);
});
