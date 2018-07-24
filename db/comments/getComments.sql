SELECT c.event_id, u.display_name, u.avatar, u.user_id, c.comment_id, c.comment, c.c_created_on FROM comments c
INNER JOIN users u ON c.user_id = u.user_id
WHERE c.event_id = $1;