const Worker = require("../../db/models/Workers");

class WorkerActions {

  async saveWorker(req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const position = req.body.position;
    const phone = req.body.phone;
    const email = req.body.email;

    let worker;

    try {
      worker = new Worker({ firstName, lastName, position, phone, email});
      await worker.save();
    } catch (err) {
      return res.status(422).json({ message: err.message });
    }

    res.status(201).json(worker);
  }
  
  async getAllWorkers(req, res) {
    const doc = await Worker.find({});

    res.status(200).json(doc);
  }

  async getWorker(req, res) {
    const id = req.params.id;
    const worker = await Worker.findOne({ _id: id });

    res.status(200).json(worker);
  }

  async addWorker(req, res) {
    
  }

  async updateWorker(req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const position = req.body.position;
    const phone = req.body.phone;
    const email = req.body.email;

    const id = req.params.id;
    const worker = await Worker.findOne({ _id: id });
    worker.firstName = firstName;
    worker.lastName = lastName;
    worker.position = position;
    worker.phone = phone;
    worker.email = email;
    await worker.save();

    res.status(200).json(worker);
  }


  async deleteWorker(req, res) {
    const id = req.params.id;
    await Worker.deleteOne({ _id: id });

    res.sendStatus(204);
  }
}

module.exports = new WorkerActions();