import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database/dbConfig';

class Person extends Model {
    public registration!: number;
    public name!: string;
    public age!: number;
    public email!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Person.init(
    {
        registration: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true,
                notEmpty: true
            }
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: true,
                isInt: true,
                min: 0
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: true,
                isEmail: true
            }
        },
    },
    {
        sequelize,
        modelName: 'Person',
    }
);

export default Person;
