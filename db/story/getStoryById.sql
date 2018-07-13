SELECT s.story_title, s.story_description, s.story_category, s.like_count, s.story_id, u.display_name, u.avatar FROM stories s
INNER JOIN users u ON s.user_id = u.user_id
WHERE s.story_id = $1;




-- {                   
--   story_title: asga,
--   story_description: agasg,
--   story_category: gdhsdh,
--   like_count: 6,
--   display_name: jkagahg,
--   avatar: agsgaga,
--   events: [                        
--     {
--       event_title: asgag,
--       event_description: asgasg,
--       e_created_on: 11/22/2018,
--       images: [
--         url,
--         url
--       ]
--     }
--   ]
-- }