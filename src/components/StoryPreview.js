import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment'

import travelImg from '../category-images/travel.png';
import musicImg from '../category-images/music.png';
import foodImg from '../category-images/food.png';
import personalImg from '../category-images/personal.png';
import newsImg from '../category-images/news.png';
import sportsImg from '../category-images/sports.png';
import educationImg from '../category-images/education.png';
import artImg from '../category-images/art.png';
import styleImg from '../category-images/style.png';
import entertainmentImg from '../category-images/entertainment.png';

const StoryPreview = (props) => {
    //  console.log('props: ', props.url);

    let shortEventTitle = props.event_title.length < 28 ? props.event_title : props.event_title.substring(0, 25) + '...';
    let defaultImages = {
        travel: travelImg,
        music: musicImg,
        food: foodImg,
        personal: personalImg,
        news: newsImg,
        sports: sportsImg,
        education: educationImg,
        art: artImg,
        style: styleImg,
        entertainment: entertainmentImg
    }

    return (
        <div className="story-preview-wrap">
            
            <div className="story-pv-author-wrap">
                <Link to={`/profile/${props.user_id}`}>
                    <img src={props.avatar} alt={props.display_name} className="story-pv-author-avatar"/>
                </Link>
                <Link to={`/profile/${props.user_id}`}>{props.display_name}</Link>
            </div>

            <div className="story-pv-header">
                {props.url !== 'No image' && props.url[0] ? 
                    <div className="story-pv-image" style={{ backgroundImage: `url(${props.url[0]})` }}/>  
                    :
                    <div className="story-pv-image" style={{ backgroundImage: `url('${defaultImages[props.story_category.toLowerCase()]}')` }}/> 
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
                        {/* <p>{props.event_title}</p> */}
                        <p>{shortEventTitle}</p>
                        {props.event_title === 'No events' 
                        ? null
                        : <span>{moment(props.e_created_on).from(moment().format("MM/DD/YY, hh:mm"))}</span>
                        }
                        
                    </div>
                </div>
            </div>

            <Link className="story-pv-cta" to={`/story/${props.story_id}`}>Full Story &raquo;</Link>

        </div>
    );
}

export default StoryPreview;