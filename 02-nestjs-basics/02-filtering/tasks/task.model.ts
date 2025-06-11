import { IsString, IsNotEmpty, IsIn, IsNumber, } from "class-validator";

export enum TaskStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
}

export class Task {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsIn(Object.values(TaskStatus))
  status: TaskStatus;
}

export class QueryDto {
  @IsString()
  sortBy: string;

  @IsString()
  @IsIn(Object.values(TaskStatus))
  status: TaskStatus;

  @IsNumber()
  limit: number;

  @IsNumber()
  page: number;
}
