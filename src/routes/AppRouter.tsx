import { BrowserRouter, Route, Routes } from "react-router-dom";

import { HomePage } from "@/pages/HomePage";
import { AppLayout } from "@/layouts/AppLayout";
import { DetailPage } from "@/pages/DetailPage";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="pokemon/:name" element={<DetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
