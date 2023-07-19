import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { importApp } from './common/import';

@Module({
  imports: importApp,
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
