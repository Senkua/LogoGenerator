const { SVG, registerWindow } = require('@svgdotjs/svg.js');
const fs = require('fs');
const { createSVGWindow } = require('svgdom');
const inquirer = require('inquirer');

// Create a DOM environment for SVG rendering
const window = createSVGWindow();
const document = window.document;
registerWindow(window, document);

const canvas = SVG(document.documentElement).size(300, 200);

// Prompt for user input using Inquirer
const prompt = inquirer.createPromptModule();

prompt([
  {
    type: 'input',
    name: 'text',
    message: 'Enter the text (up to 3 characters): ',
  },
  {
    type: 'input',
    name: 'textColor',
    message: 'Enter the text color (keyword or hexadecimal): ',
  },
  {
    type: 'list',
    name: 'shape',
    message: 'Choose a shape:',
    choices: ['circle', 'triangle', 'square'],
  },
  {
    type: 'input',
    name: 'shapeColor',
    message: 'Enter the shape color (keyword or hexadecimal): ',
  },
])
  .then((answers) => {
    const { text, textColor, shape, shapeColor } = answers;

    // Set the text attributes
    const textElement = canvas
      .text(text)
      .fill(textColor)
      .font({
        family: 'Arial',
        size: 80,
        anchor: 'middle',
        leading: '1.5em',
        weight: 'bold',
      });

    // Set the shape attributes
    let shapeElement;
    switch (shape) {
      case 'circle':
        shapeElement = canvas.circle(100);
        break;
      case 'triangle':
        shapeElement = canvas.polygon('150,30 75,170 225,170');
        break;
      case 'square':
        shapeElement = canvas.rect(150, 150);
        break;
      default:
        console.log('Invalid shape. Exiting...');
        return;
    }
    shapeElement.fill(shapeColor).stroke({ color: '#000', width: 3 });

    // Get the center coordinates of the shape
    const shapeCenterX = shapeElement.cx();
    const shapeCenterY = shapeElement.cy();

    // Calculate the text position to center it within the shape
    const textBBox = textElement.bbox();
    const textX = shapeCenterX - textBBox.width / 2;
    const textY = shapeCenterY - textBBox.height / 2;

    // Set the text position
    textElement.move(textX, textY);

    // Add the shape and text to the canvas
    canvas.add(shapeElement);
    canvas.add(textElement);

    // Export the SVG to a file
    const svgString = canvas.svg();
    fs.writeFileSync('logo.svg', svgString);

    console.log('Generated logo.svg');
  })
  .catch((error) => {
    console.log('An error occurred:', error);
  });