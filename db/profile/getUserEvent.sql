SELECT DISTINCT ON (s.story_id) e.event_title,e.e_urls, e.e_created_on, e.event_id, s.story_id FROM events e
INNER JOIN stories s ON e.story_id = s.story_id
WHERE s.user_id = $1;