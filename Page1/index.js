async function fetchData() {
    let response = await fetch('https://jsonplaceholder.typicode.com/posts');
    let data = await response.json()
    localStorage.setItem('posts', JSON.stringify(data));
}

fetchData()
    .catch(e => alert(e.message))


const mainContainer = document.getElementById('main-container');
const select = document.getElementById('user-id-filter');

const createContainer = (element, className, content) => {
    const container = document.createElement(`${element}`);
    container.classList.add(`${className}`);
    if (content) {
        container.innerHTML = content;
    }
    return container
}


const createPosts = (item) => {
    const postContainer = createContainer('div', 'post-container');
    const titleContainer = createContainer('div', 'title-container', item.id + '. ' + item.title);
    const userIdContainer = createContainer('div', 'user-id-container', 'From User Id: ' + item.userId);
    const bodyContainer = createContainer('div', 'body-container', item.body);

    postContainer.appendChild(titleContainer);
    postContainer.appendChild(bodyContainer);
    postContainer.appendChild(userIdContainer);
    mainContainer.appendChild(postContainer);

}

const sortTitle = () => {
    mainContainer.innerHTML = '';
    const sortedPostsByTitle = [...posts].sort((prev,next) => prev.title.localeCompare(next.title))
    sortedPostsByTitle.map(item => createPosts(item));
}

const sortId = () => {
    mainContainer.innerHTML = '';
    posts.map(item => createPosts(item));
}

const filterUserId = () => {
    mainContainer.innerHTML = '';
    const filteredPosts = [...posts].filter(item => item.userId === select.selectedIndex + 1);
    filteredPosts.map(item => createPosts(item));
}


const posts = JSON.parse(localStorage.getItem('posts'))
const uniqueUserIds = [... new Set(posts.map(item => parseInt(item.userId)))].sort((a,b) => a-b);

if (posts) {
    posts.map(item => createPosts(item))
    for (let i=0; i < uniqueUserIds.length; i++) {
        let option = document.createElement('option');
        option.id = `option-${i+1}`
        option.innerHTML = uniqueUserIds[i];
        select.appendChild(option);
    }
} else {
    console.log('error')
}