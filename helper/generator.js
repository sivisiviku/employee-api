const model = require("../model/index.js");

exports.id = async (birthdate) => {
  const arrBirthdate = birthdate.split("-");
  let id = arrBirthdate[0].slice(-2) + arrBirthdate[1];

  const checkLastId = await model.read(
    `id`,
    `employees`,
    `id like '${id}%'`,
    `id`,
    `desc`,
    `1`,
    null
  );

  if (checkLastId.data.length === 0) {
    id = id + String(1).padStart(4, "0");
  } else {
    const lastId = Number(checkLastId.data[0].id.slice(-4));
    id = id + String(lastId + 1).padStart(4, "0");
  }

  return id;
};
