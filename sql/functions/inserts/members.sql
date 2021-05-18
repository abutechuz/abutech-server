drop function if exists add_member;

create or replace function add_member(
  _member_fullname varchar,
  _member_picture varchar,
  _member_profession int

) returns int language plpgsql as $$
  declare

    new_member_id members.member_id%type;

    m_fullname varchar := _member_fullname;
    m_picture varchar := _member_picture;
    m_profession int := _member_profession;

  begin
    insert into
      members(
        member_fullname,
        member_picture,
        member_profession
      )
    values
      (
        m_fullname,
        m_picture,
        m_profession
      )
    returning member_id into new_member_id;

    if new_member_id > 0 then
      return new_member_id;
    else
      return 0;
    end if;

  end;

$$;

select add_member('Muhammadsiddiq', 'muhamamdsiddiq.jpg', 1);
