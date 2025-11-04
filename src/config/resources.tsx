import {
  DashboardOutlined,
  ProjectOutlined,
  ShopOutlined,
} from '@ant-design/icons';
import { IResourceItem } from '@refinedev/core';

// this file is used to define the resources of the app
// which is the way to maintain the state of the app === I do not know about that very well
export const resources: IResourceItem[] = [
  /*
   * a resource in refine performs these actions
   * list      --> get all records         (Read)
   * show      --> get a single record     (Read)
   * create    --> create a new record     (Create)
   * edit      --> update a record         (Update)
   * delete    --> delete a record         (Delete)
   * custom    --> custom queries and mutations
   * or clone  --> duplicate a record      (Create)
   */
  {
    // dashboard is a special resource that is used to display the dashboard page
    // it doesn't perform any CRUD operations
    name: 'dashboard',
    list: '/',
    meta: {
      label: 'Dashboard',
      icon: <DashboardOutlined />,
    },
  },
  {
    // companies is a resource that performs CRUD operations on companies
    // it also has a custom page to display the company details

    name: 'companies',
    list: '/companies',
    show: '/companies/:id',
    create: '/companies/new',
    edit: '/companies/edit/:id',
    meta: {
      label: 'Companies',
      icon: <ShopOutlined />,
    },
  },
  {
    // tasks is a resource that performs CRUD operations on tasks
    // it also has a custom page to display the task details
    name: 'tasks',
    list: '/tasks',
    create: '/tasks/new',
    edit: '/tasks/edit/:id',
    meta: {
      label: 'Tasks',
      icon: <ProjectOutlined />,
    },
  },
  {
    name: 'users',
    list: '/users',
    show: '/users/:id',
    create: '/users/new',
    edit: '/users/edit/:id',
    meta: {
      label: 'Users',
      icon: <ProjectOutlined />,
    },
  },
];
