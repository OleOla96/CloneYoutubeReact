import HeaderOnly from '../layouts/HeaderOnly'

// Pages
import Login from '../pages/LoginRegister/login'
import Register from '../pages/LoginRegister/register'
import Home from '../pages/Home/home'
import Watch from '../pages/Watch/watch'
import BoardAdmin from '../components/Roles/admin'
import CreateContent from '../pages/HandleConntent/create'
import EditContent from '../pages/HandleConntent/edit'
import MyChannel from '../pages/Channel/myChannel'
import WatchVideoPrivate from '../pages/Channel/watchVideoPrivate'
import ManageVideos from '../pages/Channel/manageVideos'

export const publicRoutes = [
  { path: '/', component: Home },
  { path: 'watch/:id', component: Watch, layout: HeaderOnly },
  { path: 'login', component: Login, layout: null },
  { path: 'register', component: Register, layout: HeaderOnly },
  { path: 'mychannel', component: MyChannel },
  { path: 'managevideos', component: ManageVideos, layout: HeaderOnly },
  { path: 'managevideos/editcontent/:id', component: EditContent, layout: HeaderOnly },
  { path: 'watchvideoprivate/:id', component: WatchVideoPrivate },
  { path: 'createcontent', component: CreateContent, layout: HeaderOnly },
  { path: 'roles/admin', component: BoardAdmin },
  { path: '*', component: Home },
]
