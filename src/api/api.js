// user api
export const API_BASE_URL = 'http://localhost:5000';
export const API_USERS_REGISTER = `${API_BASE_URL}/users/register`;
export const API_USERS_LOGIN = `${API_BASE_URL}/users/login`;
export const API_USERS_BY_NAME = `${API_BASE_URL}/users/:userName`;
export const API_USERS_BY_ID = `${API_BASE_URL}/users/:userId`;
export const API_USERS_UPDATE = `${API_BASE_URL}/users/:userId`;
export const API_USERS_DELETE = `${API_BASE_URL}/users/:userId`;


// post api
export const API_POSTS_CREATE = `${API_BASE_URL}/posts`;
export const API_POSTS_GET_ALL = `${API_BASE_URL}/posts`;
export const API_POSTS_SEARCH = `${API_BASE_URL}/posts/search`;
export const API_POSTS_BY_ID = `${API_BASE_URL}/posts/:postId`;
export const API_POSTS_UPDATE = `${API_BASE_URL}/posts/:postId`;
export const API_POSTS_DELETE = `${API_BASE_URL}/posts/:postId`;


// space api
export const API_SPACES_CREATE = `${API_BASE_URL}/spaces`;
export const API_SPACES_GET_ALL = `${API_BASE_URL}/spaces`;
export const API_SPACES_BY_ID = `${API_BASE_URL}/spaces/:spaceId`;
export const API_SPACES_UPDATE = `${API_BASE_URL}/spaces`;
export const API_SPACES_DELETE = `${API_BASE_URL}/spaces/:spaceId`;
export const API_SPACES_GET_POSTS = `${API_BASE_URL}/spaces`