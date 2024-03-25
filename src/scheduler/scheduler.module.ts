import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { IntetrvalScheduler } from './interval.scheduler/interval.scheduler';

@Module({imports: [DiscoveryModule], providers: [IntetrvalScheduler]})
export class SchedulerModule {}
