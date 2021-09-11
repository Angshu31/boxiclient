import { Type } from "@sinclair/typebox";

export class DataType<T extends (...args: any[]) => any> {
  constructor(public func: T, public args: Parameters<T>) {}

  getSchema() {
    recurse(this.args);
    return this.func.apply(Type, this.args);
  }
}

function recurse(obj: any) {
  for (const prop in obj) {
    const val = obj[prop];

    if (val instanceof DataType) {
      obj[prop] = val.getSchema();
    } else if (typeof val === "object") {
      recurse(val);
    }
  }
}
