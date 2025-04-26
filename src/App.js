// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./components/UserContext";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ForkliftDetailPage from "./pages/ForkliftDetailPage";
import SorterDetailPage from "./pages/SorterDetailPage";
import AGVDetailPage from "./pages/AGVDetailPage";
import ProfilePage from "./pages/ProfilePage";
import WelcomePage from "./pages/WelcomePage";
import LogisticsDashboard from "./pages/Loading";
import ForkliftTable from "./pages/ForkliftTable";
import AGVTable from "./pages/AGVTable";
import SorterTable from "./pages/SorterTable";
import Home from "./pages/home";
import MyPage from "./pages/MyPage";

function App() {
  return (
    <UserProvider>
      <Router>
        <Layout>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/forklift/:testId" element={<ForkliftDetailPage />} />
              <Route path="/sorter/:testId" element={<SorterDetailPage />} />
              <Route path="/agv/:testId" element={<AGVDetailPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/welcome" element={<WelcomePage />} />
              <Route path="/loading" element={<LogisticsDashboard />} />
              <Route path="/forklift" element={<ForkliftTable />} />
              <Route path="/agv" element={<AGVTable />} />
              <Route path="/sorter" element={<SorterTable />} />
              <Route path="/home" element={<Home />} />
              <Route path="/mypage" element={<MyPage />} />
            </Routes>
          </div>
        </Layout>
      </Router>
    </UserProvider>
  );
}

export default App;
