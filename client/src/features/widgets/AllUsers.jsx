import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { Avatar, CardHeader, IconButton, Typography } from "@mui/material";

import PersonRemoveAlt1Icon from "@mui/icons-material/PersonRemoveAlt1";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

import { setFriends } from "../authPage/authSlice";
import { WidgetWrapper } from "../../components/WidgetWrapper";

export default function AllUsers({ urlOrigin }) {
  const [usersData, setUsersData] = useState([]);
  const dispatch = useDispatch();
  const {
    token,
    user: { _id, friends },
  } = useSelector((s) => s.auth);

  useEffect(() => {
    (async () => {
      const {
        data: { allUsersInfo },
      } = await axios.get(`${urlOrigin}/user/all`, {
        headers: { Authorization: token },
      });
      setUsersData(allUsersInfo);
    })();
  }, [friends, urlOrigin, token]);

  async function handleActionAddRemoveFriend(friendId) {
    // if there is no data in the patch request, put null at their place
    const {
      data: { userFriends },
    } = await axios.patch(`${urlOrigin}/user/friends/${friendId}`, null, {
      headers: { Authorization: token },
    });

    dispatch(setFriends({ friends: userFriends }));
  }

  return (
    <WidgetWrapper style={{ boxShadow: "none", marginTop: 8 }}>
      <Typography>Ussers List</Typography>
      {usersData &&
        usersData.map((user) => {
          const fullName = [user.firstName, user.lastName]
            .map((v) => v[0].toUpperCase() + v.slice(1))
            .join(" ");

          let actionIcon;
          if (_id === user._id) return <></>;
          if (friends.includes(user._id)) actionIcon = <PersonRemoveAlt1Icon />;
          else actionIcon = <PersonAddAlt1Icon />;

          return (
            <CardHeader
              sx={{ pl: 0 }}
              key={user._id}
              avatar={
                <Avatar
                  src={`${urlOrigin}/assets/${user.picturePath}`}
                  alt={fullName}
                />
              }
              title={fullName}
              subheader={user.location}
              action={
                <IconButton
                  onClick={() => handleActionAddRemoveFriend(user._id)}
                >
                  {actionIcon}
                </IconButton>
              }
            />
          );
        })}
    </WidgetWrapper>
  );
}
