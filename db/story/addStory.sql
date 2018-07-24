INSERT INTO stories ( story_title, story_description, story_category, s_created_on, like_count, user_id ) 
VALUES ( $1, $2, $3, $4, 0, $5 )
RETURNING *;