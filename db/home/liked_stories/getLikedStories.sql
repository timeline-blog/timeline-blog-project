SELECT DISTINCT ON (s.story_title) s.story_title, s.story_category, s.like_count, s.story_id, u.display_name, u.avatar, u.user_id FROM stories s 
INNER JOIN users u ON s.user_id = u.user_id
WHERE s.story_id IN (
  SELECT l.story_id FROM likes l
  WHERE l.user_id = $1
);