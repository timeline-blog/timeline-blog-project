import React from 'react';
import { Link } from 'react-router-dom';

const StoryPreview = (props) => {
    // console.log('props: ', props);

    return (
        <div className="story-preview-wrap">
            
            <div className="story-pv-author-wrap">
                <img src={props.avatar} alt="" className="story-pv-author-avatar"/>
                {/* *TO DO: link path should have user id */}
                <Link to={`/profile/${props.user_id}`}>{props.display_name}</Link>
            </div>

            <div className="story-pv-header">
                <div className="story-pv-image" style={{ backgroundImage: "url('https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&h=350')" }}/>
                <div className="story-pv-title">
                    {props.story_title}
                </div>
            </div>

            <div className="story-pv-body">
                <div className="story-pv-stats">
                    <Link className="story-pv-category" to="/category/category-name">{props.story_category}</Link>
                    <span className="story-pv-likes-count"><strong>{props.like_count}</strong> likes</span>
                </div>
                <div className="story-pv-info">
                    <span className="story-pv-subtitle">First Event</span>
                    <div className="story-pv-event">
                        <p>{props.event_title}</p>
                        <span>{props.e_created_on}</span>
                    </div>
                </div>
            </div>

            <Link className="story-pv-cta" to={`/story/${props.story_id}`}>Full Story &raquo;</Link>

        </div>
    );
}

export default StoryPreview;