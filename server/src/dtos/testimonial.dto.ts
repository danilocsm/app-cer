import { IsNotEmpty, IsString, ValidateIf } from "class-validator";

export class TestimonialDTO {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  @ValidateIf((obj) => obj.name !== undefined)
  author?: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  constructor(text: string, author: string, subject: string) {
    this.text = text;
    this.author = author;
    this.subject = subject;
  }
}
