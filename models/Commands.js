module.exports = (sequelize, DataTypes) => {
    return sequelize.define('commands', {
		name: {
			type: DataTypes.STRING,
			unique: true,
		},
		type: DataTypes.STRING,
        content: DataTypes.TEXT,
        num_usage: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
		    allowNull: false
        }
	}, {
		timestamps: false,
	});
}