import React from 'react'
import { useSelector } from 'react-redux'

const ChatMessgae = ({message}) => {
    const auth = useSelector(store=>store.auth)
    const isReqMessage = auth.user.id === message.user.id
    return (
        <div className={`flex ${!isReqMessage?'justify-start':'justify-end'} text-white`}>
            <div className={`p-1 ${message.image ? 'rounded-md' : 'px-5 rounded-full'} bg-[#191c29]`}>
                {
                    message.image && <img alt='' className='w-[15rem] h-[20rem] object-cover rounded-md' src={message.image}/>
                }
                <p className={`${true ? 'py-2' : 'py-1'}`}>
                    {message.content}
                </p>
            </div>
        </div>
    )
}

export default ChatMessgae
