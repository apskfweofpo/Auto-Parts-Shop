import {
    Body,
    Controller,
    Header,
    HttpCode,
    HttpStatus,
    Post,
    Request, UseGuards
} from '@nestjs/common';
import {UsersService} from "./users.service";
import {HTTP_CODE_METADATA} from "@nestjs/common/constants";
import {constants} from "http2";
import {CreateUserDto} from "./dto/createUserDto";
import {LocalAuthGuard} from "../auth/local.auth.guard";

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {
    }

    @Post('/signup')
    @HttpCode(HttpStatus.CREATED)
    @Header('Content-type', 'application/json')
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }


    @Post('/login')
    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Header('Content-type', 'application/json')
    login(@Request() req) {
        return {user: req.user, msg: 'Logged in'};
    }
}
