drop function if exists add_project;

create or replace function add_project(_project_title varchar, _project_link varchar, _project_image varchar, _project_type int) returns table(
  p_id int
) language plpgsql as $$
  declare
    new_p_id projects.project_id%type;
    p_title varchar := _project_title;
    p_type int := _project_type;
    p_link varchar := _project_link;
    p_image varchar := _project_image;
  begin

    insert into projects(
      project_title,
      project_link,
      project_image,
      project_type
    )
    VALUES (
      p_title,
      p_link,
      p_image,
      p_type
    ) returning project_id into new_p_id;

    if (new_p_id > 0) then
      return query select p.project_id from projects as p where p.project_id = new_p_id;
    end if;

  end;

$$;

select add_project('www.uz', 'www.uz', 'www.png', 1);
