drop function if exists get_techs;

create or replace function get_techs() returns table(
  technology_id int,
  technology_name varchar,
  technology_type varchar,
  technology_image varchar

) language plpgsql as $$

  begin
    return query
          select
            t.technology_id as technology_id,
            t.technology_name as technology_name,
            t.technology_type as technology_type,
            t.technology_image as technology_image
          from technologies as t;
  end;

$$;
