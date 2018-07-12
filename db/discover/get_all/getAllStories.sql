SELECT s.story_title, s.story_category, s.like_count, s.story_id, u.display_name, u.avatar, u.bio FROM stories s 
INNER JOIN users u ON s.user_id = u.user_id;;