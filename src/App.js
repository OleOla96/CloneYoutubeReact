import { BrowserRouter, Routes, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap"

import Layout1 from "./layouts/Layout1"
import Layout2 from "./layouts/Layout2"
import Login from "./components/login.component"
import Register from "./components/register.component"
import Home from "./components/home.component"
import Learn from "./components/learn.component"
import ContentPrivate from "./components/show-content-private.component"
import Profile from "./components/profile.component"
import BoardUser from "./components/board-user.component"
import BoardModerator from "./components/board-moderator.component"
import BoardAdmin from "./components/board-admin.component"
import CreateContent from "./components/create-content.component"
import MyContents from "./components/my-contents.component"
import EditContent from "./components/edit-content.component"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout1 />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="learn/:id" element={<Learn />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="myprofile" element={<Profile />} />
          <Route path="mycontents" element={<Layout2 />} >
            <Route index element={<MyContents />} />
            <Route path="editcontent/:id" element={<EditContent />} />
          </Route>
          <Route path="createcontent" element={<CreateContent />} />
          <Route path="roles/user" element={<BoardUser />} />
          <Route path="roles/user/:id" element={<ContentPrivate />} />
          <Route path="roles/mod" element={<BoardModerator />} />
          <Route path="roles/admin" element={<BoardAdmin />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App