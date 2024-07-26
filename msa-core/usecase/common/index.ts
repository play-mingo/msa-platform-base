import { CommonCommands } from "./common.command";
import { CommonCommandHandlers } from "./common.command.handler";
import { CommonEvents } from "./common.event";
import { CommonEventHandlers } from "./common.event.handler";

export * from "./common.event";
export * from "./common.payload";
export * from "./common.result";
export * from "./common.command";
export * from "./common.command.handler";
export * from "./common.event";
export * from "./common.event.handler";
export const CommonUseCases = [...CommonCommandHandlers, ...CommonEventHandlers, ...CommonCommands, ...CommonEvents];
