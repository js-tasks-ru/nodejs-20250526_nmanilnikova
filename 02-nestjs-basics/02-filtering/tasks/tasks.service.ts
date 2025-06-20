import { BadRequestException, Injectable } from "@nestjs/common";
import { Task, TaskStatus } from "./task.model";

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: "1",
      title: "Task 1",
      description: "First task",
      status: TaskStatus.PENDING,
    },
    {
      id: "2",
      title: "Task 2",
      description: "Second task",
      status: TaskStatus.IN_PROGRESS,
    },
    {
      id: "3",
      title: "Task 3",
      description: "Third task",
      status: TaskStatus.COMPLETED,
    },
    {
      id: "4",
      title: "Task 4",
      description: "Fourth task",
      status: TaskStatus.PENDING,
    },
    {
      id: "5",
      title: "Task 5",
      description: "Fifth task",
      status: TaskStatus.IN_PROGRESS,
    },
  ];

  getFilteredTasks(
    status?: TaskStatus,
    page?: number,
    limit?: number,
  ): Task[] {
    let modifiedList: Task[] = this.tasks

    if (status) {
      modifiedList = modifiedList.filter((task) => task.status === status)
    }

    if (page && limit) {
      if (page < 0 || limit < 0) {
        throw new BadRequestException('Something bad happened', {
          cause: new Error(),
          description: 'Value should not be negative',
        });
      }

      modifiedList = modifiedList.slice(limit * page - limit, page * limit)
    }

    return modifiedList;
  }
}
