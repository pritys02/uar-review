import employeeIcon from "@ui5/webcomponents-icons/dist/employee.js";
import { Label } from "@ui5/webcomponents-react";
import userImage from "./images/userImages/user1.jpg";
import DateTimePickerCard from "./components/DateTimePickerCard";
import CustomComponent from "./components/CustomComponent";
import SideNavbar from "./components/SideNavbar";
import routes from "./lib/data";
import AppShell from "./components/AppShell";
import companyLogo from "./images/irm.png";
import { useState } from "react";

function App() {
	const [isCollapsed, setIsCollapse] = useState(false);
	console.log(isCollapsed);

	return (
		<>
			<AppShell
				companyName="TRP Global"
				productName="iRM"
				isNotifiction={true}
				notificationCount="10"
				companyLogo={companyLogo}
				userImage={userImage}
				userName="John Doe"
				callback={setIsCollapse}
			/>

			<div className="flex bg-gray-300 mt-1 ml-1 mr-1 rounded-xl p-3 gap-x-2">
				<div>
					<SideNavbar items={routes} />
				</div>

				<div className="flex flex-col flex-grow w-[90dvw] bg-red-400 rounded-lg p-2">
					<p className="text-center text-2xl text-black font-bold mt-4">
						Welcome to UI5 Remote
					</p>
					<div className="flex gap-x-3 text-center justify-center items-center mt-5">
						<Label className="text-black font-semibold text-lg">
							Select Date-Time
						</Label>
						<DateTimePickerCard />
					</div>

					<div className="flex justify-center">
						<CustomComponent
							icon={employeeIcon}
							cssStyles={
								"text-black bg-gray-200 active:outline-none focus:!outline-none active:border-none p-2 rounded-md mt-4 hover:bg-gray-600 scale-100 hover:outline-none hover:border-none border-none hover:text-white scale-105 transition-all duration-300 ease-in-out"
							}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
