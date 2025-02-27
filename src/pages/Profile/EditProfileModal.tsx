import { useState } from "react";
import { supabase } from "../../utils/client";
import { z } from "zod";

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

const phoneSchema = z.string().refine((value) => {
    return /^[0-9]{10}$/.test(value);
}, {
    message: 'Phone number must be exactly 10 digits and contain only numbers',
});

function EditProfileModal({ userData, onUpdate }: Props) {
    const [updatedData, setUpdatedData] = useState<USER>(userData);
    const [phoneError, setPhoneError] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState<boolean>(false); 
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); 

    const handleUpdate = async () => {
        setIsSaving(true);

        const validationResult = phoneSchema.safeParse(updatedData.phone);

        if (!validationResult.success) {
            setPhoneError("Invalid phone number");
            setIsSaving(false);
            return;
        }

        const { error } = await supabase
            .from("users")
            .update({
                firstname: updatedData.firstname,
                lastname: updatedData.lastname,
                phone: validationResult.data,
                gender: updatedData.gender
            })
            .eq("username", updatedData.username);

        if (error) {
            console.error(error);
        } else {
            setIsModalOpen(false);
            onUpdate();
        }

        setIsSaving(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleModalToggle = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <>
            <input
                type="checkbox"
                id="my_modal_1"
                className="modal-toggle w-5xl"
                checked={isModalOpen}
                onChange={handleModalToggle}
            />
            <div className={`modal ${isModalOpen ? 'open' : ''} `} role="dialog">
                <div className="modal-box md:w-full px-4 card dark:text-mywhite dark:bg-mynavy">
                    <h3 className="font-bold text-center text-lg">
                        Edit Your Profile
                    </h3>
                    <div className="flex font-semibold justify-around mt-5 flex-col sm:flex-row">
                        <div className="flex flex-col">
                            {[
                                { label: "First Name", key: "firstname", type: "text", placeholder: "First Name" },
                                { label: "Last Name", key: "lastname", type: "text", placeholder: "Last Name" },
                                { label: "Phone", key: "phone", type: "text", placeholder: "Phone Number", error: phoneError }
                            ].map(({ label, key, type, placeholder, error }) => (
                                <div key={key} className="w-full sm:p-4 p-1">
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 ml-1 tracking-wider">
                                        {label}
                                    </label>
                                    <input
                                        type={type}
                                        name={key}
                                        placeholder={placeholder}
                                        className={`mt-2 p-2 w-full placeholder:text-sm border rounded-xl shadow transition-colors duration-300
                                            border-gray-300 focus:border-gray-400 focus:ring-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2
                                            dark:bg-gray-800 dark:border-gray-600 dark:focus:border-gray-500 dark:focus:ring-gray-500
                                            ${error ? "border-red-500 dark:border-red-400" : ""}`}
                                        value={updatedData[key as keyof USER]}
                                        onChange={(e) => {
                                            setUpdatedData((prevData) => ({ ...prevData, [key]: e.target.value }));
                                            if (key === "phone") setPhoneError(null);
                                        }}
                                    />
                                    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col">
                            <div className="w-full sm:p-4 p-1">
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 ml-1 tracking-wider">
                                    Gender
                                </label>
                                <select
                                    name="gender"
                                    className="mt-2 p-2 w-full placeholder:text-sm border border-gray-300 dark:border-gray-600 rounded-xl shadow transition-colors duration-300
                                    focus:border-gray-400 focus:ring-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2
                                    dark:bg-gray-800 dark:focus:border-gray-500 dark:focus:ring-gray-500"
                                    value={updatedData.gender}
                                    onChange={(e) =>
                                        setUpdatedData((prevData) => ({ ...prevData, gender: e.target.value }))
                                    }
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Prefer not to say">Prefer not to say</option>
                                </select>
                            </div>
                            <div className="w-full sm:p-4 p-1">
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 ml-1 tracking-wider">
                                    Email
                                </label>
                                <p className="ml-1 dark:text-gray-300">{userData.email}</p>
                            </div>
                            <div className="w-full sm:p-4 p-1">
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 ml-1 tracking-wider">
                                    Account Creation Date
                                </label>
                                <p className="ml-1 dark:text-gray-300">{String(userData.createdAt)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="modal-action pe-5">
                        <button
                            className={`btn hover:bg-mygreen bg-myyellow text-black dark:bg-gray-700 dark:text-white dark:hover:bg-green-600
                            ${isSaving && "opacity-50 cursor-not-allowed"}`}
                            onClick={handleUpdate}
                            disabled={isSaving}
                        >
                            {isSaving ? "Saving..." : "Save"}
                        </button>
                        <button
                            className="btn hover:bg-myred bg-myred text-black dark:bg-gray-700 dark:text-white dark:hover:bg-red-600"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditProfileModal;
