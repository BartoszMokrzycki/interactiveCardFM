/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html'],
	theme: {
		extend: {
			fontFamily: {
				space: ['Space Grotesk', 'sans-serif'],
			},
			colors: {
				projectWhite: '#ffffff',
				projectLightGreylishViolet: '#dedddf',
				projectDarkGreylishViolet: '#8e8593',
				projectVeryDarkViolet: '#21092f',
				primaryGradientFrom: '#6648fe',
				primaryGradientTo: '#600594',
				primaryError: '#ff5252',
			},
			backgroundImage: {
				'gradient-primary': 'linear-gradient(to right, #6648fe, #600594)',
			},
		},
	},
	plugins: [],
};
