drop function if exists add_technology;

create or replace function add_technology(
  _technology_name varchar,
  _technology_type varchar,
  _technology_image varchar
)
  returns int language plpgsql as $$

  declare
    new_technology_id technologies.technology_id%type;

    t_name varchar := _technology_name;
    t_type varchar := _technology_type;
    t_image varchar := _technology_image;

  begin
    insert into
      technologies(
        technology_name,
        technology_type,
        technology_image
      )
    values
      (
        t_name,
        t_type,
        t_image
      )
    returning technology_id into new_technology_id;

    if new_technology_id > 0 then
      return new_technology_id;
    else
      return 0;
    end if;

  end;

$$;

select add_technology('sketch', 'design', 'sketch.img');
select add_technology('vs code', 'development', 'vscode.img');
select add_technology('Sublime Text', 'Devlopment', 'sublime.img');

