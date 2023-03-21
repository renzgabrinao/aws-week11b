import { Api } from "sst/constructs";

export function API({ stack }) {
  const api = new Api(stack, "api", {
    defaults: {
      function: {
        environment: {
          DATABASE_URL: process.env.DATABASE_URL,
        },
      },
    },
    routes: {
      "GET /chats": "packages/functions/src/chats/getChats.main",
      "POST /chats": "packages/functions/src/chats/createChat.main",
      "DELETE /chats/{chatId}": "packages/functions/src/chats/deleteChat.main",
      "PUT /chats/{chatId}": "packages/functions/src/chats/updateChat.main",

      "GET /messages/{chatId}":
        "packages/functions/src/messages/getMessages.main",
      "POST /messages": "packages/functions/src/messages/createMessage.main",
      "DELETE /messages/{chatId}/{messageId}":
        "packages/functions/src/messages/deleteMessage.main",
      "PUT /messages/{chatId}/{messageId}":
        "packages/functions/src/messages/updateMessage.main",
    },
  });
  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return { api };
}
