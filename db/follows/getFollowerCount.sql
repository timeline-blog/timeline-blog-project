SELECT COUNT(follower_id) FROM user_follows
WHERE following_id = $1;