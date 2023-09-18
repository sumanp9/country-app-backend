const Sequelize = require('sequelize');
const { sequelize } = require('.');

module.exports = (sequelize, Sequelize) => {

    const Country = sequelize.define('Countries',  {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
    
        country_name: {
            type: Sequelize.STRING, 
            allowNull: false
        },
    
        capital_city: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });


    const City = sequelize.define('Cities', {
    
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
    
        country_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model:Country,
                key:'id',
            }
        },
    
        name: {
            type:Sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });

    Country.hasMany(City, { onDelete: 'CASCADE' });
    City.belongsTo(Country, { foreignKey: 'country_id' });
    City.belongsTo(Country, { onDelete: 'CASCADE'})
    


    return {
        Country, 
        City
    };
}