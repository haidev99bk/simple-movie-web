import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError() as { statusText: string; message: string };

  return (
    <div className="h-screen w-screen flex items-center gap-1 flex-col justify-center">
      <h1 className="font-bold text-xl">Oops!</h1>
      <p className="text-lg">Sorry, an unexpected error has occurred.</p>
      <p className="text-sm">
        <i>{error?.statusText || error?.message}</i>
      </p>
    </div>
  );
};
export default ErrorPage;
