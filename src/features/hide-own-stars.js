import {getUsername, observeEl} from '../libs/utils';

// Hide other users starring/forking your repos
export default async function () {
	const {hideStarsOwnRepos} = safari.extension.settings; // eslint-disable-line no-undef

	if (hideStarsOwnRepos) {
		const username = getUsername();
		observeEl('#dashboard .news', () => {
			$('#dashboard .news .watch_started, #dashboard .news .fork')
				.has(`a[href^="/${username}"]`)
				.css('display', 'none');
		});
	}
}

