// import { useForm } from "@refinedev/antd";
// import { HttpError } from "@refinedev/core";
// import { GetFields, GetVariables } from "@refinedev/nestjs-query";

// import MDEditor from "@uiw/react-md-editor";
// import { Button, Form, Space } from "antd";

// import { Task } from "@/graphql/schema.types";
// import {
//   UpdateTaskMutation,
//   UpdateTaskMutationVariables,
// } from "@/graphql/types";

// import { UPDATE_TASK_MUTATION } from "@/graphql/mutations";

// type Props = {
//   initialValues: {
//     description?: Task["description"];
//   };
//   cancelForm: () => void;
// };

// export const DescriptionForm = ({ initialValues, cancelForm }: Props) => {
//   // use the useForm hook to manage the form
//   // formProps contains all the props that we need to pass to the form (initialValues, onSubmit, etc.)
//   // saveButtonProps contains all the props that we need to pass to the save button
//   const { formProps, saveButtonProps } = useForm<
//     GetFields<UpdateTaskMutation>,
//     HttpError,
//     /**
//      * Pick is a utility type from typescript that allows you to create a new type from an existing type by picking some properties from it.
//      * https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys
//      *
//      * Pick<Type, Keys>
//      * Type -> the type from which we want to pick the properties
//      * Keys -> the properties that we want to pick
//      */
//     Pick<GetVariables<UpdateTaskMutationVariables>, "description">
//   >({
//     queryOptions: {
//       // we are disabling the query because we don't want to fetch the data on component mount.
//       enabled: false, // disable the query
//     },
//     redirect: false, // disable redirection
//     // when the mutation is successful, call the cancelForm function to close the form
//     onMutationSuccess: () => {
//       cancelForm();
//     },
//     // specify the mutation that should be performed
//     meta: {
//       gqlMutation: UPDATE_TASK_MUTATION,
//     },
//   });

//   return (
//     <>
//       <Form {...formProps} initialValues={initialValues}>
//         <Form.Item noStyle name="description">
//           <MDEditor preview="edit" data-color-mode="light" height={250} />
//         </Form.Item>
//       </Form>
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "end",
//           marginTop: "12px",
//         }}
//       >
//         <Space>
//           <Button type="default" onClick={cancelForm}>
//             Cancel
//           </Button>
//           <Button {...saveButtonProps} type="primary">
//             Save
//           </Button>
//         </Space>
//       </div>
//     </>
//   );
// };

// ==========================================
// import { useForm } from "@refinedev/antd";
// import { HttpError } from "@refinedev/core";
// import { GetFields, GetVariables } from "@refinedev/nestjs-query";

// import { Button, DatePicker, Form, Space } from "antd";
// import dayjs from "dayjs";

// import { Task } from "@/graphql/schema.types";
// import {
//   UpdateTaskMutation,
//   UpdateTaskMutationVariables,
// } from "@/graphql/types";

// import { UPDATE_TASK_MUTATION } from "@/graphql/mutations";

// type Props = {
//   initialValues: {
//     dueDate?: Task["dueDate"];
//   };
//   cancelForm: () => void;
// };

// export const DueDateForm = ({ initialValues, cancelForm }: Props) => {
//   // use the useForm hook to manage the form
//   // formProps contains all the props that we need to pass to the form (initialValues, onSubmit, etc.)
//   // saveButtonProps contains all the props that we need to pass to the save button
//   const { formProps, saveButtonProps } = useForm<
//     GetFields<UpdateTaskMutation>,
//     HttpError,
//     /**
//      * Pick is a utility type from typescript that allows you to create a new type from an existing type by picking some properties from it.
//      * https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys
//      *
//      * Pick<Type, Keys>
//      * Type -> the type from which we want to pick the properties
//      * Keys -> the properties that we want to pick
//      */
//     Pick<GetVariables<UpdateTaskMutationVariables>, "dueDate">
//   >({
//     queryOptions: {
//       // disable the query to prevent fetching data on component mount
//       enabled: false,
//     },
//     redirect: false, // disable redirection
//     // when the mutation is successful, call the cancelForm function to close the form
//     onMutationSuccess: () => {
//       cancelForm();
//     },
//     // specify the mutation that should be performed
//     meta: {
//       gqlMutation: UPDATE_TASK_MUTATION,
//     },
//   });

