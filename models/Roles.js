module.exports = (sequelize, DataTypes) => {
    return sequelize.define('roles', {
		name: {
			type: DataTypes.STRING,
			unique: true,
		},
		desc: DataTypes.TEXT,
		isAdmin: DataTypes.BOOLEAN
	}, {
		timestamps: false,
	});
}