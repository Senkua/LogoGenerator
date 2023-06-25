# Logo Generator

The Logo Generator is a command-line application that allows users to generate custom logos. It prompts the user for text, colors, and shapes, and generates an SVG file as the output.

## Description

- My motivation for this project was to make a solution for obtaining a logo.
- I built this project so I could further my understanding and learning of Node and using new dependencies and such.
- It will generate a logo for you based on your requirements, you may chose the color of the text, the shape and the color of theshape as well.
- I learnt more about inquirer in node and about Jester for testing purposes! 

## Table of Contents (Optional)

If your README is long, add a table of contents to make it easy for users to find what they need.

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:

   git clone https://github.com/Senkua/LogoGenerator.git

   2. Navigate to the project directory

   3. Install the required dependencies using npm install (dependency here)

## Usage

Run the application: node logo_generator.js

Follow the prompts to enter the text, text color, shape, and shape color for your logo.

Once all the prompts are answered, an SVG file named logo.svg will be generated in the project directory.

Open logo.svg in a web browser to view the generated logo.

Below is a video walkthrough demonstrating the usage and a test with all 3 shapes.
https://www.youtube.com/watch?v=Ji7OuZwH6M8


## Dependencies

The Logo Generator application relies on the following dependencies:

svgdom: ^3.0.0
@svgdotjs/svg.js: ^4.0.0
inquirer: ^8.1.2
color: ^4.1.3
Make sure to install these dependencies using the provided installation instructions.

## Credits 

I used https://openai.com/blog/chatgpt as a tool to help me with the formatting/commenting for my project.

I used https://nodejs.org/en as the main code structure for my project.

I watched the guide video https://www.youtube.com/watch?v=GJYMcLus3v0 to get started with the project.

And lastly I used the video https://www.youtube.com/watch?v=FgnxcUQ5vho to learn how to test the application with jest.

## Contributing

Contributions are welcome! If you encounter any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

