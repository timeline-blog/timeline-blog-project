SELECT * FROM users WHERE display_name ILIKE '%' || $1 || '%';