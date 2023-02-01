import { IsEmail, IsNotEmpty, IsString, ValidateIf } from "class-validator";

export class QuestionDTO {
  @IsString()
  @ValidateIf((obj) => obj.name !== undefined)
  name?: string;

  @IsNotEmpty()
  @IsEmail()
  contactEmail: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  isAnswered?: boolean;

  constructor(
    name: string,
    contactEmail: string,
    text: string,
    isAnswered: boolean = false
  ) {
    this.name = name;
    this.contactEmail = contactEmail;
    this.text = text;
    this.isAnswered = isAnswered;
  }
}
