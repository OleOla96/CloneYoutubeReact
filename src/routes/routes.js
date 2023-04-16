// import config from '~/config';

// Layouts
// import { HeaderOnly } from '~/layouts';

// Pages
import Login from "../components/Pages/login"
import Register from "../components/Pages/register"
import Home from "../components/Pages/home"
import Watch from "../components/Pages/Watch/Watch"
import BoardModerator from "../components/Roles/moderator"
import BoardAdmin from "../components/Roles/admin"
import CreateContent from "../components/HandleConntent/Create/create"
import EditContent from "../components/HandleConntent/Edit/edit"
import MyChannel from "../components/Channel/myChannel"
import WatchVideoPrivate from "../components/Channel/watchVideoPrivate"
import ManageVideos from "../components/Channel/manageVideos"

// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: 'watch/:id', component: Watch },
    { path: 'login', component: Login, layout: null },
    { path: 'register', component: Register, layout: null },
    { path: 'mychannel', component: MyChannel },
    { path: 'managevideos', component: ManageVideos },
    { path: 'managevideos/editcontent/:id', component: EditContent },
    { path: 'watchvideoprivate/:id', component: WatchVideoPrivate },
    { path: 'createcontent', component: CreateContent },
    { path: 'roles/mod', component: BoardModerator },
    { path: 'roles/admin', component: BoardAdmin },
    { path: '*', component: Home },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
