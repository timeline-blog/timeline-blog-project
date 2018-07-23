UPDATE stories
SET like_count = $1
WHERE story_id = $2;