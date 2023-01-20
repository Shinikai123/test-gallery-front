import { Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({name: "nickname"})
  nickname: string;

  @Column()
  email: string;

  @Column()
  password: string;
};