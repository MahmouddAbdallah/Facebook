import { Link } from "react-router-dom"
import Icons from "./Icons"
import { useSelector } from "react-redux"
const Sidebar = () => {
    const { _id, picture } = useSelector((state) => state.user.data)
    const sidebar = [
        {
            icon: `http://localhost:8000/${picture}`,
            title: "profile",
            href: `/profile/${_id}`
        },
        {
            icon: Icons.firends,
            title: "Firends",
            href: "/firends"
        },
        {
            icon: Icons.Memories,
            title: "Memories",
            href: "/memories"
        },
        {
            icon: Icons.save,
            title: "Save",
            href: "/save"
        },
        {
            icon: Icons.videos,
            title: "Videos",
            href: "/videos"
        },
    ]
    return (
        <div>
            <aside className=" w-[300px] p-3 hidden lg:block">
                <ul className="flex flex-col ">
                    {
                        sidebar.map((items, i) => {
                            return (
                                <li key={items.title} className="hover:bg-black/10 w-full py-2 px-1 rounded-lg ">
                                    <Link to={items.href} >
                                        <div className="flex gap-2 items-center">
                                            <div className="w-10">
                                                <img className={`w-10 ${i == 0 ? 'rounded-full h-10' : ""}`} src={items.icon} alt="" />
                                            </div>
                                            <div>
                                                <h4>{items.title}</h4>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </aside>
        </div >
    )
}

export default Sidebar