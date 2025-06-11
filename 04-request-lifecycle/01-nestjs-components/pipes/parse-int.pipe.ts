import { PipeTransform, Injectable, BadRequestException, ArgumentMetadata } from "@nestjs/common";

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException(`"${value}" не является числом`);
    }
    return val;
  }
}
