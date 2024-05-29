import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

const Appointments = db.define('appointment', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [1, 100]
        }
    },
    degree: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    school_year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
            isInt: true
        }
    },
    student_id: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    address_city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    address_street: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    reason: {
        type: DataTypes.ENUM('personal problems', 'school', 'peer', 'staff'),
        allowNull: false,
        validate: {
            notEmpty: true,
            isIn: [['personal problems', 'school', 'peer', 'staff']]
        }
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'Pending',
        allowNull: false,
        validate: {
            notEmpty: true,
            isIn: [['Pending', 'Approved', 'Rejected']]
        }
    },
    date_created: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    date_counsel: {
        type: DataTypes.DATE,
        allowNull: true
    },
    counselors: {
        type: DataTypes.ENUM('Jazel Equia', 'Dynnhiel Talisayan', 'Aubrey Heramis', 'Henry Dy', 'Gail Quipit'),
        allowNull: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        references: {
            model: 'users', // Name of the referenced table
            key: 'id'       // Name of the referenced column
        }
    },
}, {
    freezeTableName: true
});

Users.hasMany(Appointments);
Appointments.belongsTo(Users,{foreignKey:'userId'});

export default Appointments;
