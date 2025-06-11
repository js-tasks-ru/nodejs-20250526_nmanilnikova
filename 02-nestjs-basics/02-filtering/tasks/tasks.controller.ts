import { Controller, Get, Query } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { QueryDto, TaskStatus } from "./task.model";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query() query?: QueryDto,
  ) {
    return this.tasksService.getFilteredTasks(query?.status, query?.page, query?.limit);
  }
}
