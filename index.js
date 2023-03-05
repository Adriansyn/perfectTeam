// packages needed for this application
const inquirer = require('inquirer')
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const Manager = require('./lib/Manager')
const Engineer = require('./lib/Engineer')
const Intern = require('./lib/Intern')
const generateLayout = require('./src/generateHtml')
const teamMembers = []
//array of questions for user input
const manager = [
  {
    type: 'input',
    name: 'managerName',
    message: 'Enter Team Manager Name:'
  },
  {
    type: 'input',
    name: 'employeeId',
    message: 'Enter Employee ID:'
  },
  {
    type: 'input',
    name: 'email',
    message: 'Enter Employee Email Address:'
  },
  {
    type: 'input',
    name: 'officeNumber',
    message: 'Enter Employee Office Number'
  },
];

const engineer = [
  {
    type: 'input',
    name: 'engineerName',
    message: 'Enter Engineer Name:'
  },
  {
    type: 'input',
    name: 'employeeId',
    message: 'Enter Employee ID:'
  },
  {
    type: 'input',
    name: 'email',
    message: 'Enter Employee Email Address:'
  },
  {
    type: 'input',
    name: 'githubUsername',
    message: 'Enter Employee GitHub Username'
  },
  {
    type: 'list',
    name: 'continue',
    message: 'Do you want to add another Employee',
    choices: ["Yes", "No"]
  },
];

const intern = [
  {
    type: 'input',
    name: 'internName',
    message: 'Enter Intern Name:'
  },
  {
    type: 'input',
    name: 'employeeId',
    message: 'Enter Intern ID:'
  },
  {
    type: 'input',
    name: 'email',
    message: 'Enter Employee Email Address:'
  },
  {
    type: 'input',
    name: 'school',
    message: 'Enter Intern School:'
  },
  {
    type: 'list',
    name: 'continue',
    message: 'Do you want to add another Employee',
    choices: ["Yes", "No"]
  },
];

const employeeType = [
  {
    type: 'list',
    name: 'employeeType',
    message: 'Select Employee type:',
    choices: ["Engineer", "Intern"],
    loop: true
  },
];
const employees = []

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err) throw err;
  });
}

// TODO: Create a function to initialize app

function init() {
  let continueAdding = "Yes"
  inquirer.prompt(manager).then(async managerAnswers => {
    const managerObject = new Manager(managerAnswers.managerName, managerAnswers.employeeId, managerAnswers.email, managerAnswers.officeNumber)
    employees.push(managerObject)
    do {
      const employeeTypeAnswer = await inquirer.prompt(employeeType);
      const questionsToAsk = employeeTypeAnswer.employeeType == "Engineer" ? engineer : intern
      let employeeTypeObject
      const employeeAnswers = await inquirer.prompt(questionsToAsk)
      if (employeeTypeAnswer.employeeType == "Engineer") {
        employeeTypeObject = new Engineer(employeeAnswers.engineerName, employeeAnswers.employeeId, employeeAnswers.email, employeeAnswers.githubUsername)

      } else {
        employeeTypeObject = new Intern(employeeAnswers.internName, employeeAnswers.employeeId, employeeAnswers.email, employeeAnswers.school)

      }
      employees.push(employeeTypeObject)
      continueAdding = employeeAnswers.continue

    } while (continueAdding == "Yes")
    const generatedHtml = generateLayout(employees)
    generateHtmlFile(generatedHtml)
  })
}

async function generateHtmlFile(html) {
  const writeFile = promisify(fs.writeFile);
  await writeFile(path.join(__dirname, 'index.html'), html);

}
// Function call to initialize app
init();
