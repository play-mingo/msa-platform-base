import { Inject } from "@nestjs/common";
import { AggregateRoot, EventPublisher } from "@nestjs/cqrs";

export class BaseCqrsDomainFactory extends AggregateRoot {
  @Inject(EventPublisher) private readonly eventPublisher!: EventPublisher;
  constructor() {
    super();
  }
  merge<Aggregate extends AggregateRoot>(aggregate: Aggregate): Aggregate {
    return this.eventPublisher.mergeObjectContext(aggregate);
  }
}
