const Code = (sequelize, DataTypes) => {
  const model = sequelize.define('code', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    code: { type: DataTypes.STRING, allowNull: false, unique: true },
    expiresAt: { type: DataTypes.DATE, allowNull: false },
    redirectUri: { type: DataTypes.STRING, allowNull: true },
    scope: { type: DataTypes.STRING, allowNull: true }
  })
  model.associate = (models) => {
    models.token.client = models.token.belongsTo(models.client)
    models.token.user = models.token.belongsTo(models.user)
  }
  return model
}

module.exports = Code
