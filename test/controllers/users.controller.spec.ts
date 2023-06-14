import {INestApplication} from "@nestjs/common";
import {Test, TestingModule} from "@nestjs/testing";
import {SequelizeModule} from "@nestjs/sequelize";
import {ConfigModule} from "@nestjs/config";
import {SequelizeConfigService} from "../../src/config/sequelizeConfig.service";
import {databaseConfig} from "../../src/config/configuration";
import {UsersModule} from "../../src/users/users.module";
import {User} from "../../src/users/users.model";
import * as bcrypt from "bcrypt";
import * as request from "supertest";



describe('Users controller', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const testModule: TestingModule = await Test.createTestingModule({
            imports: [SequelizeModule.forRootAsync({
                imports: [ConfigModule],
                useClass: SequelizeConfigService
            }),
                ConfigModule.forRoot({
                    load: [databaseConfig]
                }),
                UsersModule
            ]
        }).compile();

        app = testModule.createNestApplication();
        await app.init();
    })


    afterEach(async () => {
        await User.destroy({where: {username: 'Test'}})
    })

    it('Should create user', async () => {

        const newUser = {
            username: 'test',
            email: "test@gmail.com",
            password: '12345'
        }

        const response = await request(app.getHttpServer())
            .post('/users/signup')
            .send(newUser);

        const passwordIsValid = await bcrypt.compare(
            newUser.password,
            response.body.password,
        );

        expect(response.body.username).toBe(newUser.username);
        expect(passwordIsValid).toBe(true);
        expect(response.body.email).toBe(newUser.email);

    })
})