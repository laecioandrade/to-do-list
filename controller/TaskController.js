const Task = require("../models/Task");

let message = "";
let type = "";

exports.getAllTask = async (req, res) => {
  try {
    setTimeout(() => {
      message = "";
    }, 1000);
    const taskList = await Task.find();
    return res.render("index", {
      taskList,
      task: null,
      taskDelete: null,
      message,
      type,
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

exports.createTask = async (req, res) => {
  const task = req.body;
  if (!task.task) {
    message = "Insira um texto, antes de adicionar a tarefa!";
    type = "danger";
    return res.redirect("/");
  }

  try {
    await Task.create(task);
    message = "Tarefa criada com sucesso!";
    type = "success";
    return res.redirect("/");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const taskList = await Task.find();
    if (req.params.method == "update") {
      const task = await Task.findOne({ _id: req.params.id });
      res.render("index", { task, taskDelete: null, taskList, message, type });
    } else {
      const taskDelete = await Task.findOne({ _id: req.params.id });
      res.render("index", { task: null, taskDelete, taskList, message, type });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

exports.updateOneTask = async (req, res) => {
  try {
    const task = req.body;
    await Task.updateOne({ _id: req.params.id }, task);
    message = "Tarefa atualizada com sucesso!";
    type = "success";
    res.redirect("/");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

exports.deleteOneTask = async (req, res) => {
  try {
    await Task.deleteOne({ _id: req.params.id });
    message = "Tarefa deletada com sucesso!";
    type = "success";
    res.redirect("/");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

exports.taskCheck = async (req, res) => {
  try {
    const task = await Task.findOne({_id: req.params.id});
    task.check ? task.check = false : task.check = true;
    await Task.updateOne({ _id: req.params.id }, task);
    res.redirect("/");
  } catch (err) {
    res.status(500).send({error: err.message})
  }
}