import Api from '@/services/Api'

export default {
  index () {
    return Api().get('subjects')
  },
  post (subject) {
    return Api().post('subjects', subject)
  }
}
