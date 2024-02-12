const routes = [
	{
		text: "Home",
		icon: "home",
		path: "/home",
		subItems: [
			{
				icon: "attachment",
				text: "Subitem 1 for Home",
				path: "/subitem1",
			},
			{
				icon: "arrow-top",
				text: "Subitem 2 for Home",
				path: "/subitem2",
			},
		],
	},
	{
		text: "People",
		icon: "group",
		path: "/people",
		subItems: [
			{
				icon: "collapse-group",
				text: "Subitem for People",
				path: "/SubitemPeople",
			},
		],
	},
	{
		text: "Location",
		icon: "locate-me",
		path: "/location",
	},
];

export default routes;
