SELECT DISTINCT ON (s.story_id) e.event_title, e.e_created_on, e.event_id,e.e_urls, s.story_id FROM events e
INNER JOIN stories s ON e.story_id = s.story_id
WHERE e.story_id IN (
  SELECT l.story_id FROM likes l
  WHERE l.user_id = $1
);