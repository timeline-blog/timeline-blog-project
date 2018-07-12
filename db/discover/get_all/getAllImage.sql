SELECT DISTINCT ON (e.story_id) i.images, i.story_id, e.event_id FROM images i
INNER JOIN events e ON i.event_id = e.event_id;