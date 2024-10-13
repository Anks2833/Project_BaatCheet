

const SignInWithComponent = (props) => {

  const { name, icon } = props;

  return (

    <div className='w-full h-[8vh] hover:bg-zinc-950 hover:text-white cursor-pointer transition-all flex items-center gap-3 px-10'>

      <div className="text-xl">
        {icon}
      </div>

      <h1 className="text-xl">Sign in with {name}</h1>

    </div>
  )
}

export default SignInWithComponent