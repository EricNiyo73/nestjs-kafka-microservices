import { IsString } from 'class-validator';

export class CreatetodoDTO {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  Time: string;
}
