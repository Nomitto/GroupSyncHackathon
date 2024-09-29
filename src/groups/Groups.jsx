import { useEffect, useState } from "react"
import "./group.css"
import "./groupInfo.css"
import { getGroups, getUser } from "../firebase"
import { useChatStore } from "../chat/chatStore"

const Groups = () => {
    const [loading, setLoading] = useState(true)
    const [userGroups, setUserGroups] = useState([])
    const { currentUser, setCurrentUser } = useState();
    const { changeChat } = useChatStore();

    const logout = () => {
        localStorage.clear()
        window.location.reload()
    }

    const handleSelect = async (chatName) => {
        changeChat(chatName, getUser())
    }

    useEffect(() => {
        async function fetchGroups() {
            try {
                const groups = await getGroups();
                setUserGroups(groups);
                currentUser = setCurrentUser(getUser());
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetchGroups();
    })

    if (loading) {
        return (<p>Loading...</p>)
    }

    return (
        <div className="group">
            <div className="top">
                <h2 className="groupTitle">Groups</h2>
                {userGroups.map((item, index) => (
                    <div className="single-group" key={index}>
                        <div className="groupInfo" onClick={() => handleSelect(item)}>
                            <div>
                                <h3>{item}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button className="logout" onClick={logout}>Logout</button>
        </div>
        
    )
}

export default Groups