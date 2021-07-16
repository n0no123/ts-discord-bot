import { Message } from "discord.js";

// import { Nyeh } from "./nyeh";
// import { Ping } from "./ping";
// import { Quack } from "./quack";

export interface Command {
  message: Message;
  execute(message: Message): void;
}

export const disableTabsByRights =
  (permissions: string[]) =>
  (type: string): boolean =>
    permissions.includes(type);

    // const commands: Map<string, void> = new Map<string, void>([
    //     ["!nyeh", Nyeh.execute(message)],
    //     ["!ping", Ping.execute(message)],
    //     ["!quack", Quack.execute(message)],
    //   ]);
