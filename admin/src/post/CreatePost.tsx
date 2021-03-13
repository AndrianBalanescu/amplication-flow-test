import * as React from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { Formik } from "formik";
import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  TextField,
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { Post } from "../api/post/Post";
import { PostCreateInput } from "../api/post/PostCreateInput";

const INITIAL_VALUES = {} as PostCreateInput;

export const CreatePost = (): React.ReactElement => {
  useBreadcrumbs("/posts/new", "Create Post");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Post,
    AxiosError,
    PostCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/posts", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/posts"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: PostCreateInput) => {
      void create(values);
    },
    [create]
  );
  return (
    <>
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
        <Form
          formStyle={EnumFormStyle.Horizontal}
          formHeaderContent={
            <FormHeader title={"Create Post"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <TextField label="Geoloc" name="image" />
          </div>
          <div>
            <TextField label="Text" name="text" textarea />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
