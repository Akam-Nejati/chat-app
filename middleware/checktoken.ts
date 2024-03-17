import { useUserId } from "~/stores/userId";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const userIdStore = useUserId();
  const { userId } = toRefs(userIdStore); 
  const { data } = await useAsyncData("resetToken", async () => {
    const { data } = await useCustomFetch<{
      mesage: string;
      userId: string;
    }>("checkresettoken", {
      method: "POST",
      body: {
        token: useRoute().query.resrettoken,
      },
    });
    return data.value;
  });
  if ((to.name = "change password")) {
    if (!data.value) {
      return navigateTo("/auth/login");
    } else {
      userId.value = data.value.userId;
    }
  }
});
