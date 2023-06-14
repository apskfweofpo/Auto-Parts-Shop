import {INestApplication} from "@nestjs/common";
import {Test, TestingModule} from "@nestjs/testing";
import {SequelizeModule} from "@nestjs/sequelize";
import {ConfigModule} from "@nestjs/config";
import {SequelizeConfigService} from "../../src/config/sequelizeConfig.service";
import {databaseConfig} from "../../src/config/configuration";
import {User} from "../../src/users/users.model";
import * as bcrypt from "bcrypt";
import * as request from "supertest";
import * as session from "express-session";
import * as passport from "passport";
import {AuthModule} from "src/auth/auth.module";
import {BoilerPartsModule} from "src/boiler-parts/boiler-parts.module";

const mockedUser = {
    username: 'Jhon',
    email: "jhon@gmail.com",
    password: 'jhon123'
}

describe('Boiler parts controller', () => {
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
                BoilerPartsModule,
                AuthModule
            ]
        }).compile();

        app = testModule.createNestApplication();

        app.use(
            session({
                secret: 'keyword',
                resave: false,
                saveUninitialized: false,
            }),
        );
        app.use(passport.initialize());
        app.use(passport.session());

        await app.init();
    })
    beforeEach(async () => {
        const user = new User();

        const hashedPassword = await bcrypt.hash(mockedUser.password, 3);

        user.username = mockedUser.username;
        user.email = mockedUser.email;
        user.password = hashedPassword;

        return user.save();
    })

    afterEach(async () => {
        await User.destroy({where: {username: mockedUser.username}})
    })

    it('Should get one part', async () => {

        const login = await request(app.getHttpServer())
            .post('/users/login')
            .send({ username: mockedUser.username, password: mockedUser.password });


        const response = await request(app.getHttpServer())
            .get('/boiler-parts/find/1')
            .set('Cookie', login.headers['set-cookie']);

        expect(response.body).toEqual(
            expect.objectContaining({
                id: 1,
                price: expect.any(Number),
                boiler_manufacturer: expect.any(String),
                parts_manufacturer: expect.any(String),
                vendor_code: expect.any(String),
                name: expect.any(String),
                description: expect.any(String),
                images: expect.any(String),
                in_stock: expect.any(Number),
                bestseller: expect.any(Boolean),
                new: expect.any(Boolean),
                popularity: expect.any(Number),
                compatibility: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
            }),
        );
    });


})