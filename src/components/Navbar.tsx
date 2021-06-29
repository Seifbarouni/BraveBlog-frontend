export default function Navbar () {
    return (
        <div className="border flex items-center lg:justify-around justify-between p-2 bg-white shadow-sm">
      <div className="flex items-center cursor-pointer">
        <img src="./logo.png" alt="" className="h-12 w-12"/>
        <span className="font-bold ml-2">Blaviken</span>
      </div>
      <div className="flex items-center">
        <span className="hover:underline cursor-pointer">Log in</span>
        <span className="rounded-full bg-black  hover:bg-gray-800 cursor-pointer text-white px-2 py-1 ml-2">Register</span>
      </div>
    </div>
    )
};