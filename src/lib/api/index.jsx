// user api
export const API_BASE_URL = 'http://agora.sauviknath.xyz/api';
export const API_USERS_REGISTER = `${API_BASE_URL}/users/register`;
export const API_USERS_LOGIN = `${API_BASE_URL}/users/login`;
export const API_USERS_BY_NAME = `${API_BASE_URL}/users/:userName`;
export const API_USERS_BY_ID = `${API_BASE_URL}/users/:userId`;
export const API_USERS_UPDATE = `${API_BASE_URL}/user`;
export const API_USERS_DELETE =  (userId) => `${API_BASE_URL}/users/${userId}`;
export const API_USERS_GET_ALL_BOOKMARKS = `${API_BASE_URL}/users/bookmarks`;
export const API_USERS_ADD_BOOKMARK = (postId) => `${API_BASE_URL}/users/bookmark/${postId}`;

// post api
export const API_POSTS_CREATE = `${API_BASE_URL}/posts`;
export const API_POSTS_GET_ALL = `${API_BASE_URL}/posts`;
export const API_POSTS_SEARCH = (text) => `${API_BASE_URL}/posts/search?text=${text}`;
export const API_POSTS_BY_ID = `${API_BASE_URL}/posts/:postId`;
export const API_POSTS_UPVOTE = (postId) => `${API_BASE_URL}/posts/${postId}/upvote`;
export const API_POSTS_DOWNVOTE = (postId) => `${API_BASE_URL}/posts/${postId}/downvote`;
export const API_POSTS_UPDATE = (postId) => `${API_BASE_URL}/posts/${postId}`;
export const API_POSTS_DELETE = `${API_BASE_URL}/posts/:postId`;


// space api
export const API_SPACES_CREATE = `${API_BASE_URL}/spaces`;
export const API_SPACES_GET_ALL = `${API_BASE_URL}/spaces`;
export const API_SPACES_BY_ID = (spaceId) => `${API_BASE_URL}/spaces/${spaceId}`;
export const API_SPACES_JOIN_SPACE = (spaceId) => `${API_BASE_URL}/spaces/${spaceId}/join`;
export const API_SPACES_LEAVE_SPACE = (spaceId) => `${API_BASE_URL}/spaces/${spaceId}/leave`;
export const API_SPACES_GET_ALL_MEMBERS = (spaceId) => `${API_BASE_URL}/spaces/${spaceId}/members`;
export const API_SPACES_CREATE_LABEL = (spaceId) => `${API_BASE_URL}/spaces/${spaceId}/labels`
export const API_SPACES_UPLOAD_COVER_PHOTO = (spaceId) => `${API_BASE_URL}/spaces/${spaceId}/cover-photo`
export const API_SPACES_GET_ALL_LABELS = (spaceId) => `${API_BASE_URL}/spaces/${spaceId}/labels`
export const API_SPACES_UPDATE_LABEL = (spaceId, labelId) => `${API_BASE_URL}/spaces/${spaceId}/labels/${labelId}`
export const API_SPACES_DELETE_LABEL = (spaceId, labelId) => `${API_BASE_URL}/spaces/${spaceId}/labels/${labelId}`
export const API_SPACES_UPDATE = `${API_BASE_URL}/spaces`;
export const API_SPACES_DELETE = `${API_BASE_URL}/spaces/:spaceId`;
export const API_SPACES_RECOMMENDED = (userId) => `${API_BASE_URL}/spaces/space-recommendations/${userId}`

// comment api
export const API_COMMENTS_CREATE = `${API_BASE_URL}/comments`;
export const API_COMMENTS_GET_BY_POST = (postId) => `${API_BASE_URL}/comments/${postId}`;
export const API_COMMENTS_UPDATE = (commentId) => `${API_BASE_URL}/comments/${commentId}`;
export const API_COMMENTS_DELETE = (commentId) => `${API_BASE_URL}/comments/${commentId}`;


// refresh token api
export const API_REFRESH_TOKEN_DELETE = `${API_BASE_URL}/logout-all-sessions`
export const API_REFRESH_ACCESS_TOKEN = `${API_BASE_URL}/refresh-access-token`
