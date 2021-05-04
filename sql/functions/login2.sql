drop function if exists login_user;

create or replace function login_user(_username varchar, _password varchar) returns TABLE(
  user_id int,
  user_username username
) language plpgsql as $$
  declare
    v_username varchar := _username;
    v_password varchar := _password;
  begin
    return query
      select
        u.user_id as user_id,
        u.user_username as user_username
      from
        users as u
      where u.user_username = v_username and
        u.user_password = crypt(v_password, u.user_password)
      ;
  end;

$$;

select * from login_user('admin', 'password');
