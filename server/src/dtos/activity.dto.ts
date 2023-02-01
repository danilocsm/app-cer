import { Difficulty } from "@prisma/client";
import {
  IsBase64,
  IsNotEmpty,
  IsString,
  MaxLength,
  ValidateIf,
} from "class-validator";

export class ActivityDTO {
  @MaxLength(50)
  @IsNotEmpty()
  @IsString()
  name: string;

  @MaxLength(255, { message: "Description can only contain 255 characters" })
  @IsNotEmpty()
  @IsString()
  description: string;

  @MaxLength(255, { message: "Observations can only contain 255 characters" })
  @IsNotEmpty()
  @IsString()
  observations: string;

  @IsNotEmpty()
  @IsString()
  difficulty: Difficulty;

  @MaxLength(100)
  @IsNotEmpty()
  @IsString({ each: true })
  illnesses: string;

  @ValidateIf((obj) => obj.image != undefined)
  @IsString()
  @IsBase64()
  image?: string;

  @ValidateIf((obj) => obj.activitiesId !== undefined)
  @IsString({ each: true })
  itemsId?: string[];

  constructor(
    name: string,
    description: string,
    observations: string,
    difficulty: Difficulty,
    illnesses: string,
    image: string,
    itemsId: string[]
  ) {
    this.name = name;
    this.description = description;
    this.observations = observations;
    this.difficulty = difficulty;
    this.illnesses = illnesses;
    this.itemsId = itemsId;
    this.image = image;
  }
}
