const { SVG, registerWindow } = require('@svgdotjs/svg.js');
const fs = require('fs');
const { createSVGWindow } = require('svgdom');

// Create a DOM environment for SVG rendering
const window = createSVGWindow();
const document = window.document;
registerWindow(window, document);

const canvas = SVG(document.documentElement).size(300, 200);

const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the text (up to 3 characters): ', (text) => {
  rl.question('Enter the text color (keyword or hexadecimal): ', (textColor) => {
    rl.question('Choose a shape (circle, triangle, square): ', (shape) => {
      rl.question('Enter the shape color (keyword or hexadecimal): ', (shapeColor) => {
        rl.close();

        // Set the text attributes
        const textElement = canvas.text(text).move(50, 100).fill(textColor);

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
        shapeElement.move(75, 25).fill(shapeColor);

        // Add the text and shape to the canvas
        canvas.add(textElement);
        canvas.add(shapeElement);

        // Export the SVG to a file
        const svgString = canvas.svg();
        fs.writeFileSync('logo.svg', svgString);

        console.log('Generated logo.svg');
      });
    });
  });
});