//   return (
//     <div
//       style={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "space-between",
//       }}
//     >
//       <Form {...formProps} initialValues={initialValues}>
//         <Form.Item
//           noStyle
//           name="dueDate"
//           getValueProps={(value) => {
//             if (!value) return { value: undefined };
//             return { value: dayjs(value) };
//           }}
//         >
//           <DatePicker
//             format="YYYY-MM-DD HH:mm"
//             showTime={{
//               showSecond: false,
//               format: "HH:mm",
//             }}
//             style={{ backgroundColor: "#fff" }}
//           />
//         </Form.Item>
//       </Form>
//       <Space>
//         <Button type="default" onClick={cancelForm}>
//           Cancel
//         </Button>
//         <Button {...saveButtonProps} type="primary">
//           Save
//         </Button>
//       </Space>
//     </div>
//   );
// };

// ==========================================
// import { MarkdownField } from "@refinedev/antd";

// import { Typography, Space, Tag } from "antd";

// import dayjs from "dayjs";

// import { Text, UserTag } from "@/components";
// import { getDateColor } from "@/utilities";

// import { Task } from "@/graphql/schema.types";

// type DescriptionProps = {
//   description?: Task["description"];
// };

// type DueDateProps = {
//   dueData?: Task["dueDate"];
// };

// type UserProps = {
//   users?: Task["users"];
// };

// // display a task's descriptio if it exists, otherwise display a link to add one
// export const DescriptionHeader = ({ description }: DescriptionProps) => {
//   if (description) {
//     return (
//       <Typography.Paragraph ellipsis={{ rows: 8 }}>
//         <MarkdownField value={description} />
//       </Typography.Paragraph>
//     );
//   }

//   // if the task doesn't have a description, display a link to add one
//   return <Typography.Link>Add task description</Typography.Link>;
// };

// // display a task's due date if it exists, otherwise display a link to add one
// export const DueDateHeader = ({ dueData }: DueDateProps) => {
//   if (dueData) {
//     // get the color of the due date
//     const color = getDateColor({
//       date: dueData,
//       defaultColor: "processing",
//     });

//     // depending on the due date, display a different color and text
//     const getTagText = () => {
//       switch (color) {
//         case "error":
//           return "Overdue";

//         case "warning":
//           return "Due soon";

//         default:
//           return "Processing";
//       }
//     };

//     return (
//       <Space size={[0, 8]}>
//         <Tag color={color}>{getTagText()}</Tag>
//         <Text>{dayjs(dueData).format("MMMM D, YYYY - h:ma")}</Text>
//       </Space>
//     );
//   }

//   // if the task doesn't have a due date, display a link to add one
//   return <Typography.Link>Add due date</Typography.Link>;
// };

// // display a task's users if it exists, otherwise display a link to add one
// export const UsersHeader = ({ users = [] }: UserProps) => {
//   if (users.length > 0) {
//     return (
//       <Space size={[0, 8]} wrap>
//         {users.map((user) => (
//           <UserTag key={user.id} user={user} />
//         ))}
//       </Space>
//     );
//   }

//   // if the task doesn't have users, display a link to add one
//   return <Typography.Link>Assign to users</Typography.Link>;
// };

// ==========================================
// import { useForm, useSelect } from "@refinedev/antd";
// import { HttpError } from "@refinedev/core";
// import {
//   GetFields,
//   GetFieldsFromList,
//   GetVariables,
// } from "@refinedev/nestjs-query";

// import { FlagOutlined } from "@ant-design/icons";
// import { Checkbox, Form, Select, Space } from "antd";

// import { AccordionHeaderSkeleton } from "@/components";
// import {
//   TaskStagesSelectQuery,
//   UpdateTaskMutation,
//   UpdateTaskMutationVariables,
// } from "@/graphql/types";

