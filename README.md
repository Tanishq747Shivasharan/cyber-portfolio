# Cyber Portfolio

A browser-based terminal-style portfolio site built with HTML, CSS, and vanilla JavaScript.

## Project Overview

This project simulates a retro terminal interface for showcasing a portfolio and professional profile. It is designed to run entirely in the browser using:
- `index.html` for the terminal UI skeleton
- `css/style.css` for the visual theme and layout
- `js/data.js` for the profile data object
- `js/commands.js` for mapped command responses
- `js/terminal.js` for input handling, command execution, and command history

## File Structure

- `index.html`
  - Main page containing the terminal container and input field.
  - Loads the JavaScript modules and applies CSS styling.
- `css/style.css`
  - Defines the terminal look and feel.
  - Uses a dark background, green text, and window controls.
- `js/data.js`
  - Holds the `profile` object with name, role, and education details.
- `js/commands.js`
  - Defines available commands and template responses.
  - Current commands are: `help`, `about`, `skills`, `projects`, `neofetch`, and `clear`.
- `js/terminal.js`
  - Handles keyboard input, command history navigation, and output rendering.
  - Executes commands and scrolls the terminal body.

## Features

- Terminal-style website interface
- Interactive command input
- Command history with ArrowUp / ArrowDown
- `clear` command to reset output
- `neofetch` command displays ASCII art and profile details

## Available Commands

- `help` — displays the available commands list
- `about` — shows a short personal introduction
- `skills` — lists technical skills
- `projects` — shown in help output but currently not implemented in `js/commands.js`
- `neofetch` — renders ASCII art profile summary
- `clear` — clears the terminal output area

## Notes for Review

- The help command includes `projects`, but the command implementation is missing from `js/commands.js`.
- `index.html` includes a duplicate terminal input section near the bottom of the body, which may be unintended.
- This is a static, front-end-only project with no backend required.

## How to Use

1. Open `index.html` in a browser.
2. Type a command in the prompt.
3. Press `Enter` to execute.
4. Use `ArrowUp` and `ArrowDown` to navigate command history.

## Possible Improvements

- Implement the `projects` command output.
- Remove duplicated HTML input markup.
- Add mobile-responsive styling.
- Expand the portfolio with more commands or dynamic content.
