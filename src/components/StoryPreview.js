import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment'

const StoryPreview = (props) => {
    // console.log('props: ', props);

    return (
        <div className="story-preview-wrap">
            
            <div className="story-pv-author-wrap">
                <img src={props.avatar} alt={props.display_name} className="story-pv-author-avatar"/>
                <Link to={`/profile/${props.user_id}`}>{props.display_name}</Link>
            </div>

            <div className="story-pv-header">
                {props.url !== 'No image' ? 
                    <div className="story-pv-image" style={{ backgroundImage: `url(${props.url})` }}/>  
                    :
                    <div className="story-pv-image" style={{ backgroundImage: "url('https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&h=350')" }}/> 
                    }
                <div className="story-pv-title">
                    {props.story_title}
                </div>
            </div>

            <div className="story-pv-body">
                <div className="story-pv-stats">
                    <span className="story-pv-category" to="/category/category-name">{props.story_category}</span>
                    <span className="story-pv-likes-count"><strong>{props.like_count}</strong> likes</span>
                </div>
                <div className="story-pv-info">
                    <span className="story-pv-subtitle">First Event</span>
                    <div className="story-pv-event">
                        <p>{props.event_title}</p>
                        <span>{moment(props.e_created_on).from(moment().format("MM/DD/YY, hh:mm"))}</span>
                    </div>
                </div>
            </div>

            <Link className="story-pv-cta" to={`/story/${props.story_id}`}>Full Story &raquo;</Link>

        </div>
    );
}

export default StoryPreview;