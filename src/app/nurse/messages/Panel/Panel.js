import React from 'react';
import './Panel.sass';
import {useDispatch, useSelector} from "react-redux";
import {
    FiSearch,
} from "react-icons/fi";
import Conversations from './Conversations';
// import Actions from "../../variables/actions/Actions";
// import Views from "../../variables/Views";
// import Search from "./Search";
// import Log from "./Log";
// import Settings from "./Settings";
// import Selection from "./Selection";
// import CreateGroup from "./CreateGroup";
// import Admin from "./Admin";

const Panel = () => {
    const dispatch = useDispatch();

    // const view = useSelector(state => state.view.panel);

    // const search = text => dispatch({ type: Actions.SEARCH, search: text });

    let View = <Conversations key={Math.random()}/>;

    // if (view === Views.LOG) View = <Log/>;
    // if (view === Views.SETTINGS) View = <Settings/>;
    // if (view === Views.SEARCH) View = <Search/>;
    // if (view === Views.CREATE_GROUP) View = <Selection type={Views.CREATE_GROUP} />;
    // if (view === Views.CREATE_GROUP_2) View = <CreateGroup/>;
    // if (view === Views.EDIT_GROUP) View = <Selection type={Views.EDIT_GROUP} />;
    // if (view === Views.RTC_GROUP_CREATE) View = <Selection type={Views.RTC_GROUP_CREATE} />;
    // if (view === Views.RTC_ADD_USERS) View = <Selection type={Views.RTC_ADD_USERS} />;
    // if (view === Views.ADMIN) View = <Admin/>;

    return (
        <div className="panel">
            <div className="header header-panel">
                <div className="search">
                    {/* <input type="text" placeholder="Search" onChange={e => search(e.target.value)} /> */}
                    <input type="text" placeholder="Search"  />
                    <div className="icon">
                        <FiSearch/>
                    </div>
                </div>
            </div>
            {View}
        </div>
    );
};

export default Panel;
