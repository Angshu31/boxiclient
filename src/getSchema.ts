import { Type } from "@sinclair/typebox";
import { DataType } from "./internal/DataType";
import { effectKey, objectSchemaKey } from "./internal/keys";

export const getSchema = (objectType: Function) => {
  const data: DataType<typeof Type.Object> = Reflect.getMetadata(
    objectSchemaKey,
    objectType
  );

  if (!data)
    throw new Error(
      "Invalid object type passed into `getSchema`. Did you forget to call `@ObjectType()`?"
    );

  const effects = Reflect.getMetadata(effectKey, objectType);
  for (const eff of effects) eff(data);

  return data.getSchema();
};
