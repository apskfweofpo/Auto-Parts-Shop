import {Column, Model, Table} from "sequelize-typescript";

@Table
export class ShoppingCart extends Model {
    @Column
    user_id: string;

    @Column ({defaultValue:0})
    part_id: number;

    @Column
    boiler_manufacturer: string;

    @Column ({defaultValue:0})
    price: number;

    @Column
    parts_manufacturer: string;

    @Column
    image: string;

    @Column({defaultValue: 0})
    in_stock: string;

    @Column({defaultValue: 0})
    count: number;

    @Column({defaultValue: 0})
    total_price: number;

}