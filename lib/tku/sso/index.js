const Promise = require('bluebird')
const request = require('request')

Promise.promisifyAll(request)

const authorize = async (studentId, password) => {
  const jar = request.jar()
  await request.getAsync('https://sso.tku.edu.tw/NEAI/logineb.jsp?myurl=http://sso.tku.edu.tw/aissinfo/emis/tmw0012.aspx', { jar })
  await request.getAsync('https://sso.tku.edu.tw/NEAI/ImageValidate', { jar })
  const vidcode = (await request.postAsync('https://sso.tku.edu.tw/NEAI/ImageValidate', { jar, form: { outType: 2 } })).body
  const data = {
    myurl: 'https://sso.tku.edu.tw/aissinfo/emis/TMWS020.aspx',
    ln: 'zh_TW',
    embed: 'No',
    logintype: 'logineb',
    username: studentId,
    password: password,
    'loginbtn': '登入'
  }
  data.vidcode = vidcode.trim()
  const result = await request.postAsync('https://sso.tku.edu.tw//NEAI/login2.do?action=EAI', { jar, form: data })
  console.log(result)
  return result.statusCode === 302
}

module.exports = {
  authorize
}
