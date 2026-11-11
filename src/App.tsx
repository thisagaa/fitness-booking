import ClassListPage from "./pages/ClassListPage"
import { HashRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import NotFoundPage from "./pages/NotFoundPage"
import Layout from './components/Layout'
import ClassDetailPage from "./pages/ClassDetailPage"
import CreateClassPage from "./pages/CreateClassPage"
import EditClassPage from "./pages/EditClassPage"


function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/classes" element={<ClassListPage />} />
          <Route path="/classes/:id" element={<ClassDetailPage />} />
          <Route path="/classes/new" element={<CreateClassPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/classes/:id/edit" element={<EditClassPage />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App