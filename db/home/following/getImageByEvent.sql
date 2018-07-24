SELECT DISTINCT ON (e.story_id) i.url, i.story_id, e.e_urls ,e.event_id FROM images i
INNER JOIN events e ON i.event_id = e.event_id
WHERE e.story_id IN (
  SELECT s.story_id FROM stories s
  WHERE s.user_id IN (
    SELECT f.following_id FROM user_follows f
    WHERE f.follower_id = $1
  )
);