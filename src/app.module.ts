import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { CronModule } from './cron/cron.module';
import { FibonacciModule } from './fibonacci/fibonacci.module';
import { HttpClientModule } from './http-client/http-client.module';

@Module({
  imports: [
    CoffeesModule,
    CronModule,
    FibonacciModule, 
    HttpClientModule.register({baseUrl: "www.naught.dk"}),
    HttpClientModule.register({baseUrl: "www.naught.dk"}), 
    HttpClientModule.register({baseUrl: "www.naught.dk"}),
  // HttpClientModule.registerAsync({
  //   useFactory: () => ({baseUrl: "www.naught.dk"})
  // })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
