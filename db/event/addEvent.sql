INSERT INTO events ( event_title, event_description, e_created_on, user_id, story_id,e_urls ) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *;
