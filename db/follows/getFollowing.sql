SELECT u.display_name, u.avatar, u.user_id FROM users u
WHERE u.user_id IN (
  SELECT f.following_id FROM user_follows f
  WHERE f.follower_id = $1
);