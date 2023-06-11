import {Column, Model, Table} from "sequelize-typescript";

@Table
export class BoilerPartsModel extends Model {
    @Column
    boiler_manufacturer: string;

    @Column ({defaultValue:0})
    price: number;

    @Column
    email: string;

    @Column
    parts_manufacturer: string;

    @Column
    vendor_code: string;

    @Column
    name: string;

    @Column
    description: string;

    @Column
    images: string;

    @Column({defaultValue: 0})
    in_stock: string;

    @Column({defaultValue: false})
    bestsellers: boolean;

    @Column({defaultValue: false})
    new: boolean;

    @Column
    popularity: boolean;

    @Column
    compatibility: boolean;
}