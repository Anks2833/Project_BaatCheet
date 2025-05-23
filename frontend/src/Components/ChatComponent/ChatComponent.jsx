//Icons
import { IoSend } from "react-icons/io5";

//Components
import Message from '../Message'

const ChatComponent = () => {

    const messages = [
        { name: "Anks", time: "6:01AM", permission: "leader", message: "Hey John!!" },
        { name: "John", time: "8:30AM", permission: "co-leader", message: "Hey Sarah!!" },
        { name: "Sarah", time: "10:00AM", permission: "elder", message: "Hey Both!! how have you been? I was missing you both.Let us have a long chat" },
        { name: "Sarah", time: "10:00AM", permission: "elder", message: "Hey Both!! how have you been?" },
        { name: "Sarah", time: "10:00AM", permission: "elder", message: "Hey Both!! how have you been? I was missing you both.Let us have" },
        { name: "Sarah", time: "10:00AM", permission: "elder", message: "Hey Both!! how have you been? I was missing you both.Let us have a long chat" },
      ]

    return (
        <div className="relative w-full h-[80vh] flex flex-col">
            <div>
                <h1 className="text-xl px-4 pt-2">Messages</h1>
            </div>

            <div className="w-full h-[62vh] mt-2 bg-zinc-900/50 overflow-scroll p-3 flex flex-col gap-2">
                {messages.map((msg, index) => {

                    return (
                        <div key={index}>
                            <Message
                                name={msg.name}
                                time={msg.time}
                                permission={msg.permission}
                                message={msg.message}
                            />
                        </div>
                    )

                })}
            </div>


            <div className="absolute bottom-0 w-full flex items-center justify-between px-10 mb-6 bg-zinc-950/30 py-3 rounded-full">
                <div className="w-fit h-full pt-1"><textarea cols={30} rows={1} resize="none" className="resize-none w-full h-full text-white bg-transparent outline-none" type="text" placeholder="Send Message" /></div>
                <div className="w-fit cursor-pointer hover:-rotate-45 transition-all"><IoSend /></div>
            </div>
        </div>
    )
}

export default ChatComponent