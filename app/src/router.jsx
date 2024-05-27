import { FC } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { FullPost } from "./pages/fullpost"
import { Dashboard } from "src/pages/dashboard"
import { Friends } from "./pages/friends"
import { Profile } from "./pages/profile"

export const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Dashboard />
        </Route>
        <Route path="/read-post/:id" >
          <FullPost />
        </Route>
        <Route path="/friends">
          <Friends />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
