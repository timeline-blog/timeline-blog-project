SELECT DISTINCT ON (s.story_title) s.story_title, s.story_category, s.like_count, u.display_name, u.avatar, u.user_id FROM stories s 
INNER JOIN users u ON s.user_id = u.user_id
INNER JOIN user_follows f ON u.user_id = f.following_id
WHERE f.follower_id = $1;


