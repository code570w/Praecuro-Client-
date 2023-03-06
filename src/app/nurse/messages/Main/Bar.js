import React, {useRef, useState} from 'react';
import './Main.sass';
import {
    FiSend,
    // FiImage,
    // FiSmile,
} from "react-icons/fi";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import 'emoji-mart/css/emoji-mart.css'
// import { Picker } from 'emoji-mart'

const Bar = () => {
    const dispatch = useDispatch();

    // const fileInput = useRef(null);

    // const ref = useSelector(state => state.images.ref);
    const room = useSelector(state => state.room);
    const user = useSelector(state => state.auth.user);
    const role = useSelector(state => state.auth.role);

    const [text, setText] = useState('');

    
    // const [isPicker, showPicker] = useState(false);
    // const [pictureRefs, addPictureRef] = useState([]);

    const sendMessage = () => {
        if (text.length === 0) return;
        console.log('- bar-',user)
        if(role == 1)
           {

            console.log('texttttt111',user)
            window.socket.emit('message', {roomID: room._id, clientID: user._id, content: text, contentType: 'text' });
        //    dispatch({type: 'SEND_MESSAGE', roomID: room._id, clientID: user._id, content: text, contentType: 'text'});
            dispatch({type: 'ADD_MESSAGE', message: {
                _id: Math.random(), authorClient: {...user, _id: user._id}, content: text, type: 'text', date: moment()
            }});   
        } 
        else{

            console.log('texttttt',user)
        //   dispatch({type: 'SEND_MESSAGE', roomID: room._id, nurseID: user._id, content: text, contentType: 'text'});
            window.socket.emit('message', {roomID: room._id, nurseID: user._id, content: text, contentType: 'text' });
           console.log('message-in-send');
             
            dispatch({type: 'ADD_MESSAGE', message: {
                _id: Math.random(), authorNurse: {...user, _id: user._id}, content: text, type: 'text', date: moment()
            }});  
        }

       
        setText('');
    };

    const handleKeyPress = event => {
        if(event.key === 'Enter') sendMessage();
    };

    // const sendImages = images => {
    //     let tmpRefs = [];
    //     for (let i = 0; i < images.length; i++) {
    //         const image = images[i];
    //         tmpRefs.push(ref + i);
    //         dispatch({type: Actions.UPLOAD_IMAGE, image: image, ref: ref + i, next: {type: Actions.SEND_IMAGE, ref: ref + i, target: room._id}});
    //     }
    //     addPictureRef([...pictureRefs, ...tmpRefs]);
    // };

    return (
        <div className="bar">
            {/* <div className="picker" hidden={!isPicker}>
                <Picker
                    include={['recent', 'search', 'people', 'nature', 'foods', 'places']}
                    onSelect={emoji => setText(text + emoji.native)}
                    darkMode={false}
                    title="Emoji"
                />
                </div>
            <div className="button smile" onClick={() => showPicker(!isPicker)}><FiSmile/></div>
            <input
                className="file-input"
                type="file"
                ref={fileInput}
                accept="image/*"
                multiple={true}
                onChange={e => sendImages(e.target.files)}
            />
            <div className="button attach" onClick={() => fileInput && fileInput.current && fileInput.current.click()}>
                <FiImage/>
            </div> */}
            <input
                type="text"
                placeholder="Type something to send..."
                value={text}
                onChange={e => setText(e.target.value)}
                data-emoji-input="unicode"
                onKeyPress={handleKeyPress}
            />
            <div className="button" onClick={sendMessage}><FiSend/></div>
        </div>
    );
};

export default Bar;
