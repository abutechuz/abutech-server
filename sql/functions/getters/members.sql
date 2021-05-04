drop function if exists get_members;

create or replace function get_members(_page int default 1, _limit int default 4) returns TABLE(
  member_id int,
  member_fullname varchar,
  member_picture varchar,
  member_profession varchar

) language plpgsql as $$
  declare
    m_page int := _page;
    m_limit int := _limit;
  begin
    return query
    select
      m.member_id as member_id,
      m.member_fullname as member__fullname,
      m.member_picture as member_picture,
      p.profession_name as member_profession
    from members as m join professions as p on m.member_id = p.profession_id where m.member_active = True offset(m_page - 1) * m_limit limit m_limit;

  end;

$$;
