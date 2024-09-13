import {useAuth} from "@/context";
import {User} from "firebase/auth";
import React, {useEffect, useState} from "react";
import {updateDoc} from "@firebase/firestore";
import {doc, getDoc} from "firebase/firestore";
import {db} from "@/config/firebase";

interface UserProfile {
    age: string;
    gender: string;
    skinColor: string;
    hairColor: string;
}

type UserProfileprops = {
    user:User
}

export default function UserProfile({user}: UserProfileprops) {
    const [profile, setProfile] = useState<UserProfile>({
        age: '',
        gender: '',
        skinColor: '',
        hairColor: ''
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            if (user) {
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setProfile(docSnap.data() as UserProfile);
                }
            }
        };
        fetchProfile();
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (user) {
            const docRef = doc(db, 'users', user.uid);
            // @ts-ignore
            await updateDoc(docRef, profile);
            setIsEditing(false);
        }
    };
    const handleCancel = () => {
        setProfile(profile);
        setIsEditing(false);
    };
    return (
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4 text-center">User Profile</h2>
                {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col">
                            <label htmlFor="age" className="mb-2 text-gray-700">Age:</label>
                            <input
                                type="number"
                                id="age"
                                name="age"
                                value={profile.age}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="gender" className="mb-2 text-gray-700">Gender:</label>
                            <select
                                id="gender"
                                name="gender"
                                value={profile.gender}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="">Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="skinColor" className="mb-2 text-gray-700">Skin Color:</label>
                            <input
                                type="text"
                                id="skinColor"
                                name="skinColor"
                                value={profile.skinColor}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="hairColor" className="mb-2 text-gray-700">Hair Color:</label>
                            <input
                                type="text"
                                id="hairColor"
                                name="hairColor"
                                value={profile.hairColor}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full border border-green-500 text-green-500 py-3 rounded-lg hover:bg-green-100 transition-colors duration-300"                        >Save
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="w-full border border-gray-500 text-gray-500 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                        >
                            Cancel
                        </button>
                    </form>
                ) : (
                    <div className="space-y-4">
                        <p className="text-lg text-gray-700"><strong>Age:</strong> {profile.age}</p>
                        <p className="text-lg text-gray-700"><strong>Gender:</strong> {profile.gender}</p>
                        <p className="text-lg text-gray-700"><strong>Skin Color:</strong> {profile.skinColor}</p>
                        <p className="text-lg text-gray-700"><strong>Hair Color:</strong> {profile.hairColor}</p>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                        >Edit
                        </button>
                    </div>
                )}
            </div>
    )
}