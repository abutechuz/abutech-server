drop function if exists add_service;

create or replace function add_service(
    _image varchar,

    _title_uz varchar,
    _summary_uz varchar,

    _title_ru varchar,
    _summary_ru varchar,

    _title_en varchar,
    _summary_en varchar
)
  returns table(
    p_id int
) language plpgsql as $$

  declare

    new_s_id services.service_id%type;
    s_image varchar := _image;

    s_title_uz varchar := _title_uz;
    s_summary_uz varchar := _summary_uz;

    s_title_ru varchar := _title_ru;
    s_summary_ru varchar := _summary_ru;

    s_title_en varchar := _title_en;
    s_summary_en varchar := _summary_en;

  begin

    insert into services(
      service_image,

      service_title_uz,
      service_summary_uz,

      service_title_ru,
      service_summary_ru,

      service_title_en,
      service_summary_en
    )
    VALUES
    (
      s_image,

      s_title_uz,
      s_summary_uz,

      s_title_ru,
      s_summary_ru,

      s_title_en,
      s_summary_en

    ) returning service_id into new_s_id;


    if (new_s_id > 0) then
      return query select s.service_id from services as s where s.service_id = new_s_id;
    end if;

  end;

$$;


select add_service(
  'image',
  'uz title', 'uz summary',
  'ru title', 'ru summary',
  'en title', 'en summary'
);
