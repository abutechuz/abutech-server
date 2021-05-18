drop function if exists get_professions;

create or replace function get_professions() returns table(
  id int,
  profession_name varchar
) language plpgsql as $$


  begin
  return query
      select p.profession_id as id, p.profession_name as profession_name from professions as p;
  end;

$$;

