module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      studentId: { type: Sequelize.STRING, allowNull: false, unique: true },
      password: { type: Sequelize.STRING, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    })

    await queryInterface.createTable('clients', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      clientId: { type: Sequelize.STRING, allowNull: false, unique: true },
      clientSecret: { type: Sequelize.STRING, allowNull: true },
      userId: { type: Sequelize.INTEGER, allowNull: true },
      redirectUris: { type: Sequelize.ARRAY(Sequelize.TEXT), allowNull: true },
      accessTokenLifetime: { type: Sequelize.INTEGER, allowNull: true },
      refreshTokenLifetime: { type: Sequelize.INTEGER, allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    })

    await queryInterface.createTable('tokens', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      accessToken: { type: Sequelize.STRING, allowNull: false, unique: true },
      accessTokenExpiresAt: { type: Sequelize.DATE, allowNull: false },
      refreshToken: { type: Sequelize.STRING, allowNull: true, unique: true },
      refreshTokenExpiresAt: { type: Sequelize.DATE, allowNull: true },
      scope: { type: Sequelize.STRING, allowNull: true },
      clientId: { type: Sequelize.INTEGER, allowNull: false },
      userId: { type: Sequelize.INTEGER, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    })

    await queryInterface.createTable('codes', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      code: { type: Sequelize.STRING, allowNull: false, unique: true },
      expiresAt: { type: Sequelize.DATE, allowNull: false },
      redirectUri: { type: Sequelize.STRING, allowNull: true },
      scope: { type: Sequelize.STRING, allowNull: true },
      clientId: { type: Sequelize.INTEGER, allowNull: false },
      userId: { type: Sequelize.INTEGER, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    })

    await queryInterface.addConstraint('clients', ['userId'], {
      type: 'foreign key',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })

    await queryInterface.addConstraint('tokens', ['clientId'], {
      type: 'foreign key',
      references: {
        table: 'clients',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })

    await queryInterface.addConstraint('tokens', ['userId'], {
      type: 'foreign key',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })

    await queryInterface.addConstraint('codes', ['clientId'], {
      type: 'foreign key',
      references: {
        table: 'clients',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })

    await queryInterface.addConstraint('codes', ['userId'], {
      type: 'foreign key',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('codes')
    await queryInterface.dropTable('tokens')
    await queryInterface.dropTable('clients')
    await queryInterface.dropTable('users')
  }
}
