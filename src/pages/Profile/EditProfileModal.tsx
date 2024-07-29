import { useState } from "react";
import { supabase } from "../../utils/client";
import { z } from "zod";
import validator from "validator";

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
            return; // Exit early if validation fails
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
            setIsModalOpen(false); // Close the modal upon successful update
            onUpdate();
        }

        setIsSaving(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false); // Close the modal on cancel
        // Optionally, reset form fields or perform other cancel actions
    };

    const handleModalToggle = () => {
        setIsModalOpen(!isModalOpen); // Toggle modal open/close
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
            <div className={`modal ${isModalOpen ? 'open' : ''}`} role="dialog">
                <div className="modal-box md:w-full px-4 card">
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
                                    placeholder="First Name"
                                    className="mt-2 p-2 w-full placeholder:text-sm border border-[#C4C4C4] rounded-xl shadow focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
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
                                    placeholder="Last Name"
                                    className="mt-2 p-2 w-full placeholder:text-sm border border-[#C4C4C4] rounded-xl shadow focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                                    value={updatedData.lastname}
                                    onChange={(e) =>
                                        setUpdatedData((prevData) => ({ ...prevData, lastname: e.target.value }))
                                    }
                                />
                            </div>
                            <div className="w-full sm:p-4 p-1">
                                <label
                                    htmlFor="phone"
                                    className="block text-sm font-bold text-gray-700 ml-1 tracking-wider"
                                >
                                    Phone
                                </label>
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    placeholder="Phone Number"
                                    className={`mt-2 p-2 w-full placeholder:text-sm border ${phoneError ? 'border-red-500' : 'border-[#C4C4C4]'} rounded-xl shadow focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300`}
                                    value={updatedData.phone}
                                    onChange={(e) => {
                                        setUpdatedData((prevData) => ({ ...prevData, phone: e.target.value }));
                                        setPhoneError(null); // Clear phone error on input change
                                    }}
                                />
                                {phoneError && (
                                    <p className="text-red-500 text-sm mt-1">{phoneError}</p>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="w-full sm:p-4 p-1">
                                <label
                                    htmlFor="gender"
                                    className="block text-sm font-bold text-gray-700 ml-1 tracking-wider"
                                >
                                    Gender
                                </label>
                                <select
                                    name="gender"
                                    id="gender"
                                    className="mt-2 p-2 w-full placeholder:text-sm border border-[#C4C4C4] rounded-xl shadow focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
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
                                    htmlFor="createdAt"
                                    className="block text-sm font-bold text-gray-700 ml-1 tracking-wider"
                                >
                                    Account Creation Date
                                </label>
                                <p className="ml-1">{String(userData.createdAt)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="modal-action  pe-5">
                        <button
                            className={`btn hover:bg-mygreen bg-myyellow ${isSaving && 'opacity-50 cursor-not-allowed'}`}
                            onClick={handleUpdate}
                            disabled={isSaving}
                        >
                            {isSaving ? 'Saving...' : 'Save'}
                        </button>
                        <button
                            className="btn hover:bg-myred bg-myred"
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
