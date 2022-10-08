export class CommandType {
  isCommand: () => boolean;
  commandName: string;
  reply: (arg0: string) => any;
}
