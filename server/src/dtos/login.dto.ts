import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDTO {
  @IsNotEmpty()
  @IsEmail({ message: "Not a valid email address" })
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
