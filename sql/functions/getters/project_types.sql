drop function if exists get_project_types;

create or replace function get_project_types() returns table(
  id int,
  project_type_name varchar
) language plpgsql as $$


  begin
  return query
      select p.project_type_id as id, p.project_type_name as project_type_name from project_types as p;
  end;

$$;

