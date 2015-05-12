DELETE FROM rings
WHERE id IN (SELECT id
             FROM (SELECT
                     id,
                     row_number()
                     OVER (PARTITION BY title, url
                       ORDER BY id) AS rnum
                   FROM rings) t
             WHERE t.rnum > 1);
