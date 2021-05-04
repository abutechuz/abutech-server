drop function if exists get_services;

create or replace function get_services(_page int default 1, _limit int default 4, _lang varchar default 'uz') returns table(

  service_id int,
  service_image varchar,
  service_title varchar,
  service_summary varchar

) language plpgsql as $$
  declare

    -- s_page int := _page;
    -- s_limit int := _limit;
    -- s_lang varchar := _lang;

  begin

    if _lang = 'uz' then
      return query
            select
              s.service_id as service_id,
              s.service_image as service_image,
              s.service_title_uz as service_title,
              s.service_summary_uz as service_summary
            from
              services as s
            where service_active = True
            order by service_id desc
            offset(_page - 1) * _limit limit _limit;

    end if;

        if _lang = 'en' then
      return query
            select
              s.service_id as service_id,
              s.service_image as service_image,
              s.service_title_en as service_title,
              s.service_summary_en as service_summary
            from
              services as s
            where service_active = True
            order by service_id desc
            offset(_page - 1) * _limit limit _limit;

    end if;

        if _lang = 'ru' then
      return query
            select
              s.service_id as service_id,
              s.service_image as service_image,
              s.service_title_ru as service_title,
              s.service_summary_ru as service_summary
            from
              services as s
            where service_active = True
            order by service_id desc
            offset(_page - 1) * _limit limit _limit;

    end if;

  end;
$$;
