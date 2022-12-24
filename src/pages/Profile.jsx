import Navbar from "../components/Navbar";
import avatar from "../assets/loginIMG.png"

function Profile() {
    return (
        <>
            <Navbar/>
            <div className="grid grid-cols-4 bg-gray-100 h-screen w-full items-center justify-center">
                <div className="bg-white w-72 h-96 rounded-md overflow-hidden shadow-md mx-auto">
                    <div className="gap-x-4 items-center p-6">
                        <h1 className="mb-3 text-black origin-left font-medium text-xl border-solid border-2 border-inherit">Profile</h1>
                        <h1 className="mb-3 text-black origin-left font-medium text-xl border-solid border-2 border-inherit">Riwayat Pemesanan</h1>
                        <h1 className="mb-3 text-black origin-left font-medium text-xl border-solid border-2 border-inherit">Riwayat Pembayaran</h1>
                    </div>
                </div>
                <div className="col-span-3 bg-white w-full max-w-[980px] h-96 rounded-md overflow-hidden shadow-md">
                    <div className="grid grid-cols-6 gap-x-4 p-2">
                        <div className="col-span-3">
                            <h1>Edit Profil</h1>
                            <form>
                                <label className="block items-center py-1.5">
                                <span className="block text-base font-medium  text-slate-700">Nama</span>
                                <input type="name" className="peer ... border p-1 w-full"/>
                                </label>
                            </form>
                            <form>
                                <label className="block items-center py-1.5">
                                <span className="block text-base font-medium  text-slate-700">Email</span>
                                <input type="name" className="peer ... border p-1 w-full"/>
                                </label>
                            </form>
                            <form>
                                <label className="block items-center py-1.5">
                                <span className="block text-base font-medium  text-slate-700">No HP</span>
                                <input type="name" className="peer ... border p-1 w-full"/>
                                </label>
                            </form>
                            <form>
                                <label className="block items-center py-1.5">
                                <span className="block text-base font-medium  text-slate-700">Alamat</span>
                                <input type="name" className="peer ... border p-1 w-full"/>
                                </label>
                            </form>
                            <button className="border w-full my-2 py-1.5 bg-yellow-300 text-blue-600 font-bold">
                                Update Profil
                            </button>
                        </div>
                        <div className="flex col-span-3 items-center justify-center">
                            <div>
                                <h2>Foto Profil</h2>
                                <img src={avatar} alt="avatar" className="h-72 rounded-full"/>
                                <p className="flex justify-center">John Doe</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;