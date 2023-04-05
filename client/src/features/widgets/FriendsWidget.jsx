import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { Avatar, CardHeader, IconButton, Typography } from "@mui/material";

import PersonRemoveAlt1Icon from "@mui/icons-material/PersonRemoveAlt1";

import { setFriends } from "../authPage/authSlice";
import { WidgetWrapper } from "../../components/WidgetWrapper";

export default function FriendsWidget({ urlOrigin }) {
  const dispatch = useDispatch();
  const {
    token,
    user: { friends },
  } = useSelector((s) => s.auth);
  const [friendsData, setFriendsData] = useState([]);

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

  async function handleActionAddRemoveFriend(friendId) {
    const {
      data: { userFriends },
    } = await axios.patch(
      `${urlOrigin}/user/friends/${friendId}`,
      {
        friendId,
      },
      {
        headers: { Authorization: token },
      }
    );

    dispatch(setFriends({ friends: userFriends }));
  }

  return (
    <WidgetWrapper style={{ boxShadow: "none", marginTop: 8 }}>
      <Typography>Friends List</Typography>
      {friendsData &&
        friendsData.map((friend) => {
          const fullName = [friend.firstName, friend.lastName]
            .map((v) => v[0].toUpperCase() + v.slice(1))
            .join(" ");

          return (
            <CardHeader
              sx={{ pl: 0 }}
              key={friend._id}
              avatar={
                <Avatar
                  src={`${urlOrigin}/assets/${friend.picturePath}`}
                  alt={fullName}
                />
              }
              title={fullName}
              subheader={friend.location}
              action={
                <IconButton
                  onClick={() => handleActionAddRemoveFriend(friend._id)}
                >
                  <PersonRemoveAlt1Icon />
                </IconButton>
              }
            />
          );
        })}
    </WidgetWrapper>
  );
}
