import SignInOptionsComponent from "../Components/SignInOptionsComponent";

const SignInOptionsPage = () => {
  return (
    <div className="signin-page-container min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="page-content w-full max-w-md">
        <SignInOptionsComponent />
      </div>
    </div>
  );
};

export default SignInOptionsPage;
