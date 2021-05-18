drop function if exists insert_submittion;

create or replace function insert_submittion (
  _fullname varchar,
  _message varchar,
  _phone varchar,
  _email varchar,
  _companyname varchar
) returns varchar language plpgsql as $$
  declare
    _new_submittion submittions%rowtype;
    _submittion_fullname varchar := _fullname;
    _submittion_message varchar := _message;
    _submittion_phone varchar := _phone;
    _submittion_email varchar := _email;
    _submittion_companyname varchar := _companyname;
  begin

    insert into submittions(submittion_fullname,submittion_message,submittion_phone,submittion_email,submittion_companyname)
      VALUES
    (_submittion_fullname, _submittion_message, _submittion_phone, _submittion_email , _submittion_companyname);

    return 'INSERTED';

  end;

$$;

select insert_submittion('s','s','d','g','l');
