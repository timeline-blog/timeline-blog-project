
import React, {Component, Fragment} from 'react';

class Landing extends Component {
    render() {
        return (
            <Fragment>
            <div className="outer-wrap landing-wrap">
                <section className="welcome-wrap">
                    <header className="welcome-header">
                        <h1 className="welcome-title">Welcome to App Name</h1>
                        {/* big logo */}
                    </header>

                    <div className="login-wrap">
                        <header className="login-header">
                            <span className="login-tab selected-tab">Sign Up</span>
                            <span className="login-tab">Log In</span>
                        </header>
                        <div className="login-form">
                            <div className="field-group">
                                <label htmlFor="">Email</label>
                                <input className="main-input" type="text"/>
                            </div>
                            <div className="field-group">
                                <label htmlFor="">Password</label>
                                <input className="main-input" type="password"/>
                            </div>

                        </div>
                    </div>
                </section>

            </div>
            {/* <Discover /> */}
            </Fragment>
        );
    }
}

export default Landing;

