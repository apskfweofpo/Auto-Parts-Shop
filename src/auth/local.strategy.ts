import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from '@nestjs/passport'
import {AuthService} from "./auth.service";

@Injectable()
export class LocalStrategy implements PassportStrategy {
    constructor(private authService: AuthService) {
    }

    async validate(username: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(
            username.toLowerCase(),
            password
        )

        if (!user) {
            throw new UnauthorizedException()
        }

        return user;
    }
}