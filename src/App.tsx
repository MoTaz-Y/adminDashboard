import {
  Authenticated,
  Refine,
  // WelcomePage,
} from '@refinedev/core';
import { DevtoolsPanel, DevtoolsProvider } from '@refinedev/devtools';
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar';

import { useNotificationProvider } from '@refinedev/antd';
import '@refinedev/antd/dist/reset.css';

import { authProvider, dataProvider, liveProvider } from './providers';
import routerProvider, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from '@refinedev/react-router';
import { App as AntdApp } from 'antd';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { Home, ForgotPassword, Login, Register } from './pages';
import Layout from './components/layout';
import { resources } from './config/resources';
import CompanyList from './pages/company-list/list';
import Create from './pages/company-list/create';
import EditPage from './pages/company-list/edit';
import CreateTaskPage from './pages/tasks-list/create';
import EditTaskPage from './pages/tasks-list/edit';
import TasksList from './pages/tasks-list/list';

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <AntdApp>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider}
              liveProvider={liveProvider}
              authProvider={authProvider}
              resources={resources}
              notificationProvider={useNotificationProvider}
              routerProvider={routerProvider}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                projectId: 'SJx8Bn-aUKSeq-mYjdpu',
                liveMode: 'auto',
              }}
            >
              <Routes>
                {/* <Route index element={<WelcomePage />} /> */}
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route
                  element={
                    <Authenticated
                      key='authenticated-layout'
                      fallback={<CatchAllNavigate to='/login' />}
                    >
                      <Layout>
                        <Outlet />
                      </Layout>
                    </Authenticated>
                  }
                >
                  <Route index element={<Home />} />
                  <Route path='/companies'>
                    <Route index element={<CompanyList />} />
                    <Route path='new' element={<Create />} />
                    <Route path='edit/:id' element={<EditPage />} />
                  </Route>
                  <Route
                    path='/tasks'
                    element={
                      <TasksList>
                        <Outlet />
                      </TasksList>
                    }
                  >
                    <Route path='new' element={<CreateTaskPage />} />
                    <Route path='edit/:id' element={<EditTaskPage />} />
                  </Route>
                </Route>
                <Route path='*' element={<CatchAllNavigate to='/404' />} />
              </Routes>
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </AntdApp>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
