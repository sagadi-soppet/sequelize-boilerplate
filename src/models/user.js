'use strict';
const { Model } = require('sequelize');
const { v4 } = require('uuid');
const parseReturn = require('../utils/parseReturn');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate() {
			// define association here
		}

		static async create(email, password) {
			try {
				const result = await this.create({
					id: v4(),
					email,
					password,
				});

				if (!result)
					return parseReturn(
						undefined,
						`Failed to create your account using email: ${email}`
					);

				return parseReturn(result);
			} catch (error) {
				console.log(`[GUBED] --- error: ${error.message}`);
				return parseReturn(
					undefined,
					'Something went wrong while creating your account, try again!'
				);
			}
		}

		static async update(userId, data) {
			try {
				const user = await this.findByPk(userId);
				if (!user)
					return parseReturn(
						undefined,
						`Unable to find your account ${userId}`
					);

				const result = await user.update(data);
				if (!result)
					return parseReturn(
						undefined,
						`Unable to update your account ${userId}`
					);

				return parseReturn(result);
			} catch (error) {
				console.log(`[GUBED] --- error: ${error.message}`);
				return parseReturn(
					undefined,
					'Something went wrong while trying to update your account, try again!'
				);
			}
		}

		static async me(userId) {
			try {
				const user = await this.findByPk(userId);
				if (!user)
					return parseReturn(
						undefined,
						`Unable to find your account ${userId}`
					);

				return parseReturn(user);
			} catch (error) {
				console.log(`[GUBED] --- error: ${error.message}`);
				return parseReturn(
					undefined,
					'Something went wrong while trying to get your account, try again!'
				);
			}
		}

		static async destroy(userId) {
			try {
				const user = await this.findByPk(userId);
				if (!user)
					return parseReturn(
						undefined,
						`Unable to find your account ${userId}`
					);

				const result = user.destroy(userId);
				if (result)
					return parseReturn(
						undefined,
						`Unable to delete your account ${userId}`
					);

				return parseReturn({});
			} catch (error) {
				console.log(`[GUBED] --- error: ${error.message}`);
				return parseReturn(
					undefined,
					'Something went wrong while trying to get your account, try again!'
				);
			}
		}
	}
	User.init(
		{
			email: DataTypes.STRING,
			password: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'User',
		}
	);
	return User;
};
