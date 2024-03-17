import { Injectable } from '@angular/core';
import { Task } from '../Models/task';
import { Board, BoardTitle } from '../Models/board';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  tasks!: Task[];
  board!: Board[];
  lastEditTimestamp!: Date;
  diffHours!: any;
  constructor() {
    this.board = [
      { title: BoardTitle.MUST_DO, diffHours: '', tasks: [] },
      { title: BoardTitle.SHOULD_DO, diffHours: '', tasks: [] },
      { title: BoardTitle.IF_I_HAVE_TIME, diffHours: '', tasks: [] },
    ];
    if (typeof window !== 'undefined') {
      const storedBoards = localStorage.getItem('boards');
      if (storedBoards) {
        this.board = JSON.parse(storedBoards);
      } else {
        this.storeBoards();
      }
    }
  }
  storeBoards(): void {
    localStorage.setItem('boards', JSON.stringify(this.board));
  }
  getAllBoards(): Board[] {
    return this.board;
  }

  getBoardByTitle(title: string) {
    return this.board.find((board) => board.title === title);
  }

  addTaskToBoard(
    title: BoardTitle,
    diffHours: string,
    task: { title: any; discription: any; status: boolean }
  ): void {
    const board = this.getBoardByTitle(title);
    if (board) {
      board.diffHours = diffHours;
      board.tasks.push({
        id: board.tasks.length + 1,
        title: task.title.value,
        status: task.status || false,
        discription: task.discription.value,
      });
      this.storeBoards();
    }
  }
  removeAllTaskFromBoard(title: string, diffHours: string) {
    const board = this.getBoardByTitle(title);
    if (board) {
      board.diffHours = diffHours;
      board.tasks = [];
      this.storeBoards();
    }
  }
  removeTaskFromBoard(
    title: BoardTitle,
    diffHours: string,
    taskId: number
  ): void {
    const board = this.getBoardByTitle(title);
    if (board) {
      board.diffHours = diffHours;
      board.tasks = board.tasks.filter((task) => task.id !== taskId);
      this.storeBoards();
    }
  }
  editTaskFromBoard(
    title: string,
    taskId: number,
    diffHours: string,
    task: { title: any; discription: any; status: boolean }
  ): void {
    let board = this.getBoardByTitle(title);
    if (board) {
      board.diffHours = diffHours;
      const taskIndex = board.tasks.findIndex((task) => task.id! === taskId);
      console.log(board);

      if (taskIndex !== -1) {
        const updatedTask: Task = {
          id: taskId,
          title: task.title,
          status: task.status,
          discription: task.discription,
        };
        board.tasks[taskIndex] = updatedTask;
      }
      this.storeBoards();
    }
  }
  updateLastEditTimestamp() {
    this.lastEditTimestamp = new Date();
    const now = new Date();
    const diffMs = now.getTime() - this.lastEditTimestamp.getTime();
    this.diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (this.diffHours === 0) {
      return (this.diffHours = 'Less than an hour ago');
    } else if (this.diffHours === 1) {
      return (this.diffHours = '1 hour ago');
    } else {
      return `${this.diffHours} hours ago`;
    }
  }
}
