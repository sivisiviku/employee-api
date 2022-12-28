const employee_controller = require("../controller/employee_controller");

module.exports = (app) => {
  app.get("/", employee_controller.test);
  app.post("/all-employee", employee_controller.readAll);
  app.post("/detail-employee", employee_controller.readOne);
  app.post("/add-employee", employee_controller.create);
  app.post("/edit-employee", employee_controller.update);
  app.post("/delete-employee", employee_controller.delete);
};
