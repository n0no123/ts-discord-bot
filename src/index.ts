// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

import { Bot } from "./bot";

const bot = new Bot();

bot.listen();
