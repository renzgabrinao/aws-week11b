import { updateMessage, getMessages } from "@week11/core/database";

export async function main(event) {
  const { chatId, messageId } = event.pathParameters;
  const body = JSON.parse(event.body);

  console.log(event);

  await updateMessage(body.content, messageId);

  const messages = await getMessages(chatId);
  return {
    statusCode: 200,
    body: JSON.stringify({ messages: messages }),
  };
}
