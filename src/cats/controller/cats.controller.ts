import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { CatsService } from '../service/cats.service';


@Controller('cats')
export class CatsController {
    constructor(private readonly catsService: CatsService) { }

    @Get('names')
    findAll(): any {
        return this.catsService.findAll();
    }

    @Post()
    create(
        @Res() reply: FastifyReply,
        @Body() body: { catName: string }
    ) {
        if (!body?.catName) {
            return reply.status(400).send('Empty Payload');
        }
        this.catsService.write(body?.catName);
        return reply.send('Success');
    }
}
