-- Get an ID by passed first name and last name

SELECT id FROM customers
    WHERE first_name = 'Joseph'
        AND last_name = 'Wells';
    RETURNING id
-- Get top 10

SELECT c.id FROM customers
    JOIN ON reservations

[`% ${} %`]

Dr. Someone Awesome -- search

Anthony Gonzales


SELECT c_first.id, c_first.first_name, c_last.last_name 
    FROM customers AS c_first
    INNER JOIN customers AS c_last
        ON c_first.id = c_last.id
        
    WHERE c_first.first_name ILIKE '%Anthony%'
        OR c_last.last_name ILIKE '%Anthony%';



 
 
 
 
 
 SELECT c_first.id,
        c_first.first_name as "firstName",
        c_first.last_name as "lastName",
        c_first.phone,
        c_first.notes
        
        FROM customers AS c_first
          INNER JOIN customers AS c_last
          ON c_first.id = c_last.id

        WHERE c_first.first_name ILIKE '%benton%'
            OR c_last.last_name ILIKE '%benton%';


SELECT id,
        first_name as "firstName",
        last_name as "lastName",
        phone,
        notes
        
        FROM customers

        WHERE first_name || ' ' || last_name
            ILIKE '%John Benton%'

            benton}

SELECT  c.id,
        c.first_name AS "firstName",
        c.last_name AS "lastName",
        c.phone,
        c.notes,
        count(*)
        FROM customers AS c
        JOIN reservations AS r
            ON c.id = r.customer_id
        GROUP BY c.id
        ORDER BY COUNT(*) DESC
        LIMIT 10
