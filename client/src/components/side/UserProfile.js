import React from "react";
import Avatar from 'components/Avatar';
import { Row } from "reactstrap";

/**
 * UserProfile Component.
 */
const UserProfile = props => (

    <div className={props.open ? 'side-profile open' : 'side-profile'}>

        <Row className="heading">
            <div className="mr-2 nav-link" onClick={props.toggle}>
                <i className="fa fa-arrow-right" />
            </div>
            <div>{props.contact.name}</div>
        </Row>

        <div className="d-flex flex-column overflow-auto">
            <Avatar src={props.contact.avatar}/>
            <div className="bg-white px-3 py-2">
                <label className="text-muted">رسالة الحالة</label>
                <p>{props.contact.about ? props.contact.about : 'أهلًا، أنا أستعمل محادثة حسوب'}</p>
            </div>
        </div>

    </div>

);

export default UserProfile;