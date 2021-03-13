import { PrismaService } from "nestjs-prisma";
import {
  FindOnePostArgs,
  FindManyPostArgs,
  PostCreateArgs,
  PostUpdateArgs,
  PostDeleteArgs,
  Subset,
} from "@prisma/client";

export class PostServiceBase {
  constructor(protected readonly prisma: PrismaService) {}
  findMany<T extends FindManyPostArgs>(args: Subset<T, FindManyPostArgs>) {
    return this.prisma.post.findMany(args);
  }
  findOne<T extends FindOnePostArgs>(args: Subset<T, FindOnePostArgs>) {
    return this.prisma.post.findOne(args);
  }
  create<T extends PostCreateArgs>(args: Subset<T, PostCreateArgs>) {
    return this.prisma.post.create<T>(args);
  }
  update<T extends PostUpdateArgs>(args: Subset<T, PostUpdateArgs>) {
    return this.prisma.post.update<T>(args);
  }
  delete<T extends PostDeleteArgs>(args: Subset<T, PostDeleteArgs>) {
    return this.prisma.post.delete(args);
  }
}
