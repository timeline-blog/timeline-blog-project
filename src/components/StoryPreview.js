import React from 'react';
import { Link } from 'react-router-dom';

const StoryPreview = (props) => {
    return (
        <div className="story-preview-wrap">
            
            <div className="story-pv-author-wrap">
                <img src="" alt="" className="story-pv-author-avatar"/>
                {/* *TO DO: link path should have user id */}
                <Link to="/profile/user_id">John Doe</Link>
            </div>

            <div className="story-pv-header">
                <div className="story-pv-image" style={{ backgroundImage: "url('https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&h=350')" }}/>
                <div className="story-pv-title">
                    What if the story title is super long kinda like this
                </div>
            </div>

            <div className="story-pv-body">
                <div className="story-pv-stats">
                    <Link className="story-pv-category" to="/category/category-name">Category</Link>
                    <span className="story-pv-likes-count"><strong>372</strong> likes</span>
                </div>
                <div className="story-pv-info">
                    <span className="story-pv-subtitle">First Event</span>
                    <div className="story-pv-event">
                        <p>Event title here</p>
                        <span>Jul 30, 2018</span>
                    </div>
                </div>
            </div>

            <Link className="story-pv-cta" to="/story/story-id">Full Story &raquo;</Link>

        </div>
    );
}

export default StoryPreview;