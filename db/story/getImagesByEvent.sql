SELECT i.images, i.image_id, e.event_id FROM images i
INNER JOIN events e ON i.event_id = e.event_id
WHERE e.event_id = $1;