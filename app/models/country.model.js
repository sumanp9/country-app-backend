const Sequelize = require('sequelize');
const { sequelize } = require('.');

module.exports = (sequelize, Sequelize) => {

    const country = sequelize.define('countries',  {
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


    const city = sequelize.define('cities', {
    
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
    
        country_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model:country,
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

    country.hasMany(city, { onDelete: 'CASCADE' });
    city.belongsTo(country, { foreignKey: 'country_id' });
    city.belongsTo(country, { onDelete: 'CASCADE'})
    


    return {
        country, 
        city
    };
}