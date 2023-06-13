import {Injectable} from '@nestjs/common';
import {ShoppingCart} from "./shopping-cart.model";
import {UsersService} from "../users/users.service";
import {AddToCartDto} from "./dto/add-to-cart.dto";
import {BoilerPartsService} from "../boiler-parts/boiler-parts.service";
import {InjectModel} from "@nestjs/sequelize";

@Injectable()
export class ShoppingCartService {
    constructor(
        @InjectModel(ShoppingCart)
        private readonly shoppingCart: typeof ShoppingCart,
        private readonly usersService: UsersService,
        private readonly boilerParts: BoilerPartsService
    ) {
    }

    async findAll(userId: number | string): Promise<ShoppingCart[]> {
        return this.shoppingCart.findAll({
            where: {user_id: userId}
        })
    }

    async add(addToCartDto: AddToCartDto) {
        const cart = new ShoppingCart();
        const user = await this.usersService.findOne({
            where: {username: addToCartDto.username},
        });
        const part = await this.boilerParts.findOne(addToCartDto.partId)

        cart.user_id = user.id;
        cart.part_id = part.id;
        cart.boiler_manufacturer = part.boiler_manufacturer;
        cart.parts_manufacturer = part.parts_manufacturer;
        cart.price = part.price;
        cart.in_stock = part.in_stock;
        cart.image = JSON.parse(part.images)[0];
        cart.name = part.name;
        cart.total_price = part.price;

        return cart.save();
    }

    async updateCount(count: number, partId: string | number): Promise<{ count: number }> {
        await this.shoppingCart.update({count}, {where: {part_id: partId}})

        const part = await this.shoppingCart.findOne({where: {part_id: partId}});
        return {count: part.count}
    }

    async updateTotalPrice(
        total_price: number,
        partId: number | string,
    ): Promise<{ total_price: number }> {
        await this.shoppingCart.update({total_price}, {where: {part_id: partId}});

        const part = await this.shoppingCart.findOne({where: {part_id: partId}});

        return {total_price: part.total_price};
    }

    async remove(partId: string | number): Promise<void> {
        const part = await this.shoppingCart.findOne({where: {partId}})

        await part.destroy;

    }


    async removeAll(userId: string| number): Promise<void> {
        const part = await this.shoppingCart.destroy({where: {user_id: userId}})
    }
}
