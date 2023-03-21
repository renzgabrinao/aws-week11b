import { deleteChat, getChats } from "@week11/core/database";

export async function main(event) {
  const { chatId } = event.pathParameters;
  await deleteChat(chatId);
  const newChats = await getChats();

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Deleted chat", chats: newChats }),
  };
}
