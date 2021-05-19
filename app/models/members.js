const { fetch, fetchOne } = require('../library/database/postgres')

const getMembers = async (page, limit) => {
  const SQL = `
  select
    m.member_id as member_id,
    m.member_fullname as member_fullname,
    m.member_picture as member_picture,
    p.profession_name as member_profession
  from
    members as m
  join professions as p on m.member_profession = p.profession_id 
   offset ($1 - 1) * $2 fetch next $2 rows only;
  `

  const members = await fetch(SQL, page, limit)

  return members
}

const addMember = async (req) => {
  const {
    fullName,
    picture,
    profession
  } = req.body


  const SQL = `
    insert into members(
      member_fullname,
      member_picture,
      member_profession
    )
    values ($1,$2,$3) returning * ;
    `

    const member = await fetchOne(SQL, fullName, picture, profession)

    return member
  }

  const deleteMember = async (req) => {
    const { member_id } = req.body

    const SQL = `
      delete from members where member_id = $1 returning *;
    `

    const deletedMember = await fetch(SQL, member_id)

    return deletedMember
  }

  module.exports = {
    getMembers,
    addMember,
    deleteMember
  }

