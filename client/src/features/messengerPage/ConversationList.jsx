import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import { Avatar, CardHeader, Typography } from "@mui/material";

import { WidgetWrapper } from "../../components/WidgetWrapper";
import { colorTokens } from "../../theme";

export default function ConverstationList({
  setCurrentChatContributors,
  urlOrigin,
}) {
  const [friendsData, setFriendsData] = useState([]);
  const {
    token,
    user: { friends, _id: userId },
  } = useSelector((s) => s.auth);

  useEffect(() => {
    (async () => {
      const {
        data: { formattedFriends },
      } = await axios.get(`${urlOrigin}/user/friends`, {
        headers: { Authorization: token },
      });
      setFriendsData(formattedFriends);
    })();
  }, [friends, urlOrigin, token]);

  return (
    <WidgetWrapper
      style={{
        boxShadow: "none",
        marginTop: 8,
        flexBasis: "30%",
        height: "100%",
        overflow: "auto",
      }}
    >
      <Typography>Friends List</Typography>
      {friendsData &&
        friendsData.map((friend) => {
          const fullName = [friend.firstName, friend.lastName]
            .map((v) => v[0].toUpperCase() + v.slice(1))
            .join(" ");

          return (
            <CardHeader
              sx={{
                pl: 0,
                borderRadius: 3,
                cursor: "pointer",
                "&:hover": { bgcolor: colorTokens.grey[50] },
              }}
              key={friend._id}
              avatar={
                <Avatar
                  src={`${urlOrigin}/assets/${friend.picturePath}`}
                  alt={fullName}
                />
              }
              title={fullName}
              subheader={friend.location}
              onClick={() => setCurrentChatContributors([userId, friend._id])}
            />
          );
        })}
    </WidgetWrapper>
  );
}
