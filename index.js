const dialogflow = require('dialogflow');
const uuid = require('uuid');
require('dotenv').config();
 
/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function runSample(projectId = 'chatter-e16e5') {
  // A unique identifier for the given session
  const sessionId = uuid.v4();
  
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
  console.log('REQUEST ++++');
  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: 'hello',
        // The language used by the client (en-US)
        languageCode: 'en-US',
      },
    },
  };
 
  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log('Detected intent');
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log(`  No intent matched.`);
  }
}

runSample()