export const getToken = state => state.auth.token
export const getAuth = state => state.auth.info

export const getmessage = state => state.msg.message
export const getModal = state => state.modal
export const getModalConfirm = state => state.modal.confirm

export const getUser = state => state.user

export const getTags = state => state.tags.tags

export const getArticle = state => state.articlePage.page
export const getArticleDelete = state => state.articlePage.deleted
export const getArticleCollect = state => state.articlePage.collected
export const getArticleOwn = state => state.articlePage.own
export const getArticleList = state => state.articleList
export const getArticleUser = state => state.articleUser
export const getArticleTogether = state => state.articleTogether

export const getCommentList = state => state.comment.list

export const getPhotoList = state => state.photo

export const getPhotoUser = state => state.photoUser

export const getWebList = state => {
  let list = state.websites.list
  let tempList = []
  if (list.length) {
    tempList.push({ type: list[0].type, data: [list[0]] })
    for (let index = 1; index < list.length; index++) {
      let tempType = tempList.map(item => item.type)
      let t = tempType.indexOf(list[index].type)
      if (t > -1) {
        tempList[t].data.push(list[index])
      } else {
        tempList.push({ type: list[index].type, data: [list[index]] })
      }
    }
  }
  console.log(tempList)
  return tempList
}
