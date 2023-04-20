import { Injectable, Inject, Logger } from '@nestjs/common';
import { CreateCoinDto } from './dto/create-coin.dto';
import { UpdateCoinDto } from './dto/update-coin.dto';
import { Coin } from './entities/coin.entity';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cron } from '@nestjs/schedule';
import { RedisInstance } from 'src/utils/redis.instance';

@Injectable()
export class CoinService {

  private readonly logger = new Logger(CoinService.name);

  constructor(
    @InjectRepository(Coin) private readonly coinRepository: Repository<Coin>
  ) { }

  async create(createCoinDto: CreateCoinDto) {
    return await this.coinRepository.save(createCoinDto);
  }

  async setRedis() {
    const redis=await RedisInstance.initRedis('local');
    redis.set('ETH','123');
    redis.set('ETH','456');

    return redis.get("ETH");
  }

  findAll() {
    return this.coinRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} coin`;
  }

  update(id: number, updateCoinDto: UpdateCoinDto) {
    return `This action updates a #${id} coin`;
  }

  remove(id: number) {
    return `This action removes a #${id} coin`;
  }

  //爬虫定时任务(每分钟的第30秒执行)
  @Cron('00 * * * * *')
  async crawlCoinMarketCap() {
    const baseUrl: string = 'https://coinmarketcap.com';

    const getData = async () => {
      const body = await axios.get(baseUrl + "?time=" + new Date().getTime()).then(res => res.data);
      const $ = cheerio.load(body);

      let coinList: Coin[] = [];

      $(".cmc-table tbody tr").each(function (i, t) {
        if (i < 10) {
          let coin: Coin = {
            name: $(t).find("td").eq(2).find('.kKpPOn').text().trim().replace(/\s/g, "-"),
            symbol: $(t).find("td").eq(2).find('.coin-item-symbol').text().trim(),
            price: Number($(t).find("td").eq(3).text().trim().replace(/[\$\,]/g, "")),
            percent_change_1h: Number($(t).find("td").eq(4).text().trim().replace(/[\%\+\,]/g, "")),
            percent_change_24h: Number($(t).find("td").eq(5).text().trim().replace(/[\%\+\,]/g, "")),
            percent_change_7d: Number($(t).find("td").eq(6).text().trim().replace(/[\%\+\,]/g, "")),
            market_value: Number($(t).find("td").eq(7).find("span").eq(1).text().trim().replace(/[\$\%\+\,]/g, "")),
            volume_24h: Number($(t).find("td").eq(8).find(".cmc-link").text().trim().replace(/[\$\%\+\,]/g, "")),
            last_updated: new Date().getTime()
          };
          coinList.push(coin);
        }
      })

      //根据symbol唯一索引批量判断新增或更新
      this.coinRepository.upsert(coinList, ['symbol'])
      this.logger.log("更新成功====>" + new Date().toLocaleString())
    }

    await getData();

  }
}
