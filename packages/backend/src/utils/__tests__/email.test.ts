/*
 * CS3099 Group A3
 */

process.env.SMTP_HOST = "smtp.ethereal.email";
process.env.SMTP_PORT = "587";
process.env.SMTP_USERNAME = "rogers.price3@ethereal.email";
process.env.SMTP_PASSWORD = "YwgzQrmK2gemUfR63g";

import test from "ava";
import { emailTransporter } from "../email";

test("Correct type", async (t) => {
  const info = await emailTransporter.sendMail({
    from: "sender@server.com",
    to: "receiver@sender.com",
    subject: "Message title",
    text: "Plaintext version of the message",
  });

  t.regex(info.response, /^250 Accepted/);
});