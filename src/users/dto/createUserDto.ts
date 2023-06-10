import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example: 'Ivan'})
    @IsNotEmpty()
    readonly username: string

    @ApiProperty({example: 'Ivan@gmail.ru'})
    @IsNotEmpty()
    readonly email: string

    @ApiProperty({example: '12345'})
    @IsNotEmpty()
    readonly password: string

}