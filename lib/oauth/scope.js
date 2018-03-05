const verifyScope = (token, scope) => {
  if (!token.scope) {
    return false
  }
  let requestedScopes = scope.split(' ')
  let authorizedScopes = token.scope.split(' ')
  return requestedScopes.every(s => authorizedScopes.indexOf(s) >= 0)
}

module.exports = {
  verifyScope
}
