import React, { useState } from "react";
import useClickOutside from "@/app/hooks/useClickOutside";
import { FiEye, FiEyeOff } from "react-icons/fi";
import AXIOS_INSTANCE from "@/lib/axios";
import { toast } from 'sonner';
import LoaderIcon from "../generalComponents/LoaderIcon";
import { useRouter } from "next/navigation";


const ChangePasswordPopup = ({ closeModal }) => {

    const popupRef = useClickOutside(() => closeModal(false));
    const router = useRouter();


    const [isLoading, setIsLoading] = useState(false)

    const [formValues, setFormValues] = useState({
        currentPassword: "",
        newPassword: "",
    });

    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
    });

    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value.trim() });
    };

    const handleSubmit = async (e) => {
        toast.dismiss()
        e.preventDefault();
        setIsLoading(true)

        try {
            const response = await AXIOS_INSTANCE.post(`change-password/`, formValues);
            closeModal(false)
            toast.success('Password updated successfully. Please log in with your new password.')
            setTimeout(() => {
                router.replace('/login')
            }, 2000);

        } catch (error) {
            toast.error(error?.response?.data?.error)

        } finally {
            setIsLoading(false)
        }
    };


    return (
        <div className="fixed inset-0 flex items-center justify-center z-[999] bg-black/50 bg-opacity-40">
            <div
                ref={popupRef}
                className="bg-white rounded-2xl shadow-lg p-6 w-lg"
            >
                <h2 className="text-xl text-center font-semibold mb-7">
                    Change your password
                </h2>

                <form onSubmit={handleSubmit}>
                    {/* Current Password */}
                    <div className="mb-3">
                        <label className="block text-sm font-medium mb-1">
                            Current Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword.current ? "text" : "password"}
                                name="currentPassword"
                                value={formValues.currentPassword}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none pr-10"
                                required
                            />
                            <span
                                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                                onClick={() =>
                                    setShowPassword((prev) => ({
                                        ...prev,
                                        current: !prev.current,
                                    }))
                                }
                            >
                                {showPassword.current ? <FiEye /> : <FiEyeOff />}
                            </span>
                        </div>
                    </div>

                    {/* New Password */}
                    <div className="mb-3">
                        <label className="block text-sm font-medium mb-1">
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword.new ? "text" : "password"}
                                name="newPassword"
                                value={formValues.newPassword}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none pr-10"
                                required
                            />
                            <span
                                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                                onClick={() =>
                                    setShowPassword((prev) => ({
                                        ...prev,
                                        new: !prev.new,
                                    }))
                                }
                            >
                                {showPassword.new ? <FiEye /> : <FiEyeOff />}
                            </span>
                        </div>
                    </div>

                    <div className={`flex ${isLoading ? 'pointer-events-none' : 'pointer-events-auto'} justify-end gap-3 mt-4`}>
                        <button
                            type="button"
                            onClick={() => closeModal(false)}
                            className="w-20 h-9 cursor-pointer rounded-sm bg-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-20 h-9 flex-center cursor-pointer rounded-sm bg-sky-blue-1 text-white"
                        >
                            {isLoading ? <LoaderIcon className='text-white text-2xl animate-spin' /> : 'Confirm'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordPopup;
