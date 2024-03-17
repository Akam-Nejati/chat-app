export const useUserId = defineStore("user id", () => {
    const userId = useState<string>();

    return {
      userId
    };
});
