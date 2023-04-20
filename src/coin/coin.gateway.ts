import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { CoinService } from './coin.service';
import { CreateCoinDto } from './dto/create-coin.dto';
import { UpdateCoinDto } from './dto/update-coin.dto';

@WebSocketGateway()
export class CoinGateway {
  constructor(private readonly coinService: CoinService) {}

  @SubscribeMessage('createCoin')
  create(@MessageBody() createCoinDto: CreateCoinDto) {
    return this.coinService.create(createCoinDto);
  }

  @SubscribeMessage('findAllCoin')
  findAll() {
    return this.coinService.findAll();
  }

  @SubscribeMessage('findOneCoin')
  findOne(@MessageBody() id: number) {
    return this.coinService.findOne(id);
  }

  @SubscribeMessage('updateCoin')
  update(@MessageBody() updateCoinDto: UpdateCoinDto) {
    return this.coinService.update(updateCoinDto.id, updateCoinDto);
  }

  @SubscribeMessage('removeCoin')
  remove(@MessageBody() id: number) {
    return this.coinService.remove(id);
  }
}
