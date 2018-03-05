const Client = (sequelize, DataTypes) => sequelize.define('client', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  clientId: { type: DataTypes.STRING, allowNull: false, unique: true },
  clientSecret: { type: DataTypes.STRING, allowNull: true },
  redirectUris: { type: DataTypes.ARRAY(DataTypes.TEXT), allowNull: true },
  /* TODO: specific client grants type limit.
    grants { type: Sequelize.ENUM('code', 'authorization_code', 'token', 'password', 'client_credentials', 'refresh_token', 'Bearer')
  */
  accessTokenLifetime: { type: DataTypes.INTEGER, allowNull: true },
  refreshTokenLifetime: { type: DataTypes.INTEGER, allowNull: true }
})

module.exports = Client
