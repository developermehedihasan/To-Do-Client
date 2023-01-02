import React, { useEffect } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import Loading from "../../../components/Loading/Loading";
import useToken from "../../../hooks/useToken";
import auth from "../../../auth/Firebase/firebase.init";
import useTitle from "../../../hooks/useTitle";
import useScrollToTop from "../../../hooks/useScrollToTop";

const Login = () => {
  useScrollToTop();
  useTitle("Login");
  const [signInWithGoogle, gUser, gLoading] = useSignInWithGoogle(auth);
  const [token] = useToken(gUser);
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
      toast.success(`Welcome to K Task ToDo, ${auth?.currentUser?.displayName}`, {
        autoClose: 4000,
      });
    }
  }, [token, navigate, from]);

  if (gLoading) {
    return <Loading />;
  }

  if (token) {
    navigate(from, { replace: true });
  }

  return (
    <div className="bg-base-100 h-screen py-36 lg:py-48">
      <div className="flex h-96 justify-center items-center px-4 lg:px-12">
        <div className="card w-full max-w-md bg-base-100">
          <div className="card-body">
            <h2 className="text-center text-4xl font-bold pb-6">Login</h2>
            <button
              onClick={() => signInWithGoogle()}
              className="btn btn-outline border-primary flex items-center justify-center rounded-full hover:bg-primary hover:border-primary duration-500 gap-2 hover:text-white"
            >
              <i className="bx bxl-google text-2xl"></i>Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;