// import { UPDATE_TASK_MUTATION } from "@/graphql/mutations";
// import { TASK_STAGES_SELECT_QUERY } from "@/graphql/queries";

// type Props = {
//   isLoading?: boolean;
// };

// export const StageForm = ({ isLoading }: Props) => {
//   // use the useForm hook to manage the form for adding a stage to a task
//   const { formProps } = useForm<
//     GetFields<UpdateTaskMutation>,
//     HttpError,
//     /**
//      * Pick is a utility type from typescript that allows you to create a new type from an existing type by picking some properties from it.
//      * https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys
//      *
//      * Pick<Type, Keys>
//      * Type -> the type from which we want to pick the properties
//      * Keys -> the properties that we want to pick
//      */
//     Pick<GetVariables<UpdateTaskMutationVariables>, "stageId" | "completed">
//   >({
//     queryOptions: {
//       // disable the query to prevent fetching data on component mount
//       enabled: false,
//     },

//     /**
//      * autoSave is used to automatically save the form when the value of the form changes. It accepts an object with 2 properties:
//      * enabled: boolean - whether to enable autoSave or not
//      * debounce: number - the debounce time in milliseconds
//      *
//      * https://refine.dev/docs/ui-integrations/ant-design/hooks/use-form/#autosave
//      *
//      * In this case, we are enabling autoSave and setting the debounce time to 0. Means immediately save the form when the value changes.
//      */
//     autoSave: {
//       enabled: true,
//       debounce: 0,
//     },
//     // specify the mutation that should be performed
//     meta: {
//       gqlMutation: UPDATE_TASK_MUTATION,
//     },
//   });

//   // use the useSelect hook to fetch the task stages and pass it to the select component. This will allow us to select a stage for the task.
//   // https://refine.dev/docs/ui-integrations/ant-design/hooks/use-select/
//   const { selectProps } = useSelect<GetFieldsFromList<TaskStagesSelectQuery>>({
//     // specify the resource that we want to fetch
//     resource: "taskStages",
//     // specify a filter to only fetch the stages with the title "TODO", "IN PROGRESS", "IN REVIEW", "DONE"
//     filters: [
//       {
//         field: "title",
//         operator: "in",
//         value: ["TODO", "IN PROGRESS", "IN REVIEW", "DONE"],
//       },
//     ],
//     // specify a sorter to sort the stages by createdAt in ascending order
//     sorters: [
//       {
//         field: "createdAt",
//         order: "asc",
//       },
//     ],
//     // specify the gqlQuery that should be performed
//     meta: {
//       gqlQuery: TASK_STAGES_SELECT_QUERY,
//     },
//   });

//   if (isLoading) return <AccordionHeaderSkeleton />;

//   return (
//     <div style={{ padding: "12px 24px", borderBottom: "1px solid #d9d9d9" }}>
//       <Form
//         layout="inline"
//         style={{
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//         {...formProps}
//       >
//         <Space size={5}>
//           <FlagOutlined />
//           <Form.Item
//             noStyle
//             name={["stageId"]}
//             initialValue={formProps?.initialValues?.stage?.id}
//           >
//             <Select
//               {...selectProps}
//               // determines whether the width of the dropdown menu should match the width of the select box.
//               popupMatchSelectWidth={false}
//               // concat the options with an option for unassigned stage
//               options={selectProps.options?.concat([
//                 {
//                   label: "Unassigned",
//                   value: null,
//                 },
//               ])}
//               bordered={false}
//               showSearch={false}
//               placeholder="Select a stage"
//               onSearch={undefined}
//               size="small"
//             />
//           </Form.Item>
//         </Space>
//         <Form.Item noStyle name="completed" valuePropName="checked">
//           <Checkbox>Mark as complete</Checkbox>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// };

// ==========================================\
// import React from "react";

// import { useForm } from "@refinedev/antd";
// import { HttpError, useInvalidate } from "@refinedev/core";
// import { GetFields, GetVariables } from "@refinedev/nestjs-query";

// import { Form, Skeleton } from "antd";

// import { Text } from "@/components";
// import { Task } from "@/graphql/schema.types";
// import {
//   UpdateTaskMutation,
//   UpdateTaskMutationVariables,
// } from "@/graphql/types";

