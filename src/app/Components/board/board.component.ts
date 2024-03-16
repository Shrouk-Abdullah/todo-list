import { Component } from '@angular/core';
import { Task } from '../../Models/task';
import { BoardService } from '../../Services/board.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Board, BoardTitle } from '../../Models/board';
BoardTitle;
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
  providers: [NgbModalConfig, NgbModal],
})
export class BoardComponent {
  boards: Board[] = [];
  newTaskTitle: string = '';
  selectedBoard!: string;
  discription!: string;
  taskId!: number;
  lastEditTimestamp: Date | null = null;
  diffHours!: any;
  task!: Task;
  modalTitle: any;
  taskTitle!: string;
  isEditing: any;
  status!: boolean;
  getClassForBoard(boardTitle: BoardTitle): string {
    switch (boardTitle) {
      case BoardTitle.MUST_DO:
        return 'must-do';
      case BoardTitle.SHOULD_DO:
        return 'should-do';
      case BoardTitle.IF_I_HAVE_TIME:
        return 'if-i-have-time';
      default:
        return '';
    }
  }
  open(content: any, task: Task) {
    console.log(task);
    if (task) {
      this.taskTitle = task.title;
      this.discription = task.discription;
      this.status = task.status;
      this.isEditing = true;
      this.taskId = task.id;
    } else {
      this.taskTitle = '';
      this.discription = '';
      this.isEditing = false;
    }
    this.modalService.open(content);
  }
  constructor(
    public boardService: BoardService,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    this.boards = this.boardService.getAllBoards();

    if (typeof window !== 'undefined') {
      this.diffHours = localStorage.getItem('last edit');
    }
  }
  getBoard(title: string) {
    this.boardService.getBoardByTitle(title);
  }
  addTask(title: any, discription: any, selectedBoard: string): void {
    this.selectedBoard = selectedBoard;
    if (this.selectedBoard) {
      console.log(this.selectedBoard);
      this.boardService.addTaskToBoard(this.selectedBoard, {
        title,
        discription,
        status: this.status,
      });
    }
    this.boardService.updateLastEditTimestamp();
  }
  removeTask(selectedBoard: BoardTitle, taskId: number): void {
    if (selectedBoard) {
      this.boardService.removeTaskFromBoard(selectedBoard, taskId);
    }
    this.boardService.updateLastEditTimestamp();
  }

  updateTask(title: string) {
    this.boardService.editTaskFromBoard(title, this.taskId, {
      title: this.taskTitle,
      discription: this.discription,
      status: this.status,
    });
    this.boardService.updateLastEditTimestamp();
  }
  toggleTaskStatus(task: Task, boardTitle: BoardTitle) {
    task.status = !task.status;
    this.boardService.editTaskFromBoard(boardTitle, this.taskId, task);
    this.boardService.updateLastEditTimestamp();
  }
  deleteAllTasks(title: string) {
    this.boardService.removeAllTaskFromBoard(title);
  }
}
