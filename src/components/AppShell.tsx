import {
	Avatar,
	List,
	ListMode,
	ListPropTypes,
	ResponsivePopover,
	ShellBar,
	ShellBarItem,
	ShellBarItemPropTypes,
	StandardListItem,
	ResponsivePopoverDomRef,
	Icon,
} from "@ui5/webcomponents-react";
import { useEffect, useRef, useState } from "react";
import paletteIcon from "@ui5/webcomponents-icons/dist/palette.js";
import menu from "@ui5/webcomponents-icons/dist/menu2.js";
import close from "@ui5/webcomponents-icons/dist/collapse.js";
import { createUseStyles } from 'react-jss';
import {
	getTheme,
	setTheme,
} from "@ui5/webcomponents-base/dist/config/Theme.js";

type AppShellProps = {
	companyName: string;
	companyLogo: string;
	productName: string;
	isNotifiction?: boolean;
	notificationCount?: string;
	userName: string;
	userImage: string;
	callback: (isCollapsed: boolean) => void;
};

const THEMES = [
	{ key: "sap_horizon", value: "Morning Horizon (Light)" },
	{ key: "sap_horizon_dark", value: "Evening Horizon (Dark)" },
	{ key: "sap_horizon_hcb", value: "Horizon High Contrast Black" },
	{ key: "sap_horizon_hcw", value: "Horizon High Contrast White" },
];

const AppShell = ({
	companyLogo,
	companyName,
	productName,
	isNotifiction,
	notificationCount,
	userName,
	userImage,
	callback,
}: AppShellProps) => {
	const [currentTheme, setCurrentTheme] = useState(getTheme);
	const [isCollapseSidebar, setCollapseSidebar] = useState(true);
	const popoverRef = useRef<ResponsivePopoverDomRef | null>(null);

	const handleThemeSwitch: ListPropTypes["onSelectionChange"] = (e) => {
		const { targetItem } = e.detail;
		const selectedTheme: string = targetItem.dataset.key!;
		setTheme(targetItem.dataset.key!);
		setCurrentTheme(targetItem.dataset.key!);
		localStorage.setItem("Theme", selectedTheme);
	};
	const handleThemeSwitchItemClick: ShellBarItemPropTypes["onClick"] = (e) => {
		popoverRef.current?.showAt(e.detail.targetRef);
	};

	const handleNavMenuButtonclick = () => {
		setCollapseSidebar((isCollapseSidebar) => !isCollapseSidebar);
		callback(isCollapseSidebar);
	};

	useEffect(() => {
		const storedTheme: string | null = localStorage.getItem("Theme");
		if (storedTheme) {
			setCurrentTheme(storedTheme);
			setTheme(storedTheme);
		}
	}, []);
	return (
		<>
			<div>
				<ShellBar
					className="relative"
					logo={
						<img
							className="h-12 w-12 rounded-full object-cover"
							src={companyLogo}
							alt={`${companyName} Logo`}
						/>
					}
					primaryTitle={productName}
					profile={
						<Avatar className="cursor-pointer w-10 h-10 rounded-full outline-none">
							<img
								className="w-full h-full rounded-full object-cover"
								src={userImage}
								alt={userName}
							/>
						</Avatar>
					}
					showNotifications={isNotifiction}
					notificationsCount={notificationCount}>
					<ShellBarItem
						icon={paletteIcon}
						text="Change Theme"
						onClick={handleThemeSwitchItemClick}
					/>
				</ShellBar>
				<button className="absolute transition-all z-50 top-3 outline-black text-center p-1 rounded-lg left-2">
					<Icon
						className="h-6 w-6 text-black cursor-pointer shadow-sm transition-all"
						onClick={handleNavMenuButtonclick}
						name={isCollapseSidebar ? menu : close}
					/>
				</button>
			</div>

			<ResponsivePopover
				ref={popoverRef}
				className="popover">
				<List
					onSelectionChange={handleThemeSwitch}
					headerText="Switch Theme"
					mode={ListMode.SingleSelect}>
					{THEMES.map((theme) => (
						<StandardListItem
							key={theme.key}
							selected={currentTheme === theme.key}
							data-key={theme.key}>
							{theme.value}
						</StandardListItem>
					))}
				</List>
			</ResponsivePopover>
		</>
	);
};

export default AppShell;
