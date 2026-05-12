import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class Product{
    @PrimaryGeneratedColumn()
  id!: number;
  @Column("varchar")
  name!: string;
  @Column("int")
  quantity!: number;
  @Column("decimal", {precision:10, scale: 2})
  price!: number;
}