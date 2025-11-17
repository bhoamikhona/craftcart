"use client";
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";

export default function ProfilePage(){
    const { data: session, status } = useSession();
    if( status === "loading") return <p>Loading...</p>;
    if (!session) {
        redirect("/login");
    }
    
    const user = session.user;

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold">Profile Page</h1>
            <p className ="mt-4"> Welcome, {user.name}</p>
            <p>Email: {user.email}</p>
        </div>
    );

}
