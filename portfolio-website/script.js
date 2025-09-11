
// Typing animation for hero section text
document.addEventListener('DOMContentLoaded', function() {
	const heroText = document.querySelector('.hero p');
	if (!heroText) return;
	const fullText = heroText.textContent;
	heroText.textContent = '';
	let i = 0;
	function type() {
		if (i < fullText.length) {
			heroText.textContent += fullText.charAt(i);
			i++;
			setTimeout(type, 35); // Adjust speed here
		}
	}
	type();
});

