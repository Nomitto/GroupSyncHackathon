import { useEffect, useState } from "react"
import "./chat.css"
import { arrayUnion, doc, getFirestore, onSnapshot, updateDoc } from "firebase/firestore"
import { useChatStore } from "./chatStore"
import { getUser } from "../firebase"

const Chat = () => {
    const db = getFirestore();

    const [chat, setChat] = useState()
    const [text, setText] = useState("")

    const { chatName } = useChatStore();
    const currentUser = getUser();

    const handleText = (e) => {
        setText(e)
    }

    const handleSend = async () => {
        if (text === "") return;

        try {
            await updateDoc(doc(db, "chats", chatName), {
                messages:arrayUnion({
                    senderId: currentUser.displayName,
                    text,
                    createdAt: new Date(),
                })
            })
            setText("")
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", chatName), (res) => {
            setChat(res.data()["messages"])
        });

        return () => {
            unSub();
        }
    }, [chatName])
    
    return (
        <div className="chatDetail">
            <div className="top">
                <div className="group">
                    <span>{chatName}</span>
                </div>
            </div>
            <div className="center">
                {chat?.map((item, index) => (
                    <div className={item.senderId===currentUser.displayName ? "message own" : "message notOwn"} key={item?.createAt}>
                        <span>{item.senderId}</span>
                        <div className="text">
                            <p>{item.text}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="bottom">
                <input className="textbox" type="text" placeholder="Type a message..." onChange={e => handleText(e.target.value)}/>

                <button className="sendButton" onClick={handleSend}>Send</button>
            </div>
        </div>
    )
}

export default Chat