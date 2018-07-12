SELECT DISTINCT ON (e.story_id) i.images, i.story_id, e.event_id FROM images i
INNER JOIN events e ON i.event_id = e.event_id
WHERE e.story_id IN (
  SELECT s.story_id FROM stories s
  WHERE s.user_id = $1
);