const core = require('@actions/core');
const github = require('@actions/github');

try {
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}! This is my custom action.`);
  console.log(`Triggered by: ${github.context.actor}`);
  console.log(`Event: ${github.context.eventName}`);

  const time = new Date().toTimeString();
  core.setOutput('time', time);
} catch (error) {
  core.setFailed(error.message);
}