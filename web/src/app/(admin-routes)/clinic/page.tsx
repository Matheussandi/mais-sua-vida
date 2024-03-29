import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route"

import { getServerSession } from "next-auth"
import DoctorList from "./components/DoctorsList"

export default async function Clinic(){
	const session = await getServerSession(nextAuthOptions)

	const clinicId = session?.user.id

	return (
		<div className="flex-grow p-10">
		<DoctorList params={clinicId} />
	  </div>
	)
}