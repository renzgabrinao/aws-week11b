import { createMessage, getMessages } from "@week11/core/database";

export async function main(event) {
  const body = JSON.parse(event.body);

  console.log(body);
  await createMessage(body.chatId, body.content);
  const messages = await getMessages(body.chatId);
  return {
    statusCode: 201,
    body: JSON.stringify({ message: "ok", messages: messages }),
  };
}
