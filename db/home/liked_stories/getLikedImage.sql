SELECT DISTINCT ON (e.story_id) i.url, i.story_id, e.event_id FROM images i
INNER JOIN events e ON i.event_id = e.event_id
WHERE e.story_id IN (
    SELECT l.story_id FROM likes l
    WHERE l.user_id = $1
);