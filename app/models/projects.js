const {
  fetch,
  fetchOne
} = require('../library/database/postgres')

const getProjects = async ({
  query: {
    page,
    limit
  }
}) => {
  
  const SQL = `select 
  p.project_id ,
  p.project_image ,
  pt.project_type_name,
  p.project_techs ,
  p.project_client ,
  p.project_team ,
  p.project_platforms ,
  p.project_industry ,
  p.project_time ,
  p.project_release ,
  
  p.project_title_uz ,
  p.project_title_ru ,
  p.project_title_en ,
  
  p.project_subtitle_uz ,
  p.project_subtitle_ru ,
  p.project_subtitle_en ,
  
  p.project_overview_uz ,
  p.project_overview_ru ,
  p.project_overview_en ,
  
  p.project_idea_uz ,
  p.project_idea_ru ,
  p.project_idea_en ,
  
  p.project_audience_uz ,
  p.project_audience_ru ,
  p.project_audience_en ,
  
  p.project_challenges_uz ,
  p.project_challenges_ru ,
  p.project_challenges_en ,
  
  p.project_result_uz ,
  p.project_result_ru ,
  p.project_result_en ,
  
  p.project_gplay_link ,
  p.project_appstore_link ,
  p.project_web_link ,
  p.project_old_img_src ,
  p.project_new_img_src ,
  p.project_added_at
  
  from projects as p JOIN project_types as pt ON (p.project_type = pt.project_type_id)
  where p.project_visible=true
  order by p.project_id desc
  offset ($1 - 1) * $2 fetch next $2 rows only ;`
  
  return await fetch(SQL, page, limit)
}

const insertProject = async ({
  body: {
    project_image ,
    project_type,
    project_techs ,
    project_client ,
    project_team ,
    project_platforms ,
    project_industry ,
    project_time ,
    project_release ,
    
    project_title_uz ,
    project_title_ru ,
    project_title_en ,
    
    project_subtitle_uz ,
    project_subtitle_ru ,
    project_subtitle_en ,
    
    project_overview_uz ,
    project_overview_ru ,
    project_overview_en ,
    
    project_idea_uz ,
    project_idea_ru ,
    project_idea_en ,
    
    project_audience_uz ,
    project_audience_ru ,
    project_audience_en ,
    
    project_challenges_uz ,
    project_challenges_ru ,
    project_challenges_en ,
    
    project_result_uz ,
    project_result_ru ,
    project_result_en ,
    
    project_gplay_link ,
    project_appstore_link ,
    project_web_link ,
    project_old_img_src ,
    project_new_img_src 
  }
}) => {
  
  const SQL = `insert into projects (
    project_image ,
    project_type,
    project_techs ,
    project_client ,
    project_team ,
    project_platforms ,
    project_industry ,
    project_time ,
    project_release ,
    project_title_uz ,
    project_title_ru ,
    project_title_en ,
    project_subtitle_uz ,
    project_subtitle_ru ,
    project_subtitle_en ,
    project_overview_uz ,
    project_overview_ru ,
    project_overview_en ,
    project_idea_uz ,
    project_idea_ru ,
    project_idea_en ,
    project_audience_uz ,
    project_audience_ru ,
    project_audience_en ,
    project_challenges_uz ,
    project_challenges_ru ,
    project_challenges_en ,
    project_result_uz ,
    project_result_ru ,
    project_result_en ,
    project_gplay_link ,
    project_appstore_link ,
    project_web_link ,
    project_old_img_src ,
    project_new_img_src 
    ) values ($1, $2 , $3 , $4 , $5 , $6 , $7 ,$8 ,$9 , $10 ,$11 , $12 ,$13 ,$14 , $15 , $16 , $17 , $18 ,$19 , $20 , $21 , $22 ,$23 , $24 , $25 , $26 , $27 ,$28 ,$29 , $30 , $31, $32 , $33 , $34 , $35 ) returning *`
  
  return await fetchOne(SQL, 
    project_image ,
    project_type,
    project_techs ,
    project_client ,
    project_team ,
    project_platforms ,
    project_industry ,
    project_time ,
    project_release ,
    
    project_title_uz ,
    project_title_ru ,
    project_title_en ,
    
    project_subtitle_uz ,
    project_subtitle_ru ,
    project_subtitle_en ,
    
    project_overview_uz ,
    project_overview_ru ,
    project_overview_en ,
    
    project_idea_uz ,
    project_idea_ru ,
    project_idea_en ,
    
    project_audience_uz ,
    project_audience_ru ,
    project_audience_en ,
    
    project_challenges_uz ,
    project_challenges_ru ,
    project_challenges_en ,
    
    project_result_uz ,
    project_result_ru ,
    project_result_en ,
    
    project_gplay_link ,
    project_appstore_link ,
    project_web_link ,
    project_old_img_src ,
    project_new_img_src 
    )
}

const deleteProject = async ({
  body: {
    project_id
  }
}) => {
  const SQL = `update projects set project_visible=false where project_id=$1 returning *`
  
  return await fetchOne(SQL, project_id)
  
}


module.exports = {
  getProjects,
  insertProject,
  deleteProject
}