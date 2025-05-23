import Login from "../../Components/Login"


const HomePage = () => {
    return (

        <div className="w-full h-screen">
            <div className="relative h-full w-full bg-zinc-950">
                <div className="Auth-Pages absolute bottom-0 left-0 right-0 top-0">

                    <div className="w-full h-screen flex justify-center items-center">
                        <Login />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default HomePage