const { fetch, fetchOne } = require('../library/database/postgres')

const getBlogs = async ({query : { page , limit , lang }}) => {
  lang = lang ?? 'uz'
  const SQL = `select 
  blog_id ,
  blog_body_${lang} blog_body,
  blog_created_at
  from blogs
  offset ($1 - 1) * $2 fetch next $2 rows only ;
  `

  const blogs = await fetch(SQL, page, limit)

  return blogs
}

const insertBlog = async ({body : { blog_body_uz , blog_body_ru , blog_body_en }}) => {
  
  const SQL = `insert into blogs (blog_body_uz , blog_body_ru , blog_body_en ) values ($1,$2,$3) returning *`
  
  const response = await fetchOne(SQL,  blog_body_uz , blog_body_ru , blog_body_en )
  
  return response
}

const setBlog = async ({body : {  blog_body_uz , blog_body_ru , blog_body_en , blog_id }}) => {
  
  const SQL = `update blogs set  blog_body_uz=$1 , blog_body_ru=$2 , blog_body_en=$3 where blog_id=$4 returning *`
  
  const res = await fetchOne(SQL,  blog_body_uz , blog_body_ru , blog_body_en , blog_id )

  return res
}


const deleteBlog = async ({ body: { blog_id } }) => {

  const SQL = `DELETE FROM blogs
  WHERE blog_id=$1 returning *;`

  const blog = await fetchOne(SQL, blog_id)

  return blog
}

module.exports = {
  getBlogs,
  insertBlog,
  setBlog,
  deleteBlog
}
