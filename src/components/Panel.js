import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Outlet, useNavigate, useOutletContext } from "react-router-dom";
import { service } from "../service";

export default function Panel() {
  const [cookies] = useCookies(["token"]);
  const context = useOutletContext();
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!cookies.token) {
      navigate("/");
    } else {
      service.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${cookies.token}`;
    }

    setMounted(true);
  }, [cookies.token]);

  if (!mounted) return null;

  return <Outlet context={context} />;
}
