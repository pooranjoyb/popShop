import { useState } from "react";
import { supabase } from "../../utils/client";
interface USER {
    username: string;
    email: string;
    pass: string;
    firstname: string;
    lastname: string;
    gender: string;
    phone: string;
    createdAt: string | null;
}

interface Props {
    userData: USER;
    onUpdate: () => void;
}

function EditProfileModal({ userData, onUpdate }: Props) {
    const [updatedData, setUpdatedData] = useState<USER>(userData);

    const handleUpdate = async () => {
        const { error } = await supabase
            .from("users")
            .update({ ...updatedData })
            .eq("username", updatedData.username);

        if (error) {
            console.error(error);
        } else {
            setUpdatedData(updatedData);
            onUpdate();
        }
    };

    return (
        <>
            <input
                type="checkbox"
                id="my_modal_1"
                className="modal-toggle w-5xl"
            />
            <div className="modal" role="dialog">
                <div className="modal-box w-full card">
                    <h3 className="font-bold text-center text-lg">
                        Edit Your Profile
                    </h3>
                    <div className="flex font-semiold justify-around mt-5 flex-col sm:flex-row">
                        <div className="flex flex-col">
                            <div className="w-full sm:p-4 p-1">
                                <label
                                    htmlFor="firstname"
                                    className="block text-sm font-bold text-gray-700 ml-1 tracking-wider"
                                >
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="firstname"
                                    name="firstname"
                                    placeholder="first name"
                                    className="mt-2 p-2 w-full placeholder:text-sm  border border-[#C4C4C4] rounded-xl shadow focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                                    value={updatedData.firstname}
                                    onChange={(e) =>
                                        setUpdatedData((prevData) => ({ ...prevData, firstname: e.target.value }))
                                    }
                                />
                            </div>
                            <div className="w-full sm:p-4 p-1">
                                <label
                                    htmlFor="lastname"
                                    className="block text-sm font-bold text-gray-700 ml-1 tracking-wider"
                                >
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="lastname"
                                    name="lastname"
                                    placeholder="last name"
                                    className="mt-2 p-2 w-full border border-[#C4C4C4] rounded-xl shadow focus:border-gray-200 focus:outline-none placeholder:text-sm focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                                    value={updatedData.lastname}
                                    onChange={(e) =>
                                        setUpdatedData((prevData) => ({ ...prevData, lastname: e.target.value }))
                                    }
                                />
                            </div>
                            <div className="w-full sm:p-4 p-1">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-bold text-gray-700 ml-1 tracking-wider"
                                >
                                    Phone
                                </label>
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    placeholder="9546897889"
                                    className="mt-2 p-2 w-full placeholder:text-sm  border border-[#C4C4C4] rounded-xl shadow focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                                    value={updatedData.phone}
                                    onChange={(e) =>
                                        setUpdatedData((prevData) => ({ ...prevData, phone: e.target.value }))
                                    }
                                />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="w-full sm:p-4 p-1">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-bold text-gray-700 ml-1 tracking-wider"
                                >
                                    Gender
                                </label>
                                <p className="ml-1">{userData.gender.charAt(0).toUpperCase() + userData.gender.slice(1)}</p>
                            </div>
                            <div className="w-full sm:p-4 p-1">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-bold text-gray-700 ml-1 tracking-wider"
                                >
                                    Email
                                </label>
                                <p className="ml-1">{userData.email}</p>
                            </div>
                            <div className="w-full sm:p-4 p-1">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-bold text-gray-700 ml-1 tracking-wider"
                                >
                                    Account creation date
                                </label>
                                <p className="ml-1">{String(userData.createdAt)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="modal-action  pe-5">
                        <label
                            htmlFor="my_modal_1"
                            className="btn hover:bg-mygreen bg-myyellow"
                            onClick={handleUpdate}
                        >
                            Save
                        </label>

                        <label
                            htmlFor="my_modal_1"
                            className="btn hover:bg-myred bg-myred"
                        >
                            Cancel
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditProfileModal;