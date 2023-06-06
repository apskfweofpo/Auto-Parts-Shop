import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./users.model";
import {createUserDto} from "./dto/createuserDto";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
    ) {
    }

    findOne(filter: {
        where: { id?: string; username?: string; email?: string }
    }): Promise<User> {
        return this.userModel.findOne({...filter})
    }

    async create(createUserDto: createUserDto): Promise<User | { warningMessage: string }> {
        const user = new User();
        const existingUserByName = await this.findOne({
            where: {username: createUserDto.username },
        })

        const existingUserByEmail = await this.findOne({
            where: {username: createUserDto.email },
        })

        if (existingUserByEmail) {
            return {warningMessage: 'Пользователь с таким email существует'}
        }
        if (existingUserByName) {
            return {warningMessage: 'Пользователь с таким username существует'}
        }
    }

}
