import { ArgsType, Field } from "@nestjs/graphql";
import { PostWhereInput } from "./PostWhereInput";

@ArgsType()
class FindManyPostArgs {
  @Field(() => PostWhereInput, { nullable: true })
  where?: PostWhereInput;
}

export { FindManyPostArgs };
