import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDto } from '../common';
import { NATS_SERVICE } from '../config';
import { PaginationOrderDto, StatusDto } from './dto';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    try {
      const order = await firstValueFrom(
        this.client.send('createOrder', createOrderDto),
      );
      return order;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  findAll(@Query() paginationDto: PaginationOrderDto) {
    return this.client.send('findAllOrders', paginationDto);
  }

  @Get('id/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const order = await firstValueFrom(
        this.client.send('findOneOrder', { id }),
      );
      return order;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':status')
  async findAllByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginationDto,
  ) {
    try {
      return this.client
        .send('findAllOrders', {
          ...paginationDto,
          status: statusDto.status,
        })
        .pipe(
          catchError((error) => {
            throw new RpcException(error);
          }),
        );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto,
  ) {
    try {
      return this.client
        .send('changeOrderStatus', {
          id,
          status: statusDto.status,
        })
        .pipe(
          catchError((error) => {
            throw new RpcException(error);
          }),
        );
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
