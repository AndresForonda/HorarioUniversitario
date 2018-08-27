module.exports = (sequelize, DataTypes) => {
  const Semester = sequelize.define('Semester', {
    grupo_a: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    grupo_b: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    grupo_c: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  })
  return Semester
}
