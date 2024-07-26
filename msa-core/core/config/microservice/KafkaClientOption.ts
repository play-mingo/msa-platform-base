import { KafkaOptions, Transport } from "@nestjs/microservices";

export type KafkaClientOption = KafkaOptions & {
  name: string | symbol;
};

// export const kafkaBrokers = [`${process.env.SERVER_HOST}:9093`, `${process.env.SERVER_HOST}:9094`, `${process.env.SERVER_HOST}:9095`];
// export const kafkaBrokers = ["localhost:9093", "localhost:9094", "localhost:9095"];
export const kafkaBrokers = [
  process.env.KAFKA_BROKER_URI_1 || `${process.env.SERVER_HOST}:9093`,
  process.env.KAFKA_BROKER_URI_2 || `${process.env.SERVER_HOST}:9094`,
  process.env.KAFKA_BROKER_URI_3 || `${process.env.SERVER_HOST}:9095`,
];

export const GatewayProducerKafkaClientName = "GATEWAY_PRODUCER_KAFKA_CLIENT";
export const GatewayProducerKafkaClientOption: KafkaClientOption = {
  name: GatewayProducerKafkaClientName,
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: "gateway-producer",
      brokers: kafkaBrokers,
    },
    consumer: {
      groupId: "gateway-producer",
    },
  },
};

export const GatewayConsumerKafkaClientName = "GATEWAY_PRODUCER_KAFKA_CLIENT";
export const GatewayConsumerKafkaClientOption: KafkaClientOption = {
  name: GatewayConsumerKafkaClientName,
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: "gateway-consumer",
      brokers: kafkaBrokers,
    },
    consumer: {
      groupId: "gateway-consumer",
    },
  },
};

export const AuthProducerKafkaClientName = "AUTH_PRODUCER_KAFKA_CLIENT";
export const AuthProducerKafkaClientOption: KafkaClientOption = {
  name: AuthProducerKafkaClientName,
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: "auth-producer",
      brokers: kafkaBrokers,
    },
    consumer: {
      groupId: "auth-producer",
    },
  },
};

export const AuthConsumerKafkaClientName = "AUTH_CONSUMER_KAFKA_CLIENT";
export const AuthConsumerKafkaClientOption: KafkaClientOption = {
  name: AuthConsumerKafkaClientName,
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: "auth-consumer",
      brokers: kafkaBrokers,
    },
    consumer: {
      groupId: "auth-consumer",
    },
  },
};

export const ShopProducerKafkaClientName = "SHOP_PRODUCER_KAFKA_CLIENT";
export const ShopProducerKafkaClientOption: KafkaClientOption = {
  name: ShopProducerKafkaClientName,
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: "shop-producer",
      brokers: kafkaBrokers,
    },
    consumer: {
      groupId: "shop-producer",
    },
  },
};

export const ShopConsumerKafkaClientName = "SHOP_CONSUMER_KAFKA_CLIENT";
export const ShopConsumerKafkaClientOption: KafkaClientOption = {
  name: ShopConsumerKafkaClientName,
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: "shop-consumer",
      brokers: kafkaBrokers,
    },
    consumer: {
      groupId: "shop-consumer",
    },
  },
};

export const OrderProducerKafkaClientName = "ORDER_PRODUCER_KAFKA_CLIENT";
export const OrderProducerKafkaClientOption: KafkaClientOption = {
  name: OrderProducerKafkaClientName,
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: "order-producer",
      brokers: kafkaBrokers,
    },
    consumer: {
      groupId: "order-producer",
    },
  },
};

export const OrderConsumerKafkaClientName = "ORDER_CONSUMER_KAFKA_CLIENT";
export const OrderConsumerKafkaClientOption: KafkaClientOption = {
  name: OrderConsumerKafkaClientName,
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: "order-consumer",
      brokers: kafkaBrokers,
    },
    consumer: {
      groupId: "order-consumer",
    },
  },
};
export const UserProducerKafkaClientName = "USER_PRODUCER_KAFKA_CLIENT";
export const UserProducerKafkaClientOption: KafkaClientOption = {
  name: UserProducerKafkaClientName,
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: "user-producer",
      brokers: kafkaBrokers,
    },
    consumer: {
      groupId: "user-producer",
    },
  },
};

