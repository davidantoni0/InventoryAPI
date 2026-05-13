import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class Product{
    @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar")
  @IsNotEmpty({})
  @IsString({})
  name!: string;

  @Column("int")
  @IsNotEmpty({})
  @IsNumber()
  @Min(0, {})
  quantity!: number;
  
  @Column("decimal", {precision:10, scale: 2})
  @IsNotEmpty({})
  @IsNumber()
  @Min(0, {})
  price!: number;
}