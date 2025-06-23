
import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/Navbar";

export default function Dashboard() {


    return (
        <div className="   h-screen w-full ">

            <Navbar />

            <div className=" w-full h-full  flex">

                {/* sidebar */}
                <Sidebar />

                <div className=" flex-1  ml-4  mr-8 mb-0 rounded-xl bg-[#F7FBFD] w-full flex justify-center items-center h-[97vh] z-50">
                    <div className=" w-6/12  text-center">
                        <h3 className=" text-brand-blue  text-5xl ">Welcome! Jerald Jacob</h3>
                        <p className=" mt-7 leading-relaxed  text-[#2F2F2F] font-light px-10 text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque rutrum, metus at varius placerat, ligula justo fermentum lorem, sit amet feugiat nulla mauris vitae purus. Suspendisse potenti. </p>
                    </div>
                </div>

            </div>
        </div>
    )
}