export const UserConsumerKafkaClientName = "USER_CONSUMER_KAFKA_CLIENT";
export const UserConsumerKafkaClientOption: KafkaClientOption = {
  name: UserConsumerKafkaClientName,
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: "user-consumer",
      brokers: kafkaBrokers,
    },
    consumer: {
      groupId: "user-consumer",
    },
  },
};

export const ChatProducerKafkaClientName = "CHAT_PRODUCER_KAFKA_CLIENT";
export const ChatProducerKafkaClientOption: KafkaClientOption = {
  name: ChatProducerKafkaClientName,
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: "chat-producer",
      brokers: kafkaBrokers,
    },
    consumer: {
      groupId: "chat-producer",
    },
  },
};

export const ChatConsumerKafkaClientName = "CHAT_CONSUMER_KAFKA_CLIENT";
export const ChatConsumerKafkaClientOption: KafkaClientOption = {
  name: ChatConsumerKafkaClientName,
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: "chat-consumer",
      brokers: kafkaBrokers,
    },
    consumer: {
      groupId: "chat-consumer",
    },
  },
};

export const CommonProducerKafkaClientName = "COMMON_PRODUCER_KAFKA_CLIENT";
export const CommonProducerKafkaClientOption: KafkaClientOption = {
  name: CommonProducerKafkaClientName,
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: "common-producer",
      brokers: kafkaBrokers,
    },
    consumer: {
      groupId: "common-producer",
    },
  },
};

export const CommonConsumerKafkaClientName = "COMMON_CONSUMER_KAFKA_CLIENT";
export const CommonConsumerKafkaClientOption: KafkaClientOption = {
  name: CommonConsumerKafkaClientName,
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: "common-consumer",
      brokers: kafkaBrokers,
    },
    consumer: {
      groupId: "common-consumer",
    },
  },
};

export const KAFKA_CLIENT_OPTIONS = {
  GATEWAY_PROSUCER: {
    NAME: GatewayConsumerKafkaClientName,
    OPTION: GatewayConsumerKafkaClientOption,
  },
  GATEWAY_CONSUMER: {
    NAME: GatewayConsumerKafkaClientName,
    OPTION: GatewayConsumerKafkaClientOption,
  },
  AUTH_PRODUCER: {
    NAME: AuthProducerKafkaClientName,
    OPTION: AuthProducerKafkaClientOption,
  },
  AUTH_CONSUMER: {
    NAME: AuthConsumerKafkaClientName,
    OPTION: AuthConsumerKafkaClientOption,
  },
  SHOP_PRODUCER: {
    NAME: ShopProducerKafkaClientName,
    OPTION: ShopProducerKafkaClientOption,
  },
  SHOP_CONSUMER: {
    NAME: ShopConsumerKafkaClientName,
    OPTION: ShopConsumerKafkaClientOption,
  },
  ORDER_PRODUCER: {
    NAME: OrderProducerKafkaClientName,
    OPTION: OrderProducerKafkaClientOption,
  },
  ORDER_CONSUMER: {
    NAME: OrderConsumerKafkaClientName,
    OPTION: OrderConsumerKafkaClientOption,
  },
  USER_PRODUCER: {
    NAME: UserProducerKafkaClientName,
    OPTION: UserProducerKafkaClientOption,
  },
  USER_CONSUMER: {
    NAME: UserConsumerKafkaClientName,
    OPTION: UserConsumerKafkaClientOption,
  },
  CHAT_PRODUCER: {
    NAME: ChatProducerKafkaClientName,
    OPTION: ChatProducerKafkaClientOption,
  },
  CHAT_CONSUMER: {
    NAME: ChatConsumerKafkaClientName,
    OPTION: ChatConsumerKafkaClientOption,
  },
  COMMON_PRODUCER: {
    NAME: CommonProducerKafkaClientName,
    OPTION: CommonProducerKafkaClientOption,
  },
  COMMON_CONSUMER: {
    NAME: CommonConsumerKafkaClientName,
    OPTION: CommonConsumerKafkaClientOption,
  },
} as const;

export type KAFKA_CLIENT_OPTIONS = (typeof KAFKA_CLIENT_OPTIONS)[keyof typeof KAFKA_CLIENT_OPTIONS];
