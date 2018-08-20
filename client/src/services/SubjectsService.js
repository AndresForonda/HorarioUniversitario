import Api from '@/services/Api'

export default {
  index () {
    return Api().get('subjects')
  },
  post (subject) {
    return Api().post('subjects', subject)
  },
  put (subject) {
    console.log(subject)
    return Api().put('subjects', subject)
  },
  delete (subjectId) {
    console.log(subjectId)
    return Api().delete(`subjects/${subjectId}`)
  }
}
