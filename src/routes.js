import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Landing from './components/Public/Landing';
import Home from './components/Home/Home';
import User from './components/User/User';
import LikedStories from './components/Home/LikedStories';
import Discover from './components/Discover';
import Story from './components/Story/Story';
import SignUp from './components/Public/SignUp';
import MyFollowers from './components/MyFollowers/MyFollowers';
import Following from './components/MyFollowers/Following';

export default (
    <Switch>
        {/* not logged in */}
        <Route exact path="/" component={Landing} />
        <Route path="/signup" component={SignUp} />

        {/* logged in */}
        <Route path="/home" component={Home} />
        <Route path="/liked-stories" component={LikedStories} />
        <Route path="/story" component={Story} />
        <Route path="/profile/:user_id" component={User} />
        <Route path="/following" component={Following} />
        <Route path="/followers" component={MyFollowers} />

        <Route path="/discover" component={Discover} />
    </Switch>
);