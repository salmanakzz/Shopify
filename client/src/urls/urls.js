// urls initializing file

// authentication urls
export const userAuth = "/api/isUserAuth";
export const adminAuth = "/admin/api/isAdminAuth";
export const accessUserRequestUrl = '/api/requset-access-token' 

// urls related to the user
export const userLogin = "/api/login";
export const userSignup = "/api/signup";
export const googleUserRegister = "/api/google-user-register";
export const submitPost = "/api/submit-post";
export const fetchPostDatas = '/api/fecth-posts'
export const deletePostUrl = '/api/delete-post'
export const editPostUrl = '/api/edit-post'
export const likePostUrl = '/api/like-post'
export const unLikePostUrl = '/api/unlike-post'
export const submitCommentUrl = '/api/submit-comment'
export const fetchCommentDatas = '/api/fetch-comments'
export const VerifyNumberUrl = '/api/verify-number'
export const forgotPasswordUrl = '/api/forgot-password'
export const resetPasswordUrl = '/api/reset-password'
export const VerifyOtpUrl = '/api/verify-otp'
export const addFollowUrl = '/api/add-follow' 
export const unFollowUrl = '/api/un-follow' 
export const fetchProfileUserUrl = '/api/fetch-profileuser' 
export const friendRequestUrl = '/api/friend-request' 
export const removeFriendRequestUrl = '/api/remove-friend-request' 
export const fetchRequestsUrl = '/api/fetch-requests' 
export const addFriendUrl = '/api/add-friend' 
export const fetchSuggestionsUrl = '/api/fetch-suggestions' 
export const submitReportUrl = '/api/submit-report' 
export const removeReportUrl = '/api/remove-report' 
export const getUserDataUrl = '/api/userdata' 
export const fetchFriendsUrl = '/api/fetch-friends' 
export const fetchAllUsersUrl = '/api/fetch-users' 
export const uploadProfilePictureUrl = '/api/upload-profile-picture'   
 
//urls related to chat
export const createChatUrl = '/chat/api/create-chat' 
export const fetchChatsUrl = '/chat/api/fetch-chats' 

//urls related to chat messages
export const fetchMessagesUrl = '/message/api/fetch-message'
export const addMessageUrl = '/message/api/add-message'

// urls related to the admin
export const adminLogin = "/admin/api/login";
export const fetchUsersUrl = '/admin/api/fetch-users'
export const blockUserUrl = '/admin/api/block-user'
export const unblockUserUrl = '/admin/api/unblock-user'
export const fetchAllPostsUrl = '/admin/api/fetch-all-posts'   

//urls related to the story
export const addStoryUrl = '/story/api/add-story' 
export const getStoriesUrl = '/story/api/fetch-stories' 