// import { UPDATE_TASK_MUTATION } from "@/graphql/mutations";

// const TitleInput = ({
//   value,
//   onChange,
// }: {
//   value?: string;
//   onChange?: (value: string) => void;
// }) => {
//   const onTitleChange = (newTitle: string) => {
//     onChange?.(newTitle);
//   };

//   return (
//     <Text
//       editable={{
//         onChange: onTitleChange,
//       }}
//       style={{ width: "98%" }}
//     >
//       {value}
//     </Text>
//   );
// };

// type Props = {
//   initialValues: {
//     title?: Task["title"];
//   };
//   isLoading?: boolean;
// };

// export const TitleForm = ({ initialValues, isLoading }: Props) => {
//   /**
//    * useInvalidate is used to invalidate the state of a particular resource or dataProvider
//    * Means, it will refetch the data from the server and update the state of the resource or dataProvider. We can also specify which part of the state we want to invalidate.
//    * We typically use this hook when we want to refetch the data from the server after a mutation is successful.
//    *
//    * https://refine.dev/docs/data/hooks/use-invalidate/
//    */
//   const invalidate = useInvalidate();

//   // use the useForm hook to manage the form for adding a title to a task
//   const { formProps } = useForm<
//     GetFields<UpdateTaskMutation>,
//     HttpError,
//     /**
//      * Pick is a utility type from typescript that allows you to create a new type from an existing type by picking some properties from it.
//      * https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys
//      *
//      * Pick<Type, Keys>
//      * Type -> the type from which we want to pick the properties
//      * Keys -> the properties that we want to pick
//      */
//     Pick<GetVariables<UpdateTaskMutationVariables>, "title">
//   >({
//     queryOptions: {
//       // disable the query to prevent fetching data on component mount
//       enabled: false,
//     },
//     redirect: false, // disable redirection
//     warnWhenUnsavedChanges: false, // disable warning when there are unsaved changes
//     /**
//      * autoSave is used to automatically save the form when the value of the form changes. It accepts an object with 1 property:
//      * enabled: boolean - whether to enable autoSave or not
//      *
//      * https://refine.dev/docs/ui-integrations/ant-design/hooks/use-form/#autosave
//      *
//      * In this case, we are enabling autoSave.
//      */
//     autoSave: {
//       enabled: true,
//     },
//     // invalidate the list page of the tasks resource when the mutation is successful
//     onMutationSuccess: () => {
//       // refetch the list page of the tasks resource
//       invalidate({ invalidates: ["list"], resource: "tasks" });
//     },
//     meta: {
//       gqlMutation: UPDATE_TASK_MUTATION,
//     },
//   });

//   // set the title of the form to the title of the task
//   React.useEffect(() => {
//     formProps.form?.setFieldsValue(initialValues);
//   }, [initialValues.title]);

//   if (isLoading) {
//     return (
//       <Skeleton.Input
//         size="small"
//         style={{ width: "95%", height: "22px" }}
//         block
//       />
//     );
//   }

//   return (
//     <Form {...formProps} initialValues={initialValues}>
//       <Form.Item noStyle name="title">
//         <TitleInput />
//       </Form.Item>
//     </Form>
//   );
// };

// ==========================================\
// import { useForm, useSelect } from "@refinedev/antd";
// import { HttpError } from "@refinedev/core";
// import {
//   GetFields,
//   GetFieldsFromList,
//   GetVariables,
// } from "@refinedev/nestjs-query";

// import { Button, Form, Select, Space } from "antd";

// import {
//   UpdateTaskMutation,
//   UpdateTaskMutationVariables,
//   UsersSelectQuery,
// } from "@/graphql/types";

// import { USERS_SELECT_QUERY } from "@/graphql/queries";
// import { UPDATE_TASK_MUTATION } from "@/graphql/mutations";

// type Props = {
//   initialValues: {
//     userIds?: { label: string; value: string }[];
//   };
//   cancelForm: () => void;
// };

