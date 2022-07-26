import {BSON} from 'realm';

class Task {
  constructor({id = new BSON.ObjectId(), description, isComplete = false}) {
    this._id = id;
    this.description = description;
    this.isComplete = isComplete;
  }

  static schema = {
    name: 'Task',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      description: 'string',
      isComplete: {type: 'bool', default: false},
    },
  };
}

export default Task;
