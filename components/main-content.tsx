import { ChatView } from "./chat-view";
import { InitialHomepageView } from "./initial-homepage-view";
import { Message } from "@/lib/types";

interface MainContentProps {
  messages: Message[];
  handleNewChat: () => void;
  chatStarted: boolean;
}

  // Main content component that changes based on chat state
  export const MainContent = ({ messages, handleNewChat, chatStarted }: MainContentProps    ) => {
    if (!chatStarted) {
      return (
        <InitialHomepageView />
      );
    } else {
      return (
        <ChatView messages={messages} handleNewChat={handleNewChat} />
      );
    }
  };    