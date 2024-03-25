import { Injectable, OnApplicationBootstrap, OnApplicationShutdown } from "@nestjs/common";
import { DiscoveryService, MetadataScanner, Reflector } from "@nestjs/core";
import { INTERVAL_HOST_KEY } from "src/decorators/interval-host.decorator";
import { INTERVAL_KEY } from "src/decorators/interval.decorator";

@Injectable()
export class IntetrvalScheduler implements OnApplicationBootstrap, OnApplicationShutdown {
  private readonly intervals: NodeJS.Timeout[] = []

  constructor(
      private readonly discoveryService: DiscoveryService,
      private readonly reflector: Reflector,
      private readonly metadataScanner: MetadataScanner
    ) {}
  
  onApplicationBootstrap() {
    const providers = this.discoveryService.getProviders()
    providers.forEach((wrapper) => {
      const { instance } = wrapper;
      const prototype = instance && Object.getPrototypeOf(instance);
      
      if(!instance || !prototype) return; 
      
      const isIntervalHost = this.reflector.get(INTERVAL_HOST_KEY, instance.constructor) ?? false

      if(!isIntervalHost) return

      const methodKeys = this.metadataScanner.getAllMethodNames(prototype)
      methodKeys.forEach((methodKey) => {
        const interval = this.reflector.get(INTERVAL_KEY, instance[methodKey])
        if(interval === undefined) return
        const intervalRef =  setInterval(() => instance[methodKey](), interval)
        this.intervals.push(intervalRef)
      })
    })
  }

  onApplicationShutdown(signal?: string) {
    console.log(`Shutting down!`)
    this.intervals.forEach((intRef) => { 
      clearInterval(intRef)
    }) 
   }

}
