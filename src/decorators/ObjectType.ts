import { ObjectOptions, Type } from "@sinclair/typebox";
import { DataType } from "../internal/DataType";
import { objectSchemaKey } from "../internal/keys";

export function ObjectType(options?: ObjectOptions): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata(
      objectSchemaKey,
      new DataType(Type.Object, options ? [{}, options] : [{}]),
      target
    );
  };
}
