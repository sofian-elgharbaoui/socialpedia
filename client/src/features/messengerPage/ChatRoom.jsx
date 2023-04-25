import { useEffect, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import axios from "axios";
import { Box, Button, Tooltip, Typography } from "@mui/material";

import { socket } from "../../socketIO";

import { colorTokens } from "../../theme";
import { FlexBetween } from "../../components/FlexBetween";
import { WidgetWrapper } from "../../components/WidgetWrapper";

function userImg(path) {
  return `http://localhost:5000/assets/${path}`;
}

export default function ChatRoom({
  currentChatContributors,
  urlOrigin,
  connectedClients,
}) {
  const [currentChatMessages, setCurrentChatMessages] = useState([]);
  const [messageValue, setMessageValue] = useState("");
  const [otherInfo, setOtherInfo] = useState(null);
  const {
    token,
    user: { firstName, lastName, picturePath, _id },
  } = useSelector((s) => s.auth);

  useEffect(() => {
    (async () => {
      if (currentChatContributors) {
        const {
          data: { friendsData },
        } = await axios.get(
          `${urlOrigin}/user/friends/${currentChatContributors[1]}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setOtherInfo(friendsData);

        socket.emit("private messages history", currentChatContributors);
        socket.on("private messages history", (allPrivateMessages) => {
          setCurrentChatMessages(allPrivateMessages);
        });
      }
    })();

    socket.on("retreived message", (newMessage) => {
      // false : newMessage.receiverId === myId, because it'll always display the message
      if (currentChatContributors[1] === newMessage.senderId) {
        setCurrentChatMessages((preV) => [...preV, newMessage]);
      }
    });

    return () => {
      socket.off("private messages history");
      socket.off("retreived message");
    };
  }, [currentChatContributors, urlOrigin, token]);

  function handleSendMessage(e) {
    e.preventDefault();

    let to = connectedClients.find(
      (client) => client.userID === currentChatContributors[1]
    ).socketID;

    socket.emit("private message", currentChatContributors, to, messageValue);
    setCurrentChatMessages((v) => [
      ...v,
      {
        senderId: currentChatContributors[0],
        receiverId: currentChatContributors[1],
        content: messageValue,
      },
    ]);

    setMessageValue("");
  }

  return (
    <WidgetWrapper
      style={{
        marginTop: 8,
        flexBasis: "69%",
        height: "100%",
      }}
    >
      {currentChatContributors ? (
        <>
          <Box style={{ height: "calc(100% - 50px)", overflow: "auto" }}>
            {currentChatMessages &&
              currentChatMessages.map((message) => {
                return (
                  <Box
                    key={nanoid()}
                    display="flex"
                    justifyContent={
                      message.senderId === _id ? "flex-end" : "flex-start"
                    }
                    my={1}
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      gap={1}
                      flexDirection={message.senderId === _id && "row-reverse"}
                    >
                      <Tooltip
                        title={
                          message.senderId === _id
                            ? `${firstName} ${lastName}`
                            : `${otherInfo.firstName} ${otherInfo.lastName}`
                        }
                      >
                        <div
                          style={{ width: 30, height: 30, borderRadius: "50%" }}
                        >
                          <img
                            src={userImg(
                              message.senderId === _id
                                ? picturePath
                                : otherInfo.picturePath
                            )}
                            alt={
                              message.senderId === _id
                                ? `${firstName} ${lastName}`
                                : `${otherInfo.firstName} ${otherInfo.lastName}`
                            }
                            width="100%"
                            style={{ borderRadius: "50%" }}
                          />
                        </div>
                      </Tooltip>
                      <Typography
                        p={1}
                        borderRadius={2}
                        bgcolor={
                          message.senderId === _id
                            ? colorTokens.grey[100]
                            : "primary.light"
                        }
                      >
                        {message.content}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
          </Box>
          <Box id="userActions" borderTop={`1px solid ${colorTokens.grey[50]}`}>
            <form onSubmit={handleSendMessage}>
              <FlexBetween gap={1} height="50px">
                <input
                  value={messageValue}
                  onChange={(e) => setMessageValue(e.target.value)}
                  style={{ flexGrow: 1, height: "70%" }}
                />
                <Button type="submit" sx={{ px: 3 }}>
                  Submit
                </Button>
              </FlexBetween>
            </form>
          </Box>
        </>
      ) : (
        <Typography variant="h3" color="neutral">
          Open a conversation to start a chat.
        </Typography>
      )}
    </WidgetWrapper>
  );
}
