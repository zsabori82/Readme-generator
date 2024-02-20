const fs = require("fs").promises;
const path = require('path');

async function init() {
  // Use dynamic import for inquirer
  const { default: inquirer } = await import('inquirer');

  // array of questions for user
  const questions = [
    {
      type: 'input',
      name: 'github',
      message: 'What is your GitHub username?:',
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is your email address?:',
    },
    {
      type: 'input',
      name: 'title',
      message: 'Enter the project title:',
    },
    {
      type: 'input',
      name: 'project description',
      message: 'Please provide a short description about your project:',
    },
    {
      type: 'list',
      name: 'license',
      message: 'Choose a license for your project:',
      choices: ['MIT', 'Apache-2.0', 'GPL-3.0', 'BSD-3-Clause', 'Other'],
    },
    {
      type: 'input',
      name: 'otherLicense',
      message: 'If you selected "Other" for the license, please specify:',
      when: (answers) => answers.license === 'Other',
    },
    {
      type: 'input',
      name: 'installCommand',
      message: 'What command should be run to install dependencies? (e.g., npm install, nmp test):',
    },
    {
      type: 'input',
      name: 'usageInstructions',
      message: 'What are the usage instructions for your project?:',
    },
    {
      type: 'input',
      name: 'contributionGuidelines',
      message: 'What are the contribution guidelines for your project?:',
    },
    {
      type: 'input',
      name: 'testInstructions',
      message: 'What command should be run to run tests? (e.g., npm test):',
    },
  ];

  // Prompt the user for input
  const answers = await inquirer.prompt(questions);

  // License badge URL based on the selected license
  const licenseBadge = (answers.license === 'Other')
    ? `https://img.shields.io/badge/License-${encodeURIComponent(answers.otherLicense)}-blue.svg`
    : `https://img.shields.io/badge/License-${encodeURIComponent(answers.license)}-blue.svg`;

  // Construct the README content using template literals
  const readmeContent = `
    # ${answers.title}

  ## Description
  ${answers['project description']}

  ## Table of Contents
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Contributing](#contributing)
  - [Tests](#tests)
  - [Questions](#questions)

  ## Installation
  ${answers.installCommand}

  ## Usage
  ${answers.usageInstructions}

  ## License
  This project is licensed under the ${
    (answers.license === 'Other')
      ? answers.otherLicense
      : answers.license
    } License. [![License](${licenseBadge})](LICENSE)

  ## Contributing
  ${answers.contributionGuidelines}

  ## Tests
  ${answers.testInstructions}

  ## Questions
  For questions or feedback, feel free to contact me at ${answers.email}. You can also find me on GitHub: [${answers.github}](https://github.com/${answers.github}).
  `;

  // Write the README file
  try {
    await fs.writeFile('README.md', readmeContent);
    console.log('README.md generated successfully!');
  } catch (error) {
    console.error('Error writing README.md:', error);
  }
}

// function call to initialize program
init();
