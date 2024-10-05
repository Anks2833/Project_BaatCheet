import {  MdContentCopy } from "react-icons/md";

const InfoComponent = () => {
    return (
        <div className="w-full flex flex-col pt-2">
            <div>
                <h1 className="text-xl px-4">BaatCheet Details</h1>
            </div>
            <div className="p-4 flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                    <h1>Joining info</h1>
                    <p className="text-zinc-400">https://meet.baatcheet.com/your-code-here</p>
                </div>
                <div className="w-fit cursor-pointer hover:bg-zinc-400/20 p-2 rounded-full flex gap-2 items-center text-blue-400">
                    <MdContentCopy />
                    <h1>Copy joining info</h1>
                </div>
            </div>
        </div>
    )
}

export default InfoComponent