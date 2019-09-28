import React from "react";
import Message from "./Message";

/**
 * Messages List Component.
 */
class Messages extends React.Component {

    /**
     * Render component.
     */
   render() {
       return (
           <div id="messages">
               {this.props.messages.map(this.renderMessage)}
           </div>
       );
   }

   renderMessage = (message, index) => {
       message.outgoing = message.receiver !== this.props.user.id;
       return <Message key={index} message={message} />
   };

}

export default Messages;