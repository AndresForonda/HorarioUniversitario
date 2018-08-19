module.exports = (sequelize, Datatypes) => {
  const Subject = sequelize.define('Subject', {
    semester: {
      type: Datatypes.SMALLINT,
      allowNull: false
    },
    subject: {
      type: Datatypes.STRING,
      unique: true,
      allowNull: false
    },
    status: {
      type: Datatypes.BOOLEAN,
      allowNull: false
    }
  })
  return Subject
}
