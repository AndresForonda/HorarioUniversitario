module.exports = (sequelize, DataTypes) => {
  const Semester = sequelize.define('Semester', {
    semester: {
      type: DataTypes.SMALLINT,
      unique: true,
      allowNull: false
    },
    grupoA: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    grupoB: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    grupoC: {
      type: DataTypes.BOOLEAN
    }
  })
  return Semester
}
