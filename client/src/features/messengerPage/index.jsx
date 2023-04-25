import { useEffect, useState } from "react";
import { socket } from "../../socketIO";

import { FlexBetween } from "../../components/FlexBetween";

import ConverstationList from "./ConversationList";
import ChatRoom from "./ChatRoom";
import NavBar from "../../components/NavBar";
import { useSelector } from "react-redux";

// my mission is to know who is connected,
// in order to send messages to the current chat contributer by his socketID

export default function Messenger({ urlOrigin }) {
  const [currentChatContributors, setCurrentChatContributors] = useState(null);
  const [connectedClients, setConnectedClients] = useState([]);
  const _id = useSelector((s) => s.auth.user._id);

  useEffect(() => {
    // I have to to assign the auth to an Obj like that, and not
    // like socket.auth.userID =_id;
    socket.auth = { userID: _id };
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, [_id]);

  // to know who has connected on every re-render
  useEffect(() => {
    socket.on("users", (users) => {
      setConnectedClients(users);
    });

    return () => {
      socket.off("users");
    };
  });

  return (
    <>
      <NavBar />
      <FlexBetween
        id="messanger"
        style={{ alignItems: "flex-start", height: "calc(100vh - 63.88px)" }}
      >
        <ConverstationList
          urlOrigin={urlOrigin}
          setCurrentChatContributors={setCurrentChatContributors}
        />
        <ChatRoom
          urlOrigin={urlOrigin}
          currentChatContributors={currentChatContributors}
          connectedClients={connectedClients}
        />
      </FlexBetween>
    </>
  );
}
