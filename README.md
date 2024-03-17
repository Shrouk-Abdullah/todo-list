# Todo List Web App

Welcome to the Todo List Web App! This application helps you organize your tasks across different boards.

## Deployed Version

You can access the deployed version of this application at [https://todo-list.com](https://todo-list-iota-amber.vercel.app/)

## Technologies Used

- Frontend: Angular, Material-UI (MUI), ng-bootstrap, Bootstrap, HTML, SCCS

### Features

- Create Tasks: Easily add new tasks with titles, descriptions, deadlines, and priorities.
- Update Tasks: Edit task details such as title, description, deadline, and priority.
- Mark as Completed: Check off tasks as you complete them to keep track of your progress.
- Delete Tasks: Remove tasks that are no longer needed.
- Responsive Design: Works seamlessly across different devices and screen sizes.

### `BoardService`

This service provides functionality to manage boards and tasks within the application. It handles local storage operations and task management functionalities.

#### Methods

- `getAllBoards()`: Retrieves all boards.
- `getBoardByTitle(title)`: Retrieves a board by its title.
- `addTaskToBoard(title, diffHours, task)`: Adds a task to a specified board.
- `editTaskFromBoard(title, taskId, diffHours, task)`: Edits a specific task in a specified board.
- `removeAllTaskFromBoard(title, diffHours)`: Removes all tasks from a specified board.
- `removeTaskFromBoard(title, diffHours, taskId)`: Removes a specific task from a specified board.
- `storeBoards()`: Saves the current state of the boards to local storage.
- `updateLastEditTimestamp()`: Updates the last edit timestamp and calculates the difference in hours since the last edit.

## Getting Started

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
