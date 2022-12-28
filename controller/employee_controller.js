const model = require("../model/index.js");
const generator = require("../helper/generator.js");
const dateformat = require("dateformat");

exports.test = async (req, res) => {
  return res.send("api is working!");
};

exports.create = async (req, res) => {
  try {
    const id = await generator.id(req.body.birthdate);
    return res.send(
      await model.create(
        `employees`,
        `id, name, email, mobile, birthdate, address`,
        `"${id}", "${req.body.name}", "${req.body.email}", "${
          req.body.mobile
        }", "${req.body.birthdate}", '${JSON.stringify(req.body.address)}'`
      )
    );
  } catch (err) {
    return res.send({
      status: "error",
      message: err.message,
      data: null,
    });
  }
};

exports.readAll = async (req, res) => {
  try {
    const offset = (req.body.page - 1) * req.body.limit;
    const filter =
      req.body.filter !== null && req.body.filter !== ""
        ? `id like '%${req.body.filter}%' or name like '%${req.body.filter}%' or email like '%${req.body.filter}%'`
        : null;
    const totalData = await model.read(
      `count(id) as total_data`,
      `employees`,
      filter,
      null,
      null,
      null,
      null
    );
    const totalPages = Math.ceil(totalData.data[0].total_data / req.body.limit);
    const data = await model.read(
      `*`,
      `employees`,
      filter,
      req.body.sort,
      req.body.sort_direction,
      req.body.limit,
      offset
    );
    return res.send({
      status: "success",
      message: {
        total_pages: totalPages,
        total_data: totalData.data[0].total_data,
      },
      data: data.data,
    });
  } catch (err) {
    return res.send({
      status: "error",
      message: err.message,
      data: null,
    });
  }
};

exports.readOne = async (req, res) => {
  try {
    return res.send(
      await model.read(
        `*`,
        `employees`,
        `id="${req.body.id}"`,
        null,
        null,
        1,
        null
      )
    );
  } catch (err) {
    return res.send({
      status: "error",
      message: err.message,
      data: null,
    });
  }
};

exports.update = async (req, res) => {
  try {
    return res.send(
      await model.update(
        `employees`,
        `name = "${req.body.name}", email = "${req.body.email}", mobile = "${
          req.body.mobile
        }", birthdate = "${req.body.birthdate}", address = '${JSON.stringify(
          req.body.address
        )}'`,
        `id=${req.body.id}`
      )
    );
  } catch (err) {
    return res.send({
      status: "error",
      message: err.message,
      data: null,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    return res.send(await model.delete(`employees`, `id="${req.body.id}"`));
  } catch (err) {
    return res.send({
      status: "error",
      message: err.message,
      data: null,
    });
  }
};
