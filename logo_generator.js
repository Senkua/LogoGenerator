const readline = require('readline');
const fs = require('fs');
const svg2png = require('svg2png');
const svgpath = require('svgpath');
const { createCanvas } = require('canvas');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function generateLogo() {
  rl.question('Enter up to three characters for the logo: ', (text) => {
    rl.question('Enter the text color (keyword or hexadecimal number): ', (textColor) => {
      const shapes = ['circle', 'triangle', 'square'];
      console.log('Choose a shape:');
      shapes.forEach((shape, index) => {
        console.log(`${index + 1}. ${shape}`);
      });
      rl.question('Enter the number corresponding to the desired shape: ', (shapeChoice) => {
        const shape = shapes[shapeChoice - 1];
        rl.question('Enter the shape color (keyword or hexadecimal number): ', (shapeColor) => {
          const canvas = createCanvas(300, 200);
          const ctx = canvas.getContext('2d');
          ctx.fillStyle = shapeColor;
          ctx.fillRect(0, 0, 300, 200);
          ctx.fillStyle = textColor;
          
          if (shape === 'circle') {
            ctx.beginPath();
            ctx.arc(150, 100, 50, 0, 2 * Math.PI);
            ctx.fill();
          } else if (shape === 'triangle') {
            ctx.beginPath();
            ctx.moveTo(100, 100);
            ctx.lineTo(200, 100);
            ctx.lineTo(150, 25);
            ctx.closePath();
            ctx.fill();
          } else if (shape === 'square') {
            ctx.fillRect(100, 50, 100, 100);
          }
          
          ctx.fillStyle = 'white';
          ctx.font = '50px sans-serif';
          ctx.fillText(text, 135, 130);
          
          const svg = svgpath(canvas.toBuffer().toString('utf-8'))
            .scale(1, -1)
            .translate(0, -200)
            .toString();
          
          fs.writeFileSync('logo.svg', svg);
          svg2png.sync('logo.svg', 'logo.png');
          
          console.log('Generated logo.svg');
          rl.close();
        });
      });
    });
  });
}

generateLogo();