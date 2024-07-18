import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Link, Outlet, useParams } from "react-router-dom";

export const AppLayout = () => {
  const { name } = useParams();

  return (
    <div className="container">
      <div className="container__header">
        <Link to={"/"} className="container__title">
          PokeAPI
        </Link>
        {!name && <Header />}
      </div>

      <section className="container__body">
        {!name && <Sidebar />}
        <main className={`container__main ${!name && 'container__main--active'}`}>
          <Outlet />
        </main>
      </section>
    </div>
  );
};
