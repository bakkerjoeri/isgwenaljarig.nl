dayjs.locale('nl');

window.setInterval(update, 500);
update();

function getNextBirthday() {
	const now = dayjs();
	const possibleBirthday = dayjs(`${dayjs().year()}-06-20T12:57:00.000+02:00`);

	if (now.isBefore(possibleBirthday.add(1, 'day'), 'day')) {
		return possibleBirthday;
	}

	return possibleBirthday.add(1, 'year');
}

function shouldWeCelebrate(birthday) {
	return dayjs().isAfter(birthday) &&
		dayjs().isBefore(birthday.add(1, 'day'), 'day');
}

function update() {
	const birthday = getNextBirthday();
	const videoBackgroundElement = document.querySelector('.video-background');
	const countdownElement = document.querySelector('.countdown');

	if (shouldWeCelebrate(birthday)) {
		videoBackgroundElement.classList.remove('is-hidden');
		videoBackgroundElement.classList.remove('close');
		videoBackgroundElement.classList.remove('very-close');
		videoBackgroundElement.classList.remove('today');

		countdownElement.innerHTML = `
			<h1>Jaaaa 🎉🎉🎉🎉<br/><br/>Gwen is jarig!</h1>
		`;

		document.title = '🎉 Gwen is jarig!';
	} else {
		videoBackgroundElement.classList.add('is-hidden');

		const timeLeft = birthday.diff(dayjs());
		const secondsLeft = Math.floor((timeLeft / 1000) % 60);
		const minutesLeft = Math.floor((timeLeft / (1000 * 60)) % 60);
		const hoursLeft = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
		const daysLeft = Math.floor((timeLeft / (1000 * 60 * 60 * 24)) % 365);

		let title = 'Nope.';

		if (daysLeft > 7 && daysLeft <= 31) {
			videoBackgroundElement.classList.remove('is-hidden');
			videoBackgroundElement.classList.add('close');

			title = 'Het komt dichtbij!!'
		} else if (daysLeft <= 7 && daysLeft > 0) {
			videoBackgroundElement.classList.remove('is-hidden');
			videoBackgroundElement.classList.add('very-close');

			title = `Ooh, nog maar ${daysLeft} ${daysLeft === 1 ? 'nachtje' : 'nachtjes'} slapen!`;
		} else if (daysLeft === 0) {
			videoBackgroundElement.classList.remove('is-hidden');
			videoBackgroundElement.classList.add('today');

			title = `BIJNA!`;
		}

		countdownElement.innerHTML = `
			<h1>${title}</h1>
			
			<p>
				Nog ${daysLeft} ${daysLeft === 1 ? 'dag' : 'dagen'},
				${hoursLeft} uur,
				${minutesLeft} ${minutesLeft === 1 ? 'minuut' : 'minuten'} en
				${secondsLeft} ${secondsLeft === 1 ? 'seconde' : 'seconden'}.
			</p>
		`;

		document.title = 'Is Gwen al jarig?';

	}
}