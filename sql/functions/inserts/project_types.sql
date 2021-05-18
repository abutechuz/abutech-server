drop function if exists add_project_type;

create or replace function add_project_type(_project_type varchar) returns int language plpgsql as $$
  declare

    new_type_id project_types.project_type_id%type;
    p_name varchar := _project_type;

  begin
    insert into
      project_types(project_type_name)
    values
      (p_name)
    returning project_type_id into new_type_id;

    if new_type_id > 0 then
      return new_type_id;
    else
      return 0;
    end if;

  end;

$$;

select add_project_type('hacking');

