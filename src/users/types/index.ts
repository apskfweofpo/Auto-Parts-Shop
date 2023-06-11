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
                userId: "2",
                username: "Ivan",
                password: "12345",
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


export class LogoutUserResponse {
    @ApiProperty({example: 'session has ended'})
    msg: string;
}

export class LoginCheckResponse {
    @ApiProperty({example: '1'})
    userId: string;

    @ApiProperty({example: 'Ivan'})
    username: string;

    @ApiProperty({example: 'Ivan@gmail.ru'})
    email: string;
}

export class SignupResponse {
    @ApiProperty({example: '3'})
    id: string;

    @ApiProperty({example: 'Ivan'})
    username: string;

    @ApiProperty({example: 'Ivan@gmail.ru'})
    email: string;

    @ApiProperty({example: '$2b$04$wNtlqNWz5vj3qb0hcfVWS.ySV5di0cNfQ/naU9wzFFHtPlCcVXHvi'})
    password: string;

    @ApiProperty({example: '2023-06-10T22:03:41.919Z'})
    updatedAt: string;

    @ApiProperty({example: '2023-06-10T22:03:41.919Z'})
    createdAt: string;
}