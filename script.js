document.getElementById('roast-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const language = document.getElementById('language').value.trim();

    if (username === '' || language === '') {
        alert('Please fill in both fields');
        return;
    }

    const roastResult = document.getElementById('roast-result');
    roastResult.innerHTML = 'Roasting... Please wait.';

    try {
        // Fetch data from GitHub API
        const userData = await fetch(`https://api.github.com/users/${username}`);
        const reposData = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        
        if (!userData.ok || !reposData.ok) {
            throw new Error('User not found or API limit exceeded');
        }

        const userJson = await userData.json();
        const reposJson = await reposData.json();

        // Calculate the roast based on the user's profile and repositories
        const publicRepos = reposJson.length;
        const followers = userJson.followers;
        const avatar = userJson.avatar_url;

        let roastMessage = `<img src="${avatar}" alt="${username}'s Avatar" class="avatar" /><h2>@${username}, here’s your roast:</h2>`;

        if (publicRepos === 0) {
            roastMessage += `<p>You have ${publicRepos} public repositories? Looks like you're just a fan of the "Star" button...</p>`;
        } else if (publicRepos < 5) {
            roastMessage += `<p>You have ${publicRepos} repositories. How many of those are just copy-paste from StackOverflow?</p>`;
        } else {
            roastMessage += `<p>Wow, ${publicRepos} repositories! But are they all empty? Because GitHub doesn't care if your repos have 0 commits...</p>`;
        }

        if (followers < 10) {
            roastMessage += `<p>Followers count: ${followers}. I think your mom and your dog might be your only fans.</p>`;
        } else if (followers < 50) {
            roastMessage += `<p>Oh, ${followers} followers? Maybe it's time to update your profile and add a cat picture for more attention.</p>`;
        } else {
            roastMessage += `<p>${followers} followers? You must be posting a lot of cat memes and JavaScript tutorials!</p>`;
        }

        roastMessage += `<p>Your favorite language is <strong>${language}</strong>. Is it because it’s the only language you understand?</p>`;
        
        roastResult.innerHTML = roastMessage;

    } catch (error) {
        roastResult.innerHTML = `<p>Oops! Something went wrong. Could not find the user.</p>`;
    }
});
