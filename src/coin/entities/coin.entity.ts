import { Index, Entity, Column, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity("coin")
@Unique(["symbol"])
export class Coin {

    @PrimaryGeneratedColumn('increment')
    id?: number

    @Column({ type: 'varchar', length: 20 })
    name: string

    @Index("symbol_name", ['symbol'])
    @Column({ type: 'varchar', length: 20 })
    symbol: string

    @Column({ type: 'decimal' })
    price: number

    @Column({ type: 'decimal' })
    percent_change_1h: number

    @Column({ type: 'decimal' })
    percent_change_24h: number

    @Column({ type: 'decimal' })
    percent_change_7d: number

    @Column({ type: 'decimal' })
    market_value: number

    @Column({ type: 'decimal' })
    volume_24h: number

    @Column({ type: 'bigint' })
    last_updated: number
}
