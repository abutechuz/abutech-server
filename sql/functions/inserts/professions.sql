drop function if exists add_profession;

create or replace function add_profession(_profession varchar) returns int language plpgsql as $$
  declare

    new_profession_id professions.profession_id%type;
    p_name varchar := _profession;

  begin
    insert into
      professions(profession_name)
    values
      (p_name)
    returning profession_id into new_profession_id;

    if new_profession_id > 0 then
      return new_profession_id;
    else
      return 0;
    end if;

  end;

$$;

select add_profession('hacking');

