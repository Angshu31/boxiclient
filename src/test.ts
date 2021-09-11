import { Type } from "@sinclair/typebox";
import "reflect-metadata";
import { Field } from "./decorators/Field";
import { ObjectType } from "./decorators/ObjectType";
import { getSchema } from "./getSchema";

@ObjectType()
export class MyObj {
  @Field({ optional: true })
  id: string;
}

console.log(getSchema(MyObj));
