import React from "react";
import { withRouter } from "react-router-dom";
import Avatar from "components/Avatar";
import { Row, DropdownItem, DropdownMenu, DropdownToggle, Nav, UncontrolledDropdown} from "reactstrap";
import moment from 'moment';

/**
 * Chat Header.
 */
const ChatHeader = props => {

    /**
     * Render user status
     * @returns {string}
     */
    const status = () => {
       if(props.typing) return 'يكتب الآن';
       if(props.contact.status === true) return 'متصل الآن';
       if(props.contact.status) return moment(props.contact.status).fromNow();
   };

    /**
     * Render Component
     */
    return (
        <Row className="heading m-0">
            <div onClick={props.toggle}>
                <Avatar src={props.contact.avatar} />
            </div>
            <div className="text-right">
                <div>{props.contact ? props.contact.name : ''}</div>
                <small>{status()}</small>
           </div>
            <Nav className="mr-auto" navbar>
                <UncontrolledDropdown>
                    <DropdownToggle tag="a" className="nav-link">
                        <i className="fa fa-ellipsis-v" />
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={e => props.history.push('/password')}>تغيير كلمة المرور</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={props.logout}>تسجيل الخروج</DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </Nav>
        </Row>
    );
};

export default withRouter(ChatHeader);
