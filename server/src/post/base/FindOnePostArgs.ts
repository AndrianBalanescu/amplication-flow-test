import { ArgsType, Field } from "@nestjs/graphql";
import { PostWhereUniqueInput } from "./PostWhereUniqueInput";

@ArgsType()
class FindOnePostArgs {
  @Field(() => PostWhereUniqueInput, { nullable: false })
  where!: PostWhereUniqueInput;
}

export { FindOnePostArgs };
