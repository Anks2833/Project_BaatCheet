import React from 'react'

const Message = (props) => {

    const {name, time, permission, message} = props;

    return (
        <>
            <div className="flex flex-col">

                <div className="w-[18vw] min-h-[10vh] rounded-xl bg-zinc-950 border border-zinc-700">
                    <div className="flex items-center justify-between">
                        <div className='flex flex-col p-3 leading-none'>
                            <h1 className="text-xl text-white leading-none capitalize">{name}</h1>
                            <h1 className="text-xs text-zinc-500 capitalize">{permission}</h1>
                        </div>

                        <div className='pr-5'>
                            <h1 className='text-xs'>{time}</h1>
                        </div>
                    </div>

                    <div className="w-full px-3 pb-3"><p>{message}</p></div>
                </div>

            </div>
        </>
    )
}

export default Message