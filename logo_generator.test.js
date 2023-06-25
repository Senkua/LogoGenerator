// logo_generator.test.js

// Import the necessary modules and functions
const { generateLogo } = require('./logo_generator');

// Example test cases
describe('Logo Generator', () => {
  it('should generate a logo with given text and colors', () => {
    // Mock user input
    const userInput = {
      text: 'Logo',
      textColor: 'blue',
      shape: 'circle',
      shapeColor: 'red',
    };

    // Call the generateLogo function
    const result = generateLogo(userInput);

    // Assert the output
    expect(result).toEqual(expect.stringContaining('<svg'));
    expect(result).toEqual(expect.stringContaining('Logo'));
    expect(result).toEqual(expect.stringContaining('blue'));
    expect(result).toEqual(expect.stringContaining('circle'));
    expect(result).toEqual(expect.stringContaining('red'));
  });

  it('should handle invalid shape input', () => {
    // Mock user input with an invalid shape
    const userInput = {
      text: 'Logo',
      textColor: 'blue',
      shape: 'rectangle',
      shapeColor: 'red',
    };

    // Call the generateLogo function
    const result = generateLogo(userInput);

    // Assert the output
    expect(result).toEqual('Invalid shape. Please choose a valid shape (circle, triangle, or square).');
  });

  it('should handle missing required inputs', () => {
    // Mock user input with missing shape input
    const userInput = {
      text: 'Logo',
      textColor: 'blue',
      shapeColor: 'red',
    };

    // Call the generateLogo function
    const result = generateLogo(userInput);

    // Assert the output
    expect(result).toEqual('Missing required input. Please provide text, text color, shape, and shape color.');
  });
});