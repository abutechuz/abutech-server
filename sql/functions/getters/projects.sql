drop function if exists get_projects;

create or replace function get_projects(_page int, _limit int) returns table(
  project_id int,
  project_title varchar,
  project_link varchar,
  project_image varchar,
  project_type varchar

) language plpgsql as $$

  declare
    p_page int := _page;
    p_limit int := _limit;
  begin

    return query
      select
        p.project_id as project_id,
        p.project_title as project_title,
        p.project_link as project_link,
        p.project_image as project_image,
        pt.project_type_name as project_type
      from
        projects as p
      join
        project_types as pt
      on p.project_id = pt.project_type_id
      where project_visible = True
      offset(p_page - 1) * p_limit limit p_limit;
  end;
$$;

