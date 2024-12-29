import { Home, Landing, Login, Register, Settings } from "./pages";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./protectedRoutes";
import FormEditor from "./pages/FormEditor/formEditor";
import FormViewer from "./pages/FormViewer";

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/form-editor/:formId" element={<ProtectedRoute><FormEditor /></ProtectedRoute>} />
          <Route path="/forms/:shareableLink" element={<FormViewer />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
