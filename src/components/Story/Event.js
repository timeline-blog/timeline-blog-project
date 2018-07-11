import React, { Component } from 'react'

class Event extends Component {
    render() {
        return (
            <div className="event-wrap collapsed">
                <span className="connector top-connector"></span>

                <header className="event-header">
                    <h2 className="event-title">Event Title Goes Here</h2>
                    <p className="event-date">4 days ago</p>
                </header>

                <div className="event-gallery">
                    <div 
                        className="event-image" 
                        style={{ backgroundImage: 'url(https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&h=350)'}}>
                    </div>
                    <div 
                        className="event-image" 
                        style={{ backgroundImage: 'url(https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&h=350)'}}>
                    </div>
                    <div 
                        className="event-image" 
                        style={{ backgroundImage: 'url(https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&h=350)'}}>
                    </div>
                    <div 
                        className="event-image" 
                        style={{ backgroundImage: 'url(https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&h=350)'}}>
                    </div>
                </div>

                <div className="event-content">
                    <p>Vestibulum feugiat condimentum magna a tincidunt. Pellentesque nec blandit ligula. Praesent efficitur maximus mollis. Suspendisse dictum rhoncus tellus eu ullamcorper. Praesent ac tincidunt ex, sed sagittis justo. Suspendisse pharetra auctor quam nec fringilla. Donec non turpis aliquam, ultricies arcu sed, facilisis sapien. Sed nec eros sed est tincidunt laoreet eget quis risus. In laoreet neque quis tortor malesuada, vitae blandit risus cursus. In dictum dignissim metus sed bibendum. Proin purus turpis, malesuada ac volutpat id, tincidunt eu ante. Maecenas mollis leo et nisi viverra dapibus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>

                    <div className="event-comments-section">
                        <div className="event-comments-header">12 comments</div>

                        <div className="comments-list">
                            <div className="comment">
                                <img className="comment-avatar"/>
                                <div className="comment-body">
                                    <p className="comment-date">2 days ago</p>
                                    <p className="comment-author">John Doe:</p>
                                    <p className="comment-text">This is a comment. Proin purus turpis, malesuada ac volutpat id, tincidunt eu ante. Maecenas mollis leo et nisi viverra dapibus.</p>
                                </div>
                            </div>
                            <div className="comment">
                                <img className="comment-avatar"/>
                                <div className="comment-body">
                                    <p className="comment-date">2 days ago</p>
                                    <p className="comment-author">John Doe: </p>
                                    <p className="comment-text">This is a comment. Proin purus turpis, malesuada ac volutpat id, tincidunt eu ante. Maecenas mollis leo et nisi viverra dapibus.</p>
                                </div>
                            </div>
                            <div className="comment">
                                <img className="comment-avatar"/>
                                <div className="comment-body">
                                    <p className="comment-date">2 days ago</p>
                                    <p className="comment-author">John Doe:</p>
                                    <p className="comment-text">This is a comment. Proin purus turpis, malesuada ac volutpat id, tincidunt eu ante. Maecenas mollis leo et nisi viverra dapibus.</p>
                                </div>
                            </div>
                        </div>

                        <div className="comment-form-wrap">
                            <textarea name="" id="" className="comment-form" placeholder="Leave a comment..."></textarea>
                            <button className="btn">Post Comment</button>
                        </div>

                    </div>
                </div>

                {/* button needs the event id so it can be passed to expand/collapse event handler to only act on */}
                <div className="content-fade">
                    <button data-eventid="1" className="expand-event">Expand +</button>
                </div>

                <span className="connector bottom-connector"></span>
            </div>
        );
    }
}

export default Event;