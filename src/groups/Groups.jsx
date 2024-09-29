import { useEffect, useState } from "react"
import "./group.css"
import "./groupInfo.css"
import { getGroups, getUser, handleCreateGroup } from "../firebase"
import { useChatStore } from "../chat/chatStore"
import CreateGroupPopUp from "./CreateGroup.tsx"

const Groups = () => {
    const [loading, setLoading] = useState(true)
    const [userGroups, setUserGroups] = useState([])
    const { changeChat } = useChatStore();
    const [showPopUp, setShowPopUp] = useState(false)

    const openPopUp = () => {
        setShowPopUp(true);
    }

    const closePopUp = () => {
        setShowPopUp(false);
    }

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
                <div className="heading">
                    <h2 className="groupTitle">Groups</h2>
                    <button className="addGroup" onClick={openPopUp}>+</button>
                </div>
                {userGroups.map((item, index) => (
                    <div className="single-group" key={index}>
                        <div className="groupInfo" onClick={() => handleSelect(item)}>
                            <div>
                                <h3>{item}</h3>
                            </div>
                        </div>
                    </div>
                ))}
                {showPopUp && <CreateGroupPopUp closePopUp={closePopUp} handleCreateGroup={handleCreateGroup}></CreateGroupPopUp>}
            </div>
            <button className="logout" onClick={logout}>Logout</button>
        </div>
        
    )
}

export default Groups