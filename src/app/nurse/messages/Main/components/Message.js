import React, {useEffect, useState} from 'react';
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import './Message.sass';
import emojiRegex from 'emoji-regex/text';
// import Config from "../../../config";

const Message = ({message, previous={}, next={}, onOpen}) => {
    // console.log(' ------- Message ----------')
    // console.log('message',message)
    // console.log('previ',previous) 
    // console.log('next',next)
    let { authorClient,authorNurse, content, date } = message;
    // console.log('messss',message);
    var author;
    var prevAuthor = previous, nextAuthor = next;
    var flag = 1;
    // const user = useSelector(state => state.user);
    const user = useSelector(state => state.auth.user);
    // console.log('aaaa',user)
    // if(authorClient){ 
    //     author = authorClient;
    // }else
    //  {
    //      author = authorNurse; 
    //      flag = 2;
    //     }



    if(previous && previous.authorClient) {
        Object.assign(prevAuthor, {author:previous.authorClient});
    }

    if(previous && previous.authorNurse){
        Object.assign(prevAuthor, {author:previous.authorNurse});
    }

  

    if(typeof next !=="undefined" && next.authorClient && typeof previous!=="undefined") {

        // console.log('ssssaaaaa',previous);
        // console.log('ssss111',next.authorClient);
        Object.assign(nextAuthor, {author:previous.authorClient});
    }

    if(typeof next !=="undefined" && next.authorNurse) {
        Object.assign(nextAuthor, {author:next.authorNurse});
    }

    if (!author){
         author = { firstName: 'Deleted', lastName: 'User' };
    }
    // if (previous && !previous.author) previous.author = { firstName: 'Deleted', lastName: 'User' };
    // if (next && !next.author) next.author = { firstName: 'Deleted', lastName: 'User' };

    // const isMine = user.id === author._id;
    if(typeof authorClient=="undefined"){
        authorClient =null
    } if (typeof authorNurse=="undefined" ){
        authorNurse=null
    }
    console.log(authorNurse ,user._id ,'authorNurse');
    const isMine =authorClient!==null?user._id == authorClient._id:authorNurse!==null?user._id == authorNurse._id:false;

    
    let attachPrevious = false, attachNext = false;
    if (typeof prevAuthor!=="undefined" && Math.abs(moment(prevAuthor.date).diff(moment(date), 'minutes')) < 3)
    {
            // console.log('diiii',author , prevAuthor)
            if(author._id === prevAuthor._id)
            attachPrevious = true;
        } 
        if (typeof nextAuthor!=="undefined" && Math.abs(moment(nextAuthor.date).diff(moment(date), 'minutes')) < 3){
            console.log('diiii',author , nextAuthor)
            if( author._id === nextAuthor._id) 
                     attachNext = true;  
        }

    const Picture = ({user}) => {
        if (user?.profilePhoto)
            return <img src={user.profilePhoto} alt="Picture" />;
        else
            return <div className="img">{user?.firstName?.substr(0,1)}{user?.lastName?.substr(0,1)}</div>;
    };

    const Details = ({side}) => {
        if (!attachNext) return (
            <div className={`details ${side}`}>
                {moment(date).format('MMM DD - h:mm A')}
            </div>
        );
        else return null;
    };

    const PictureOrSpacer = () => {
        if (attachPrevious) return <div className="spacer"/>;
        else return (
            <div className="picture">
                <Picture user={typeof authorClient=="undefined"|| authorClient==null?authorNurse:typeof authorNurse=="undefined"||authorNurse==null?authorClient:{firstName:'',lastName:''}} />
            </div>
        );
    };

    const noEmoji = content.replace(emojiRegex(), '');
    const isOnlyEmoji = !noEmoji.replace(/[\s\n]/gm, '');

    const getBubble = () => {
        if (attachPrevious || isOnlyEmoji)
            if (isMine) return ' right';
            else return ' left';
        if (isMine) return ' bubble-right right';
        else return ' bubble-left left';
    };

    const convertUrls = text => {
        const urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        return text.replace(urlRegex, function(url) {
            return '<a href="' + url + '" target="_blank">' + url + '</a>';
        });
    };

    const Content = () => {
        // switch (message.type) {
        //     case 'image':
        //         return <img src={`${Config.url || ''}/api/images/${message.content}/512`} alt={`Sent by @${message.author.username}`} onClick={() => onOpen(message)} />;
        //     default:
                return <div dangerouslySetInnerHTML={{__html: convertUrls(content)}} />
        // }
    };

    const getBubbleClass = () => {
        // if (message.type === 'image') return 'bubble-image';
        return isOnlyEmoji ? 'emoji-bubble' : 'bubble';
    };

    return (
        <div className={`message${isMine ? ' right' : ''}${attachPrevious ? ' attach-previous' : ''}${attachNext ? ' attach-next' : ''}`}>
            <PictureOrSpacer/>
            <div className={`content${isMine ? ' right' : ''}${attachPrevious ? ' attach-previous' : ''}${attachNext ? ' attach-next' : ''}`}>
                <div className={`${getBubbleClass()}${getBubble()}${attachPrevious ? ' attach-previous' : ''}${attachNext ? ' attach-next' : ''}`}>
                    <Content/>
                </div>
                <Details side={isMine ? 'right' : 'left'} />
            </div>
        </div>
    );
};

export default Message;
