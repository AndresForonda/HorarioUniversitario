module.exports = (sequelize, Datatypes) => {
  const Subject = sequelize.define('Subject', {
    subject: {
      type: Datatypes.STRING,
      allowNull: false,
      quoteIdentifiers: false
    },
    lower_subject: {
      type: Datatypes.STRING,
      unique: true,
      allowNull: false
    },
    semester_id: {
      type: Datatypes.STRING,
      allowNull: false
    }
  })
  return Subject
}
