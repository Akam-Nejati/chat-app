export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie("token");

  
  
  // if(to.name){
    console.log(to.fullPath.includes("auth"));
    if (to.fullPath.includes("chats")) {
      if (!token.value) {
        return navigateTo("/auth/login");
      }
    } else if (to.fullPath.includes("auth")) {
      if (token.value) {
        return navigateTo("/chats");
      }
    }
  // }
});