// export const UsersForm = ({ initialValues, cancelForm }: Props) => {
//   // use the useForm hook to manage the form to add users to a task (assign task to users)
//   const { formProps, saveButtonProps } = useForm<
//     GetFields<UpdateTaskMutation>,
//     HttpError,
//     /**
//      * Pick is a utility type from typescript that allows you to create a new type from an existing type by picking some properties from it.
//      * https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys
//      *
//      * Pick<Type, Keys>
//      * Type -> the type from which we want to pick the properties
//      * Keys -> the properties that we want to pick
//      */
//     Pick<GetVariables<UpdateTaskMutationVariables>, "userIds">
//   >({
//     queryOptions: {
//       // disable the query to prevent fetching data on component mount
//       enabled: false,
//     },
//     redirect: false, // disable redirection
//     onMutationSuccess: () => {
//       // when the mutation is successful, call the cancelForm function to close the form
//       cancelForm();
//     },
//     // perform the mutation when the form is submitted
//     meta: {
//       gqlMutation: UPDATE_TASK_MUTATION,
//     },
//   });

//   // use the useSelect hook to fetch the list of users from the server and display them in a select component
//   const { selectProps } = useSelect<GetFieldsFromList<UsersSelectQuery>>({
//     // specify the resource from which we want to fetch the data
//     resource: "users",
//     // specify the query that should be performed
//     meta: {
//       gqlQuery: USERS_SELECT_QUERY,
//     },
//     // specify the label for the select component
//     optionLabel: "name",
//   });

//   return (
//     <div
//       style={{
//         display: "flex",
//         alignItems: "end",
//         justifyContent: "space-between",
//         gap: "12px",
//       }}
//     >
//       <Form
//         {...formProps}
//         style={{ width: "100%" }}
//         initialValues={initialValues}
//       >
//         <Form.Item noStyle name="userIds">
//           <Select
//             {...selectProps}
//             className="kanban-users-form-select"
//             dropdownStyle={{ padding: "0px" }}
//             style={{ width: "100%" }}
//             mode="multiple"
//           />
//         </Form.Item>
//       </Form>
//       <Space>
//         <Button type="default" onClick={cancelForm}>
//           Cancel
//         </Button>
//         <Button {...saveButtonProps} type="primary">
//           Save
//         </Button>
//       </Space>
//     </div>
//   );
// };

//=========================================

// import { AccordionHeaderSkeleton } from "@/components";
// import { Text } from "./text";

// type Props = React.PropsWithChildren<{
//   accordionKey: string;
//   activeKey?: string;
//   setActive: (key?: string) => void;
//   fallback: string | React.ReactNode;
//   isLoading?: boolean;
//   icon: React.ReactNode;
//   label: string;
// }>;

// /**
//  * when activeKey is equal to accordionKey, the children will be rendered. Otherwise, the fallback will be rendered
//  * when isLoading is true, the <AccordionHeaderSkeleton /> will be rendered
//  * when Accordion is clicked, setActive will be called with the accordionKey
//  */
// export const Accordion = ({
//   accordionKey,
//   activeKey,
//   setActive,
//   fallback,
//   icon,
//   label,
//   children,
//   isLoading,
// }: Props) => {
//   if (isLoading) return <AccordionHeaderSkeleton />;

//   const isActive = activeKey === accordionKey;

//   const toggleAccordion = () => {
//     if (isActive) {
//       setActive(undefined);
//     } else {
//       setActive(accordionKey);
//     }
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         padding: "12px 24px",
//         gap: "12px",
//         alignItems: "start",
//         borderBottom: "1px solid #d9d9d9",
//       }}
//     >
//       <div style={{ marginTop: "1px", flexShrink: 0 }}>{icon}</div>
//       {isActive ? (
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             gap: "12px",
//             flex: 1,
//           }}
//         >
//           <Text strong onClick={toggleAccordion} style={{ cursor: "pointer" }}>
//             {label}
//           </Text>
//           {children}
//         </div>
//       ) : (
//         <div onClick={toggleAccordion} style={{ cursor: "pointer", flex: 1 }}>
//           {fallback}
//         </div>
//       )}
//     </div>
//   );
// };
