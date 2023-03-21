import { deleteMessage, getMessages } from "@week11/core/database";

export async function main(event) {
  const { chatId, messageId } = event.pathParameters;
  await deleteMessage(messageId);
  const messages = await getMessages(chatId);
  return {
    statusCode: 200,
    body: JSON.stringify({ messages: messages }),
  };
}
