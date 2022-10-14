import { BaseCommand } from "src/common/command";
import { EmbeddedExample } from "src/embedded/embedded-example";

const embeddedExample = new EmbeddedExample();

export const Embedded = new BaseCommand(
  "embed",
  "return Embed Form example"
).setReplyData(embeddedExample);
