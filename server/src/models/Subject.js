module.exports = (sequelize, Datatypes) => {
  const Subject = sequelize.define('Subject', {
    semester: {
      type: Datatypes.SMALLINT,
      allowNull: false
    },
    subject: {
      type: Datatypes.STRING,
      allowNull: false,
      quoteIdentifiers: false
    },
    lowerSubject: {
      type: Datatypes.STRING,
      unique: true,
      allowNull: false
    }
  })
  return Subject
}
