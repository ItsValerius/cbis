type Form = {
  name: string;
};

type FieldErrorState = {
  status: "field-errors";
  errors: Partial<Record<keyof Form, string>>;
};

type DefaultState = {
  status: "default";
};

type SubmitErrorState = {
  status: "error";
  errors: string;
};

type SuccessState = {
  status: "success";
};

type CreateGroupState = { form: Form } & (
  | SuccessState
  | SubmitErrorState
  | FieldErrorState
);
