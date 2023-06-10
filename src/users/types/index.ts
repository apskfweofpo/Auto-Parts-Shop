import {ApiProperty} from "@nestjs/swagger";

export class LoginUserRequest {
    @ApiProperty({example: 'Ivan'})
    username: string;

    @ApiProperty({example: '12345'})
    password: string;
}

export class LoginUserResponse {
    @ApiProperty({
        example: {
            user: {
                userId: "1",
                username: "Ivan",
                password: "12345",
            },
        },
    })
    user: {
        userId: number;
        username: string;
        password: string;
    };

    @ApiProperty({example: 'Log In'})
    msg: string;
}



