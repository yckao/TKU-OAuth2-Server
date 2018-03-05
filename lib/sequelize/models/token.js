const Token = (sequelize, DataTypes) => {
  const model = sequelize.define('token', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    accessToken: { type: DataTypes.STRING, allowNull: false, unique: true },
    accessTokenExpiresAt: { type: DataTypes.DATE, allowNull: false },
    refreshToken: { type: DataTypes.STRING, allowNull: true, unique: true },
    refreshTokenExpiresAt: { type: DataTypes.DATE, allowNull: true },
    scope: { type: DataTypes.STRING, allowNull: true }
  })
  model.associate = (models) => {
    models.token.client = models.token.belongsTo(models.client)
    models.token.user = models.token.belongsTo(models.user)
  }
  return model
}

module.exports = Token
