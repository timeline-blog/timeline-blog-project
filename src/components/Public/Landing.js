
import React, {Component, Fragment} from 'react';

import Discover from '../Discover';

class Landing extends Component {
    render() {
        return (
            <Fragment>
            <div className="outer-wrap landing-wrap">
                <section className="welcome-wrap">
                    <header className="welcome-header">
                        <h1 className="welcome-title">Welcome to App Name</h1>
                        {/* big logo */}
                        <div className="login-wrap">
                            <button className="btn login-btn">Sign Up</button>
                            <button className="btn border-btn login-btn">Log In</button>
                        </div>
                    </header>
                </section>
            </div>
            <Discover />
            </Fragment>
        );
    }
}

export default Landing;

