import { IntervalHost } from 'src/decorators/interval-host.decorator';
import { Interval } from 'src/decorators/interval.decorator';

@IntervalHost
export class CronService {
  @Interval(1000)
  everySecond() {
    console.log("This will be logged every second!")    
  }
}
