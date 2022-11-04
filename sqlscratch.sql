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

