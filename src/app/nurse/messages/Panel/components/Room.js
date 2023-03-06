import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import Actions from "../../../variables/actions/Actions";
import { FiUser, FiUsers } from "react-icons/fi";
// import Config from "../../../config";

const Room = ({ room, socket }) => {
  let { peopleClient, peopleNurse, lastMessage } = room;

  // console.log('new_part',peopleNurse);

  // console.log('roomssss',room);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const status = useSelector((state) => state.status);
  const role = useSelector((state) => state.auth.role);
  let other = {};

  // people.forEach(person => {
  //     if (user.id !== person._id) other = person;
  // });
  // console.log('other gerr',peopleNurse);

  if (role == 1) {
    other = peopleNurse;
  } else {
    other = peopleClient;
  }

  // if (!other) {
  //     other = { ...other, firstName: 'Deleted', lastName: 'User' };
  // }

  // console.log('gtg',other);

  let text = "";

  // if (!lastMessage && room.isGroup) text = 'New group created.';

  if (!lastMessage) lastMessage = {};

  if (lastMessage.authorClient === user.id) text += "You: ";
  if (lastMessage.authorNurse === user.id) text += "You: ";

  text +=
    lastMessage.type === "image"
      ? "Sent a picture."
      : lastMessage.content || "";

  const Picture = ({ picture, user }) => {
    if (picture) {
      return <img src={picture} alt="Picture" />;
    } else {
      // console.log('kkk11',user);
      return (
        <div className="img">
          {user !== null
            ? `${user.firstName.substr(0, 1)}${user.lastName.substr(0, 1)}`
            : ""}
        </div>
      );
    }
  };

  const getClass = () => {
    if (other !== null && status.online.includes(other._id)) {
      return "online";
    }

    if (other !== null && status.away.includes(other._id)) return "away";

    if (other !== null && status.busy.includes(other._id)) return "busy";
    return "offline";
  };

  // console.log('bbb',other);

  let title = other !== null ? `${other.firstName} ${other.lastName}` : "";
  title = title.length > 24 ? `${title.substr(0, 21)}...` : title;
  if (other == null) {
    return null;
  }
  return (
    <div
      className="entry"
      onClick={() => {
        socket.emit("join-room", { roomID: room._id });
        socket.on("join-room", (data) => {
          console.log("gii", data);
          dispatch({ type: "JOIN_ROOM_RESULT", data });
        });
      }}
    >
      <div className="picture">
        <Picture
          picture={other !== null ? other.profilePhoto : ""}
          user={other}
        />
        {!room.isGroup && <div className={`status ${getClass()}`} />}
      </div>
      <div className="text">
        <div className="title">{title}</div>
        <div className="message">
          {text.substr(0, 20)}
          {text.length > 20 && "..."}
        </div>
      </div>
      <div className="indicator room">
        {room.isGroup ? <FiUsers /> : <FiUser />}
      </div>
    </div>
  );
};

export default Room;
