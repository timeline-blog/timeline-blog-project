UPDATE stories 
SET story_title = $1,
    story_description = $2, 
    story_category = $3, 
    s_updated_on = $4
WHERE story_id = $5
RETURNING *;