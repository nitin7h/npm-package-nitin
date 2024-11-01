import { spawn } from 'child_process';
import inquirer from 'inquirer';

function runCommand(command, args) {
  const child = spawn(command, args, { stdio: 'inherit', shell: true });

  child.on('close', (code) => {
    if (code !== 0) {
      console.error(`Command failed with exit code ${code}`);
    }
  });
}

// Prompt user to select framework
inquirer
  .prompt([
    {
      type: 'list',
      name: 'framework',
      message: 'Select the framework or tool to initialize:',
      choices: ['Next.js','Vite', 'React','Remix','Gatsby','Expo'],
    },
  ])
  .then((answers) => {
    if (answers.framework === 'Next.js') {
      runCommand('npx', ['create-next-app@latest']);
    }
     else if (answers.framework === 'Vite') {
      runCommand('npx', ['create-vite@latest']);
    }
    else if (answers.framework === 'React') {
      return inquirer.prompt([
        {
          type: 'input',
          name: 'appName',
          message: 'Enter the name for your React application:',
          default: 'my-app', // Optional default value
        },
      ]).then((appNameAnswer) => {
        const appName = appNameAnswer.appName; // Get the app name input from the user
        runCommand('npx', ['create-react-app', appName]); // Create the React app
      })
    }
    else if (answers.framework === 'Remix') {
      runCommand('npx', ['create-remix']); 
    }
    else if (answers.framework === 'Gatsby') {
      runCommand('npx', ['create-gatsby']);     
    }
    else if (answers.framework === 'Expo') {
      runCommand('npx', ['create-expo-app']);    
    }
  })
  .catch((error) => {
    console.error('Error in selection:', error);
  });