INSERT INTO users(
  user_username,
  user_password
)
VALUES
  ('admin', crypt('password', gen_salt('bf')))
;

insert into submittions(
  submittion_fullname,
  submittion_message,
  submittion_phone,
  submittion_email,
  submittion_companyname
) VALUES (
    'Muhamamdsiddiq Kuvandikov',
    'Menga sayt kerak!',
    '+998941233223',
    'example@gmail.com',
    'No company'
  ),
  (
    'Usmon Ma''sudjonov',
    'Menga ham sayt kerak!',
    '+9987654321',
    'usmon@yandex.ru',
    'Yandex'
  ),
    (
    'Muhamamdsiddiq Kuvandikov',
    'Menga World!',
    '+998941233223',
    'World@gmail.com',
    'MFaktor'
  )
;

insert into project_types(project_type_name)
  values
('web'), ('motion'),( 'design');


insert into projects(
  project_title,
  project_link,
  project_image,
  project_type
)
VALUES
  (
    'kun.uz',
    'https://kun.uz',
    'kun-uz.jpg',
    1
  ),
  (
    'daryo.uz',
    'https://daryo.uz',
    'kun-uz.jpg',
    2
  ),
  (
    'www.uz',
    'https://www.uz',
    'kun-uz.jpg',
    3
  )
;

insert into professions (
  profession_name
)
VALUES
  ('Software Developer'),
  ('Scientist'),
  ('Web designer'),
  ('Engineer'),
  ('Network administrator'),
  ('Network Engineer'),
  ('Consultant'),
  ('Computer repair technician'),
  ('Technology specialist'),
  ('Game programmer'),
  ('Designer'),
  ('Computer hardware engineer'),
  ('Webmaster'),
  ('Computer systems analyst'),
  ('Computer scientist'),
  ('Java Developer'),
  ('Test engineer'),
  ('Operator'),
  ('Analyst'),
  ('Information Technology Consultant')
;

insert into members(
  member_fullname,
  member_picture,
  member_profession
)
values
  ('Muhammadsiddiq', 'muhamamdsiddiq.jpg', 1),
  ('Usmon Ma''sudjonov', 'usmon.jpg', 4),
  ('Umar Hamidullayev', 'umar.jpg', 20),
  ('Ilhom', 'ilhom.jpg', 10),
  ('Shuhratbek', 'shuhratbek.jpg', 17),
  ('Rasul', 'rasul.jpg', 6),
  ('Abduqodir', 'abduqodir.jpg', 6),
  ('Jahongir', 'jahongir.jpg', 2),
  ('Jahongir', 'jahongir.jpg', 2)
;

  insert into services(
    service_title,
    service_image,
    service_summary
  )
  VALUES
    ('SMM', 'smm.jpg', 'Lorem ipsum dolor sit amet, consec tetur adipiscing elit.'),
    ('Websites','website.jpg' ,'Lorem r adipiscing elit.'),
    ('Brending','brending.jpg' ,'Lorem ipsum dolor sit amet, consec tetur .'),
    ('motion graphics','motion.jpg' ,'Lorem ipsum dolor sit amet, consec tetur .')
  ;

insert into technologies(
  technology_name,
  technology_type,
  technology_image
)
VALUES
  ('Python', 'programming', 'python.jpg'),
  ('Illustrator', 'Branding', 'branding.jpg'),
  ('Reactjs', 'Front end', 'reactjs.jpg'),
  ('Figma', 'web design', 'python.jpg'),
  ('JavaScript', 'Development', 'javascript.jpg')
;
