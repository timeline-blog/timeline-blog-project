SELECT  e.event_title, e.e_created_on, e.event_id FROM events e
INNER JOIN stories s ON e.story_id = s.story_id
WHERE s.story_id = $1
LIMIT 1;