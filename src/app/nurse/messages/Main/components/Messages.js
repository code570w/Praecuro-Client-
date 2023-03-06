import React, {useState} from 'react';
import {useSelector} from "react-redux";
import Message from "./Message";
import { Lightbox } from "react-modal-image";
// import Config from "../../../config";

const Messages = () => {
    const roomID = useSelector(state => state.room._id);
    const room = useSelector(state => state.room);
    const user = useSelector(state => state.user);

    const [open, setOpen] = useState(null);

    let messages = room.messages;

    const role = useSelector(state =>state.auth.role);
    !messages && (messages = []);

    let other = {
        firstName: 'A', lastName: 'A'
    };

    // if (!room.isGroup && room.people) {
    //     room.people.forEach(person => {
    //         if (person._id !== user.id) other = person;
    //     });
    // }
    if(role == 1){
    other = room.peopleNurse;
    }else{
    other = room.peopleClient;
    }
    
    const Messages = messages.map((message, index) => {
        return <Message
            key={message._id}
            message={message}
            previous={messages[index - 1]}
            next={messages[index + 1]}
            onOpen={setOpen}
        />;
    });

    return (
        <div>
            {open && (
                <Lightbox
                    medium={`/api/images/${open.content}/1024`}
                    large={`/api/images/${open.content}/2048`}
                    alt="Lightbox"
                    hideDownload={true}
                    onClose={() => setOpen(null)}
                />
            )}
            {Messages}
        </div>
    );
};

export default Messages;
