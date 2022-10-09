export class InteractionType {
  isCommand: () => boolean;
  commandName: string;
  reply: (arg0: string) => any;
}
