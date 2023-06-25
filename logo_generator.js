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

    // Set the initial font size for the text
    let fontSize = 70;

    // Set the scaling factor for the font size relative to the shape
    const scalingFactor = 0.6;

    // Set the scaling factor for the font size relative to the shape's width
    const widthScalingFactor = 0.7;

    // Set the scaling factor for the font size in the triangle shape
    const triangleScalingFactor = 0.5;

    // Set the maximum font size based on the shape's dimensions
    let shapeWidth, shapeHeight;
    switch (shape) {
      case 'circle':
        shapeWidth = shapeHeight = 100;
        fontSize *= 1.2;
        break;
      case 'triangle':
        shapeWidth = shapeHeight = 150;
        fontSize *= triangleScalingFactor;
        break;
      case 'square':
        shapeWidth = shapeHeight = 150;
        fontSize *= 1.2;
        break;
      default:
        console.log('Invalid shape. Exiting...');
        return;
    }

    // Calculate the maximum font size that fits within the shape
    while (fontSize > 0) {
      const textElement = canvas
        .text(text)
        .fill(textColor)
        .font({
          family: 'Arial',
          size: fontSize,
          anchor: 'middle',
          leading: '1.5em',
          weight: 'bold',
        });

      const textBBox = textElement.bbox();

      if (
        textBBox.width <= shapeWidth * scalingFactor * widthScalingFactor &&
        textBBox.height <= shapeHeight * scalingFactor
      ) {
        break;
      }

      fontSize--;
    }

    // Set the text attributes with the adjusted font size
    const textElement = canvas
      .text(text)
      .fill(textColor)
      .font({
        family: 'Arial',
        size: fontSize,
        anchor: 'middle',
        leading: '1.5em',
        weight: 'bold',
      });

    // Set the shape attributes
    let shapeElement;
    switch (shape) {
      case 'circle':
        shapeElement = canvas.circle(shapeWidth);
        break;
      case 'triangle':
        shapeElement = canvas.polygon('150,30 75,170 225,170');
        break;
      case 'square':
        shapeElement = canvas.rect(shapeWidth, shapeHeight);
        break;
      default:
        console.log('Invalid shape. Exiting...');
        return;
    }

    shapeElement.fill(shapeColor).move(75, 20);

    // Calculate the position to center the text within the shape
    const shapeCenterX = shapeElement.cx();
    const shapeCenterY = shapeElement.cy();
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