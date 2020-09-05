const dialogflow = require('dialogflow');
const uuid = require('uuid');
require('dotenv').config();
 
/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
const runSample = async function(projectId = 'chatter-e16e5') {
  // A unique identifier for the given session
  const sessionId = uuid.v4();
  console.log("+++++");
  let config = {
    credentials: {
        private_key: process.env.PRIVATE_KEY,
        client_email: process.env.CLIENT_EMAIL
    }
  }
  // Create a new session
  const sessionClient = new dialogflow.SessionsClient({
    keyFilename: 'key.json'
  });
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);
  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: 'Who is BM',
        // The language used by the client (en-US)
        languageCode: 'en-US',
      },
    },
  };
  var result;
  console.cl
  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log('Detected intent');
  result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log(`  No intent matched.`);
  }
  return result;
}

module.exports = {
  runSample
}