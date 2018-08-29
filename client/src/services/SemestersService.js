import Api from '@/services/Api'

export default {
  index () {
    return Api().get('semesters')
  },
  put (semester) {
    console.log(semester)
    return Api().put('semesters', semester)
  }
}
