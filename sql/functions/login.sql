drop function if exists login_user;

create or replace function login_user(_username varchar, _password varchar) returns int language plpgsql as $$
  declare
    login_user users%rowtype;
    v_username varchar := _username;
    v_password varchar := _password;
  begin
  select
    user_id,
    user_username
  from
    users as u
  where u.user_username = v_username and
    u.user_password = crypt(v_password, u.user_password)
  into
    login_user;

  if login_user is null then
    return 0;
  end if;

  return login_user.user_id;

  end;

$$;
