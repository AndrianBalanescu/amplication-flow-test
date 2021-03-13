import * as React from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery, useMutation } from "react-query";
import { Formik } from "formik";
import pick from "lodash.pick";

import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  EnumButtonStyle,
  TextField,
} from "@amplication/design-system";

import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { Post as TPost } from "../api/post/Post";
import { PostUpdateInput } from "../api/post/PostUpdateInput";

export const Post = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/posts/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TPost,
    AxiosError,
    [string, string]
  >(["get-/api/posts", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/posts"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TPost, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/posts"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//posts");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TPost, AxiosError, PostUpdateInput>(async (data) => {
    const response = await api.patch(`${"/api/posts"}/${id}`, data);
    return response.data;
  });

  const handleSubmit = React.useCallback(
    (values: PostUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.id);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(() => pick(data, ["image", "text"]), [
    data,
  ]);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <>
      {data && (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form
            formStyle={EnumFormStyle.Horizontal}
            formHeaderContent={
              <FormHeader
                title={`${"Post"} ${
                  data?.id && data?.id.length ? data.id : data?.id
                }`}
              >
                <Button
                  type="button"
                  disabled={updateIsLoading}
                  buttonStyle={EnumButtonStyle.Secondary}
                  icon="trash_2"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
                <Button type="submit" disabled={updateIsLoading}>
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
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
