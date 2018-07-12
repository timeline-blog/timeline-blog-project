UPDATE users 
SET display_name = $1,
    bio = $2,
    avatar = $3
WHERE user_id = $4
RETURNING *;