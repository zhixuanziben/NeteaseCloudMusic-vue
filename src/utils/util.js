import axios from 'axios'

function likeComment (id, cid, t, type) {
  axios.get(`http://localhost:3000/comment/like?id=${id}&cid=${cid}&t=${t}&type=${type}`).then((res) => {
    console.log(res)
  })
}

export {likeComment}
