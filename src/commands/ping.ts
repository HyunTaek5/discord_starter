import { BaseCommand } from "src/common/command";

export const Ping = new BaseCommand("ping", "return 'Pong!'").setReplyData(
  "Pong!"
);
